import { QueryFetchFunction, QueryTransformer } from "@common/helpers/common";
import { ApiError, ApiResult, ExtendedApiResult } from "@common/repositories";

import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import {
  Address,
  AddressLite,
  getAddressesInput,
  getAddressInput,
} from "./address.model";

export function useGetAddresses(
  input?: getAddressesInput,
  options?: UseQueryOptions<ExtendedApiResult<AddressLite[]>, ApiError>
): UseQueryResult<ExtendedApiResult<AddressLite[]>, ApiError> {
  return QueryTransformer(
    useQuery<ExtendedApiResult<AddressLite[]>, ApiError>(
      getAddressesKey(input),
      () =>
        QueryFetchFunction({
          url: "address",
          params: input?.params,
        }),
      options
    ),
    AddressLite
  );
}

export function getAddressesKey(input?: getAddressesInput) {
  const keys: any[] = ["getAddresses"];
  if (input) {
    keys.push(input?.params);
  }
  return keys;
}

export function useGetAddress(
  input?: getAddressInput,
  options?: UseQueryOptions<ApiResult<Address>, ApiError>
): UseQueryResult<ApiResult<Address>, ApiError> {
  return QueryTransformer(
    useQuery<ApiResult<Address>, ApiError>(
      getAddressKey(input),
      () =>
        QueryFetchFunction({
          url: `address/${input?.id}`,
        }),
      options
    ),
    Address
  );
}

export function getAddressKey(input?: getAddressInput) {
  const keys: any[] = ["getAddress", input?.id];
  return keys;
}
