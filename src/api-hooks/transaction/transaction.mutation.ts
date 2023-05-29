import { MessageResult } from "@api-hooks/common/common.model";
import { ApiError, ApiResult } from "@common/repositories";
import { UseMutationOptions, useMutation } from "react-query";
import { SetFinishTransactionInput } from "./transaction.model";
import { MutationFetchFunction } from "@common/helpers/common";

export function useSetFinishTransaction(
  options?: UseMutationOptions<
    ApiResult<MessageResult>,
    ApiError,
    SetFinishTransactionInput
  >
) {
  return useMutation<
    ApiResult<MessageResult>,
    ApiError,
    SetFinishTransactionInput
  >(async function ({ params }) {
    return await MutationFetchFunction({
      url: `transaction/${params.transactionId}/set-finish-transaction`,
      method: "PATCH",
    });
  }, options);
}
