import { CategoryItemLite } from "@api-hooks/category-item/category-item.model";
import { View, Text, Image, StyleSheet, Pressable } from "@components/elements";
import WishlistComponent from "@components/widgets/wishlist-component";
import colorConstant from "@constants/color.constant";
import ratioConstant from "@constants/ratio.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import { string2money } from "@utils/string";

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
  } = props;
  return (
    <Pressable style={styles.container}>
      {!!file?.fileUrl && (
        <Image
          source={{
            uri: file.fileUrl,
          }}
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
    width: ratioConstant.recommendedCategoryItemImageW,
    height: ratioConstant.recommendedCategoryItemImageH,
    resizeMode: "stretch",
  },
  descriptionContainer: {
    padding: 16,
    width: ratioConstant.recommendedCategoryItemW,
  },
});
