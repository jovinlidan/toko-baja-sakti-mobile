import { MutationFetchFunction } from "@common/helpers/common";
import { ApiError, ApiResult, MessageResult } from "@common/repositories";
import { useMutation, UseMutationOptions } from "react-query";
import {
  Address,
  CreateAddressInput,
  DeleteAddressInput,
  UpdateAddressInput,
} from "./address.model";

export function useCreateAddressItem(
  options?: UseMutationOptions<ApiResult<Address>, ApiError, CreateAddressInput>
) {
  return useMutation<ApiResult<Address>, ApiError, CreateAddressInput>(
    async function ({ body }) {
      return await MutationFetchFunction({
        url: "address",
        method: "POST",
        classType: Address,
        body,
      });
    },
    options
  );
}

export function useDeleteAddress(
  options?: UseMutationOptions<MessageResult, ApiError, DeleteAddressInput>
) {
  return useMutation<MessageResult, ApiError, DeleteAddressInput>(
    async function ({ id }) {
      return await MutationFetchFunction({
        url: `address/${id}`,
        method: "DELETE",
      });
    },
    options
  );
}

export function useUpdateAddress(
  options?: UseMutationOptions<ApiResult<Address>, ApiError, UpdateAddressInput>
) {
  return useMutation<ApiResult<Address>, ApiError, UpdateAddressInput>(
    async function ({ body, id }) {
      return await MutationFetchFunction({
        url: `address/${id}`,
        method: "PUT",
        classType: Address,
        body,
      });
    },
    options
  );
}
