import { View, Text, StyleSheet, ImageComponent } from "@components/elements";
import colorConstant from "@constants/color.constant";
import sizeConstant from "@constants/size.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import { string2money } from "@utils/string";
import { CheckoutDetail } from "@api-hooks/checkout/checkout.model";

interface Props extends CheckoutDetail {}

export default function ProductCard(props: Props) {
  const { item, price, quantity, unit } = props;

  return (
    <View style={styles.container}>
      <ImageComponent
        source={{
          uri: item?.categoryItem?.file?.fileUrl,
        }}
        resizeMode="stretch"
        style={styles.image}
      />
      <View style={styles.descriptionContainer}>
        <Text variant="bodyReg" color={colorConstant.gray1} selectable={false}>
          {item.categoryItem.name} - {item.categoryItem.brand}
        </Text>
        <View style={styMargin(4, SeparatorTypeEnum.bottom)} />
        <View style={styles.priceContainer}>
          <Text variant="bodyMed" style={styles.priceText} selectable={false}>
            Rp {string2money(Math.round(price / quantity))}
          </Text>
          <Text variant="h6">x{quantity}</Text>
        </View>
        <View style={styMargin(4, SeparatorTypeEnum.bottom)} />
        <Text variant="bodySm" color={colorConstant.gray2} selectable={false}>
          {item.size}, {item.thick} mm, {item.color}, {unit}
        </Text>
      </View>

      <View style={styles.total}>
        <Text variant="h5" selectable={false}>
          Rp {string2money(price)}
        </Text>
      </View>
    </View>
  );
}

ProductCard.Separator = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    paddingHorizontal: sizeConstant.contentPad,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 4,
    backgroundColor: "red",
  },
  descriptionContainer: {
    paddingLeft: 12,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 12,
    flex: 1,
  },
  total: {
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    borderBottomColor: colorConstant.stroke,
    borderBottomWidth: 1,
  },
  priceContainer: {
    flexDirection: "row",
  },
  priceText: {
    flex: 1,
  },
});
