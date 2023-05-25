import { MutationFetchFunction } from "@common/helpers/common";
import { ApiError, ApiResult } from "@common/repositories";
import { useMutation, UseMutationOptions } from "react-query";
import { CourierCost, CourierCostInput } from "./checkout.model";

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
