/* eslint-disable no-bitwise */
import { CategoryItemLite } from "@api-hooks/category-item/category-item.model";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageComponent,
} from "@components/elements";
import WishlistComponent from "@components/widgets/wishlist-component";
import colorConstant from "@constants/color.constant";
import { PRODUCT_DETAIL_SCREEN_NAME } from "@constants/route.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import { string2money } from "@utils/string";
import { useRouter } from "expo-router";
import { useCallback } from "react";

interface Props extends CategoryItemLite {}

export default function ProductCard(props: Props) {
  const {
    bigUnit,
    brand,
    file,
    id,
    isWishlist,
    maxPrice,
    minPrice,
    name,
    smallUnit,
    isAvailable,
  } = props;
  const router = useRouter();

  const onNavigateProductDetail = useCallback(
    (idParam) => {
      router.push({
        pathname: PRODUCT_DETAIL_SCREEN_NAME,
        params: { id: idParam },
      });
    },
    [router]
  );
  return (
    <Pressable
      style={styles.container}
      onPress={() => onNavigateProductDetail(id)}
      disabled={!isAvailable}
    >
      {!isAvailable && (
        <View style={styles.notAvailable}>
          <Text variant="h5" style={styles.notAvailableText}>
            Barang Tidak Tersedia
          </Text>
        </View>
      )}
      {!!file?.fileUrl && (
        <ImageComponent
          source={{
            uri: file.fileUrl,
          }}
          resizeMode="stretch"
          style={styles.image}
        />
      )}
      <View style={styles.descriptionContainer}>
        <Text variant="bodyReg" color={colorConstant.gray1}>
          {name} - {brand}
        </Text>
        <View style={styMargin(2, SeparatorTypeEnum.bottom)} />
        <Text variant="h5">
          Rp {string2money(minPrice)} - Rp {string2money(maxPrice)}
        </Text>
        <View style={styMargin(1, SeparatorTypeEnum.bottom)} />
        <Text variant="bodySm" color={colorConstant.gray2}>
          Per Satuan: @{smallUnit} | @{bigUnit}
        </Text>
      </View>
      <WishlistComponent isWishlist={isWishlist} id={id} />
    </Pressable>
  );
}

ProductCard.SeparatorVertical = ({ size = 16 }) => {
  return <View style={styMargin(size, SeparatorTypeEnum.bottom)} />;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    overflow: "hidden",
    position: "relative",

    flex: 1,
    flexDirection: "row",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 4,
  },
  descriptionContainer: {
    paddingLeft: 12,
    paddingTop: 4,
    paddingBottom: 4,
  },
  notAvailable: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
    backgroundColor: colorConstant.productDisable,
    alignItems: "center",
    justifyContent: "center",
  },
  notAvailableText: {
    width: "90%",
    textAlign: "center",
  },
});
