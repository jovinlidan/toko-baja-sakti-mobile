import { Pressable, StyleSheet, View, Text } from "@components/elements";
import colorConstant from "@constants/color.constant";
import { AntDesign } from "@expo/vector-icons";
import { QuantityReducerAction, QuantitySetterEnum } from "../types";

interface Props {
  dispatchQuantity: React.Dispatch<QuantityReducerAction>;
  quantity: number;
}

export default function QuantitySetter(props: Props) {
  const { dispatchQuantity, quantity } = props;

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.circle}
        onPress={() => dispatchQuantity({ type: QuantitySetterEnum.DECREMENT })}
      >
        <AntDesign name="minus" size={12} color="black" />
      </Pressable>
      <Text variant="h4">{quantity}</Text>
      <Pressable
        style={styles.circle}
        onPress={() => dispatchQuantity({ type: QuantitySetterEnum.INCREMENT })}
      >
        <AntDesign name="plus" size={12} color="black" />
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  circle: {
    width: 24,
    height: 24,
    borderColor: colorConstant.gray4,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorConstant.white,
    marginHorizontal: 8,
  },
});
