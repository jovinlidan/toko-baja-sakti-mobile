import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "@components/elements";
import colorConstant from "@constants/color.constant";
import { Feather } from "@expo/vector-icons";

interface Props {
  onCheckout: VoidFunction;
  disable: boolean;
  loading: boolean;
}

export default function CheckoutButton(props: Props) {
  const { onCheckout, disable, loading } = props;
  return (
    <TouchableOpacity
      onPress={onCheckout}
      disabled={disable || loading}
      style={[
        styles.button,
        (disable || loading) && { backgroundColor: colorConstant.stroke },
        loading && styles.noPadLeft,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colorConstant.gray1} size="large" />
      ) : (
        <Feather name="shopping-cart" size={22} color={colorConstant.white} />
      )}
    </TouchableOpacity>
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
  noPadLeft: {
    paddingLeft: 0,
    alignItems: "center",
  },
});
