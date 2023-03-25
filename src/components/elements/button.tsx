import colorConstant from "@constants/color.constant";
import { useMemo } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import Text from "./text";

interface ButtonProps extends TouchableOpacityProps {
  variant?: "primary" | "outline";
  textStyle?: TextStyle;
  loading?: boolean;
}
export default function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    textStyle,
    loading,
    ...restProps
  } = props;
  const render = () => {
    if (loading) {
      return <ActivityIndicator color={colorConstant.white} size={20} />;
    }

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

  const backgroundColor = useMemo(() => {
    switch (variant) {
      case "primary":
        if (loading) return colorConstant.primaryOrange3;
        return colorConstant.primaryOrange1;
      default:
        return undefined;
    }
  }, [loading]);
  return (
    <TouchableOpacity
      {...restProps}
      style={[
        styles.touchableOpacity,
        {
          backgroundColor,
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
