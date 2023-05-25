import { QueryFetchFunction, QueryTransformer } from "@common/helpers/common";
import { ApiError, ApiResult } from "@common/repositories";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { CartLite } from "./cart.model";

export function useGetCart(
  options?: UseQueryOptions<ApiResult<CartLite>, ApiError>
): UseQueryResult<ApiResult<CartLite>, ApiError> {
  return QueryTransformer(
    useQuery<ApiResult<CartLite>, ApiError>(
      getCartKey(),
      () =>
        QueryFetchFunction({
          url: "get-cart",
        }),
      options
    ),
    CartLite
  );
}

export function getCartKey() {
  const keys: any[] = ["getCart"];
  return keys;
}
