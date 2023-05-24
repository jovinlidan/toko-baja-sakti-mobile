import { View, Text, StyleSheet } from "@components/elements";
import colorConstant from "@constants/color.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";

interface Props {
  totalPrice: string;
}
export default function TotalPrice(props: Props) {
  const { totalPrice } = props;
  return (
    <View style={styles.container}>
      <Text variant="bodyMed" color={colorConstant.white}>
        Total Harga
      </Text>
      <View style={styMargin(4, SeparatorTypeEnum.bottom)} />
      <Text variant="h4">{totalPrice}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
