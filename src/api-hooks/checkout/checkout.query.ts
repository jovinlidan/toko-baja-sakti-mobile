import { QueryFetchFunction, QueryTransformer } from "@common/helpers/common";
import { ApiError, ApiResult } from "@common/repositories";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { Checkout } from "./checkout.model";

export function useGetCheckout(
  options?: UseQueryOptions<ApiResult<Checkout>, ApiError>
): UseQueryResult<ApiResult<Checkout>, ApiError> {
  return QueryTransformer(
    useQuery<ApiResult<Checkout>, ApiError>(
      getCheckoutKey(),
      () =>
        QueryFetchFunction({
          url: "get-checkout",
        }),
      options
    ),
    Checkout
  );
}

export function getCheckoutKey() {
  const keys: any[] = ["getCheckout"];
  return keys;
}
