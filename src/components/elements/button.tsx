import colorConstant from "@constants/color.constant";
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import Text from "./text";

interface ButtonProps extends TouchableOpacityProps {
  variant?: "primary" | "outline";
  textStyle?: TextStyle;
}
export default function Button(props: ButtonProps) {
  const { children, variant = "primary", textStyle, ...restProps } = props;
  const render = () => {
    if (typeof children === "string") {
      return (
        <Text
          variant="h5"
          style={[
            {
              color: variant === "primary" ? colorConstant.white : undefined,
            },
            textStyle,
          ]}
        >
          {children}
        </Text>
      );
    }
    return children;
  };
  return (
    <TouchableOpacity
      {...restProps}
      style={[
        styles.touchableOpacity,
        {
          backgroundColor:
            variant === "primary" ? colorConstant.primaryOrange1 : undefined,
        },
      ]}
    >
      {render()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchableOpacity: {
    paddingVertical: 16,
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
});
