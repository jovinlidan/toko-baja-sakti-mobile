import { MutationFetchFunction } from "@common/helpers/common";
import { ApiError, ApiResult } from "@common/repositories";
import { useMutation, UseMutationOptions } from "react-query";
import {
  Billing,
  CourierCost,
  CourierCostInput,
  MakeBillingInput,
} from "./checkout.model";

export function useGetCourierCost(
  options?: UseMutationOptions<
    ApiResult<CourierCost>,
    ApiError,
    CourierCostInput
  >
) {
  return useMutation<ApiResult<CourierCost>, ApiError, CourierCostInput>(
    async function ({ body }) {
      return await MutationFetchFunction({
        url: "get-courier-cost",
        method: "POST",
        classType: CourierCost,
        body,
      });
    },
    options
  );
}

export function useMakeBilling(
  options?: UseMutationOptions<ApiResult<Billing>, ApiError, MakeBillingInput>
) {
  return useMutation<ApiResult<Billing>, ApiError, MakeBillingInput>(
    async function ({ body, param }) {
      return await MutationFetchFunction({
        url: `checkout/${param.checkoutId}/make-billing`,
        method: "POST",
        classType: Billing,
        body,
      });
    },
    options
  );
}
