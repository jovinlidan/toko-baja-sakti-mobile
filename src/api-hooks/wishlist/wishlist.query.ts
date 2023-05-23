import { QueryFetchFunction, QueryTransformer } from "@common/helpers/common";
import { ApiError, ExtendedApiResult } from "@common/repositories";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { getWishlistsInput, WishlistLite } from "./wishlist.model";

export function useGetWishlists(
  input?: getWishlistsInput,
  options?: UseQueryOptions<ExtendedApiResult<WishlistLite[]>, ApiError>
): UseQueryResult<ExtendedApiResult<WishlistLite[]>, ApiError> {
  return QueryTransformer(
    useQuery<ExtendedApiResult<WishlistLite[]>, ApiError>(
      getWishlistsKey(input),
      () =>
        QueryFetchFunction({
          url: "wishlist",
          params: input?.params,
        }),
      options
    ),
    WishlistLite
  );
}

export function getWishlistsKey(input?: getWishlistsInput) {
  const keys: any[] = ["getWishlists"];
  if (input) {
    keys.push(input?.params);
  }
  return keys;
}
