import { MutationFetchFunction } from "@common/helpers/common";
import { ApiError, MessageResult } from "@common/repositories";
import { useMutation, UseMutationOptions } from "react-query";
import { DestroyWishlistInput, StoreWishlistInput } from "./wishlist.model";

export function useStoreWishlist(
  options?: UseMutationOptions<MessageResult, ApiError, StoreWishlistInput>
) {
  return useMutation<MessageResult, ApiError, StoreWishlistInput>(
    async function ({ body }) {
      return await MutationFetchFunction({
        url: "wishlist",
        method: "POST",
        body,
      });
    },
    options
  );
}

export function useDestroyWishlist(
  options?: UseMutationOptions<MessageResult, ApiError, DestroyWishlistInput>
) {
  return useMutation<MessageResult, ApiError, DestroyWishlistInput>(
    async function ({ body }) {
      return await MutationFetchFunction({
        url: "destroy-wishlist",
        method: "DELETE",
        body,
      });
    },
    options
  );
}
