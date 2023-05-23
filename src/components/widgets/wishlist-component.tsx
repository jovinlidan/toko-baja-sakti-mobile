import {
  useDestroyWishlist,
  useStoreWishlist,
} from "@api-hooks/wishlist/wishlist.mutation";
import Toast from "@common/helpers/toast";
import { MessageResult } from "@common/repositories";
import { StyleSheet, TouchableOpacity } from "@components/elements";
import colorConstant from "@constants/color.constant";
import { FontAwesome } from "@expo/vector-icons";
import { useCallback, useState } from "react";

interface Props {
  id: string;
  isWishlist: boolean;
}

export default function WishlistComponent(props: Props) {
  const { id, isWishlist: isWishlistDefault } = props;
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
    } catch (e: any) {
      e?.message && Toast.error(e?.message);
    }
  }, [
    destroyWishlist,
    destroyWishlistLoading,
    id,
    isWishlist,
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
