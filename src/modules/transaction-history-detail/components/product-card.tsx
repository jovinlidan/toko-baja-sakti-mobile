import {
  View,
  Text,
  StyleSheet,
  ImageComponent,
  TouchableOpacity,
} from "@components/elements";
import colorConstant from "@constants/color.constant";
import sizeConstant from "@constants/size.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import { string2money } from "@utils/string";
import { TransactionDetail } from "@api-hooks/transaction/transaction.model";

interface Props extends TransactionDetail {
  onPress?: VoidFunction;
  reason?: string;
  isRetur?: boolean;
}

export default function ProductCard(props: Props) {
  const {
    item,
    price,
    quantity,
    unit,
    onPress,
    reason,
    isRetur = false,
  } = props;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={!onPress}
    >
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
        {!!reason && (
          <>
            <View style={styMargin(4, SeparatorTypeEnum.top)} />
            <Text variant="h6" color={colorConstant.gray2} selectable={false}>
              Alasan: {reason}
            </Text>
          </>
        )}
      </View>
      {!isRetur && (
        <View style={styles.total}>
          <Text variant="h5" selectable={false}>
            Rp {string2money(price)}
          </Text>
        </View>
      )}
    </TouchableOpacity>
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
