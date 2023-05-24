import { getCategoryItemsKey } from "@api-hooks/category-item/category-item.query";
import {
  useDestroyWishlist,
  useStoreWishlist,
} from "@api-hooks/wishlist/wishlist.mutation";
import { getWishlistsKey } from "@api-hooks/wishlist/wishlist.query";
import Toast from "@common/helpers/toast";
import { StyleSheet, TouchableOpacity } from "@components/elements";
import colorConstant from "@constants/color.constant";
import { FontAwesome } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { useQueryClient } from "react-query";

interface Props {
  id: string;
  isWishlist: boolean;
}

export default function WishlistComponent(props: Props) {
  const { id, isWishlist: isWishlistDefault } = props;
  const queryClient = useQueryClient();
  const [isWishlist, setIsWishlist] = useState<boolean>(isWishlistDefault);
  const { mutateAsync: storeWishlist, isLoading: storeWishlistLoading } =
    useStoreWishlist();
  const { mutateAsync: destroyWishlist, isLoading: destroyWishlistLoading } =
    useDestroyWishlist();

  const onToggle = useCallback(async () => {
    try {
      if (storeWishlistLoading || destroyWishlistLoading) {
        return;
      }
      if (isWishlist) {
        await destroyWishlist({ body: { categoryItemId: id } });
      } else {
        await storeWishlist({ body: { categoryItemId: id } });
      }
      setIsWishlist((prev) => !prev);
      await queryClient.invalidateQueries(getWishlistsKey());
      await queryClient.invalidateQueries(getCategoryItemsKey());
    } catch (e: any) {
      e?.message && Toast.error(e?.message);
    }
  }, [
    destroyWishlist,
    destroyWishlistLoading,
    id,
    isWishlist,
    queryClient,
    storeWishlist,
    storeWishlistLoading,
  ]);
  return (
    <TouchableOpacity style={styles.container} onPress={onToggle}>
      {isWishlist ? (
        <FontAwesome name="heart" size={20} color={colorConstant.redDefault} />
      ) : (
        <FontAwesome name="heart-o" size={20} color={colorConstant.gray1} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: 32,
    height: 32,
    backgroundColor: colorConstant.white,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    right: 8,
    top: 8,
  },
});
