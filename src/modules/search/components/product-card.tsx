/* eslint-disable no-bitwise */
import { CategoryItemLite } from "@api-hooks/category-item/category-item.model";
import { View, Text, Image, StyleSheet, Pressable } from "@components/elements";
import WishlistComponent from "@components/widgets/wishlist-component";
import colorConstant from "@constants/color.constant";
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
    resizeMode: "stretch",
    borderRadius: 4,
  },
  descriptionContainer: {
    paddingLeft: 12,
    paddingTop: 4,
    paddingBottom: 4,
  },
});
