import { QueryFetchFunction, QueryTransformer } from "@common/helpers/common";
import { ApiError, ApiResult } from "@common/repositories";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { Billing, Checkout, getBillingInput } from "./checkout.model";

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

export function useGetBilling(
  input: getBillingInput,
  options?: UseQueryOptions<ApiResult<Billing>, ApiError>
): UseQueryResult<ApiResult<Billing>, ApiError> {
  return QueryTransformer(
    useQuery<ApiResult<Billing>, ApiError>(
      getBillingKey(input),
      () =>
        QueryFetchFunction({
          url: `billing/${input.billingId}`,
        }),
      options
    ),
    Billing
  );
}

export function getBillingKey(input: getBillingInput) {
  const keys: any[] = ["getBilling", input.billingId];
  return keys;
}
