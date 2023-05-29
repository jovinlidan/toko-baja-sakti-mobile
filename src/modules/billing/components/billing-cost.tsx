import { View, Text, StyleSheet } from "@components/elements";
import colorConstant from "@constants/color.constant";
import sizeConstant from "@constants/size.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import { string2money } from "@utils/string";

interface Props {
  grandTotal?: number;
  total?: number;
  shippingCost?: number;
}

export default function BillingCost(props: Props) {
  const { grandTotal, total, shippingCost } = props;

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.row}>
          <Text variant="h5" color={colorConstant.gray4}>
            Ongkos Kirim
          </Text>
          <Text variant="bodyReg" style={styles.costText}>
            Rp {string2money(shippingCost)}
          </Text>
        </View>
        <View style={styMargin(16, SeparatorTypeEnum.bottom)} />
        <View style={styles.row}>
          <Text variant="h5" color={colorConstant.gray4}>
            Total Harga Barang
          </Text>
          <Text variant="bodyReg" style={styles.costText}>
            Rp {string2money(total)}
          </Text>
        </View>
        <View style={styMargin(16, SeparatorTypeEnum.bottom)} />
        <View style={styles.row}>
          <Text variant="h5" color={colorConstant.gray4}>
            Total
          </Text>
          <Text variant="h4" style={styles.costText}>
            Rp {string2money(grandTotal)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: sizeConstant.contentPad,
  },
  costText: {
    flex: 1,
    textAlign: "right",
  },
  row: {
    flexDirection: "row",
  },
});
