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
import { Dimensions } from "react-native";

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
        <Text variant="h4">
          Rp {string2money(minPrice)} - Rp {string2money(maxPrice)}
        </Text>
        <View style={styMargin(4, SeparatorTypeEnum.bottom)} />
        <Text variant="bodyReg" color={colorConstant.gray2}>
          {name} - {brand}
        </Text>
        <View style={styMargin(4, SeparatorTypeEnum.bottom)} />
        <Text variant="bodySm" color={colorConstant.gray2}>
          Per Satuan:
        </Text>
        <Text variant="bodySm" color={colorConstant.gray2}>
          @{smallUnit} | @{bigUnit}
        </Text>
      </View>
      <WishlistComponent isWishlist={isWishlist} id={id} />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colorConstant.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 5,
    overflow: "hidden",
    position: "relative",

    borderColor: colorConstant.stroke,
    borderWidth: 1,
    borderStyle: "solid",
  },
  image: {
    width: Dimensions.get("screen").width * 0.7,
    height: Dimensions.get("screen").width * 0.7 * 0.58,
  },
  descriptionContainer: {
    padding: 16,
    width: Dimensions.get("screen").width * 0.7,
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
