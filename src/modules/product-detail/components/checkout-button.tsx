import { StyleSheet, Pressable } from "@components/elements";
import colorConstant from "@constants/color.constant";
import { Feather } from "@expo/vector-icons";

interface Props {
  onCheckout: VoidFunction;
  disable: boolean;
}

export default function CheckoutButton(props: Props) {
  const { onCheckout, disable } = props;
  return (
    <Pressable
      onPress={onCheckout}
      disabled={disable}
      style={[
        styles.button,
        disable && { backgroundColor: colorConstant.stroke },
      ]}
    >
      <Feather name="shopping-cart" size={22} color={colorConstant.white} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colorConstant.gray1,
    width: 48,
    height: 48,
    justifyContent: "center",
    borderRadius: 24,
    paddingLeft: 10,
  },
});
