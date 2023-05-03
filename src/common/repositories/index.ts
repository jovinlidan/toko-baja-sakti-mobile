import ky from "ky";
import qs from "qs";
import { QueryClient } from "react-query";
import toApiError from "./to-api-error";
import {
  PaginationMeta,
  Filter,
  Sort,
  CustomSort,
} from "@api-hooks/common/common.model";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";
import { createReactNativePersistor } from "./persistor";
import Config from "@common/config";
import { plainToClass } from "class-transformer";

export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };

export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: { [key: string]: string };
}

export interface ApiResult<T> {
  data: T;
  message?: string;
}

export interface MessageResult {
  message: string;
}

export interface ExtendedApiResult<T> extends ApiResult<T> {
  meta: PaginationMeta;
  filters: Filter[];
  sorts: Sort;
}

export interface CustomSortExtendedApiResult<T> extends ApiResult<T> {
  meta: PaginationMeta;
  filters: Filter[];
  sorts: CustomSort;
}

export interface CustomQueryOptions {
  queryKey: any[];
}

export interface CustomMutationOptions {
  mutationKey: any[];
}
const config = {
  prefixUrl: Config.apiEndpoint + "/api/user",
  timeout: 45000,
  retry: {
    limit: 2,
    statusCodes: [401],
  },
  headers: {
    Accept: "application/json",
    "Accept-Language": "id",
  },
  hooks: {
    afterResponse: [
      async (_request, _options, res) => {
        const contentType = res.headers.get("content-type");
        let newResponse = res.clone();
        if (contentType && contentType.includes("application/json")) {
          let json;

          json = await res.json();

          const { status, statusText, headers } = res;
          newResponse = new Response(JSON.stringify(json), {
            status,
            statusText,
            headers,
          });
        }

        return newResponse;
      },
    ] as any[],
    beforeRetry: [] as any[],
  },
};

export let client = ky.create(config);

export function setupToken(token?: string): void {
  if (token) {
    (config.headers as any).Authorization = `Bearer ${token}`;
  } else {
    delete (config.headers as any).Authorization;
  }

  client = client.extend(config);
}

export function setLanguage(lang: string): void {
  (config.headers as any)["Accept-Language"] = lang;
  client = client.extend(config);
}

export function setupOnUnAuthorized(action: () => void) {
  if (config.hooks?.afterResponse) {
    config.hooks.afterResponse[1] = async (request, options, response) => {
      if (response.status === 401) {
        action();
      }
    };
    client = client.extend(config);
  }
}

export function removeOnUnAuthorized() {
  if (config.hooks?.afterResponse?.[1]) {
    config.hooks.afterResponse[1] = async () => {};
    client = client.extend(config);
  }
  setupToken();
}

export async function defaultQueryFn({ queryKey }: CustomQueryOptions) {
  let params = "";

  if (queryKey[2]) {
    params = qs.stringify(queryKey[2]);
  }

  return new Promise(async (resolve, reject) => {
    try {
      resolve(
        await client
          .get(queryKey[1], {
            searchParams: params,
          })
          .json()
      );
    } catch (e) {
      //@ts-ignore
      reject(await toApiError(e));
    }
  });
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      queryFn: defaultQueryFn as any,
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 60 * 24,
      staleTime: 0,
      // cacheTime: 0, //untuk debug null safety saja
      getNextPageParam: (lastPage) => {
        if ((lastPage as any)?.meta) {
          const meta = plainToClass(PaginationMeta, (lastPage as any).meta);
          return meta?.currentPage !== meta?.lastPage
            ? meta.currentPage + 1
            : undefined;
        }
        return undefined;
      },
    },
    mutations: {
      retry: false,
    },
  },
});

const _persistor = createReactNativePersistor();

persistQueryClient({
  queryClient,
  persistor: _persistor,
});

export const logout = (onLogout?: () => void) => {
  queryClient.clear();
  onLogout && onLogout();
};
