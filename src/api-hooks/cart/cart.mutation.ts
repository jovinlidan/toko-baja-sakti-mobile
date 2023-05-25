import { MutationFetchFunction } from "@common/helpers/common";
import { ApiError, MessageResult } from "@common/repositories";
import { useMutation, UseMutationOptions } from "react-query";
import { AddCartInput, RemoveCartInput } from "./cart.model";

export function useAddCartItem(
  options?: UseMutationOptions<MessageResult, ApiError, AddCartInput>
) {
  return useMutation<MessageResult, ApiError, AddCartInput>(async function ({
    body,
  }) {
    return await MutationFetchFunction({
      url: "add-cart-item",
      method: "POST",
      body: body,
    });
  },
  options);
}

export function useRemoveCartItem(
  options?: UseMutationOptions<MessageResult, ApiError, RemoveCartInput>
) {
  return useMutation<MessageResult, ApiError, RemoveCartInput>(async function ({
    param,
  }) {
    return await MutationFetchFunction({
      url: `cart-item/${param.cartItem}/remove-cart-item`,
      method: "DELETE",
    });
  },
  options);
}
