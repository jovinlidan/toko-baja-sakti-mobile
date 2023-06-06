import { client } from "@common/repositories";
import { decamelizeKeys, camelizeKeys } from "humps";
import toApiError from "../repositories/to-api-error";
import qs from "qs";
import { ClassConstructor, plainToClass } from "class-transformer";
import { Filter, PaginationMeta, Sort } from "@api-hooks/common/common.model";

export type MutationMethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchMutationOptions<T> {
  url: string;
  method: MutationMethodType;
  body?: any;
  classType?: ClassConstructor<T>;
}

export async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      resolve(reader.result as string);
    };
    reader.onerror = function () {
      reject(reader.error);
    };
  });
}

export function MutationFetchFunction<T>({
  url,
  method,
  body,
  classType,
}: FetchMutationOptions<T>): Promise<any> {
  return new Promise(async (resolve, reject) => {
    const newBody = body ? decamelizeKeys(body) : undefined;

    try {
      let json = (await client(url, {
        method,
        ...(newBody
          ? {
              json: newBody,
            }
          : {}),
      })) as any;
      //  let json = (await client(url, {
      //    method,
      //     ...(newBody
      //     ? {
      //         json: newBody,
      //       },
      //  )) as any;

      const contentType = json.headers.get("Content-Type");

      if (contentType === "application/pdf") {
        json = await blobToBase64(await json.blob());
      } else {
        json = await json.json();
      }
      const transformedJson = json.data
        ? {
            ...json,
            ...(json?.data
              ? {
                  data: classType
                    ? plainToClass(classType, json.data)
                    : json.data,
                }
              : {}),
          }
        : {
            ...(classType ? plainToClass(classType, json) : json),
          };

      resolve(transformedJson);
    } catch (e) {
      const errors = await toApiError(e as Error);
      reject({ ...errors, errors: camelizeKeys(errors.errors) });
    }
  });
}

interface QueryFetchOptions {
  url: string;
  params?: any;
}

export function QueryFetchFunction({
  url,
  params,
}: QueryFetchOptions): Promise<any> {
  return new Promise(async (resolve, reject) => {
    let _params = "";
    _params = params ? qs.stringify(decamelizeKeys(params)) : "";

    try {
      const json: any = await client
        .get(url, {
          ...(_params
            ? {
                searchParams: _params,
              }
            : {}),
        })
        .json();

      resolve(json);
    } catch (e: any) {
      reject(await toApiError(e));
    }
  });
}

interface MetadataTypeClass {
  sorts?: any;
}

export function QueryTransformer(
  res: any,
  dataType: any,
  metadataType?: MetadataTypeClass
) {
  const { data: json } = res;
  let newJson = {};
  switch (true) {
    case !!json?.data:
      newJson = {
        ...json,
        ...(json?.data
          ? {
              data: dataType ? plainToClass(dataType, json?.data) : json?.data,
            }
          : {}),
        ...(json?.filters
          ? {
              filters: plainToClass(Filter, json.filters),
            }
          : {}),
        ...(json?.sorts
          ? {
              sorts: plainToClass(
                metadataType?.sorts ? metadataType.sorts : Sort,
                json.sorts
              ),
            }
          : {}),
        ...(json?.meta
          ? {
              meta: plainToClass(PaginationMeta, json.meta),
            }
          : {}),
      };
      break;
    case !!json?.pages:
      newJson = {
        ...json,
        ...(json.pages
          ? {
              pages:
                dataType && !!json?.pages.length
                  ? json.pages.map((page) => {
                      return {
                        data: plainToClass(dataType, page.data),
                        meta: plainToClass(PaginationMeta, page.meta),
                        ...(page.sorts
                          ? {
                              sorts: plainToClass(
                                metadataType?.sorts ? metadataType.sorts : Sort,
                                page.sorts
                              ),
                            }
                          : {}),
                        ...(page.filters
                          ? { filters: plainToClass(Filter, page.filters) }
                          : {}),
                      };
                    })
                  : json.pages,
            }
          : {}),
      };

      break;
    default:
      if (Array.isArray(json)) {
        newJson = [...(dataType ? plainToClass(dataType, json) : json)];
      } else {
        newJson = {
          ...(dataType ? plainToClass(dataType, json) : json),
        };
      }
  }

  return {
    ...res,
    data: newJson,
  };
}

export function getDeepKeys(obj: any) {
  var keys: string[] = [];
  for (let key in obj) {
    keys.push(key);
    if (typeof obj[key] === "object") {
      var subkeys = getDeepKeys(obj[key]);
      keys = keys.concat(
        subkeys.map(function (subkey) {
          return key + "." + subkey;
        })
      );
    }
  }
  return keys;
}
