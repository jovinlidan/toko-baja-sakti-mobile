import * as React from "react";
import {
  Text as TextBase,
  TextProps,
  StyleSheet,
  TextStyle,
} from "react-native";
import useCustomFont from "@hooks/use-custom-font";
import colorConstant from "@constants/color.constant";
import typographyConstant from "@constants/typography.constant";

interface Props extends TextProps {
  children?: React.ReactNode;
  variant?: keyof typeof typographyConstant;
}

const Text: React.ForwardRefRenderFunction<TextBase, Props> = (props, ref) => {
  const variantStyle = props.variant
    ? typographyConstant[props.variant]
    : undefined;
  const customFont = useCustomFont(props, { ...styles.text, ...variantStyle });
  return (
    <TextBase
      selectable
      {...customFont.props}
      style={[customFont.style, variantStyle]}
      ref={ref}
      allowFontScaling={false}
    />
  );
};

export { TextBase };
export default React.forwardRef<TextBase, Props>(Text);

const styles = StyleSheet.create<{
  text: TextStyle;
}>({
  text: {
    color: colorConstant.gray1,
    ...typographyConstant.bodyReg,
  },
});
