import { useFonts } from "expo-font";
import { useMemo } from "react";
import { StyleProp, TextStyle, TextProps, StyleSheet } from "react-native";

interface Fonts {
  fontFamily: string;
  fontStyles: any;
  fontWeights: any;
}

const fonts: Fonts = {
  fontFamily: "Lato",
  fontWeights: {
    100: "Thin",
    200: "Light",
    300: "Light",
    400: "Regular",
    500: "Regular",
    600: "Regular",
    700: "Bold",
    800: "Bold",
    900: "Bold",
    thin: "Thin",
    light: "Light",
    normal: "Regular",
    bold: "Bold",
  },
  fontStyles: {
    normal: "",
    italic: "Italic",
  },
};

interface CustomFont {
  style: StyleProp<TextStyle>;
  props: TextProps;
}

export function getFontFamily({
  fontWeight,
  fontStyle,
}: {
  fontWeight?: string;
  fontStyle?: string;
}) {
  const customFontWeight = fontWeight
    ? fonts.fontWeights[fontWeight]
    : "Regular";
  const customFontStyle = fontStyle ? fonts.fontStyles[fontStyle] : "";
  const modifier = customFontWeight + customFontStyle;
  return `${fonts.fontFamily}-${modifier}`;
}

const useCustomFont = (
  props: TextProps,
  defaultStyle: TextStyle
): CustomFont => {
  const { style, ...restProps } = props;
  const customizedStyle = useMemo((): StyleProp<TextStyle> => {
    const { fontWeight, fontStyle, ...rest } =
      StyleSheet.flatten(style) || ({} as any);
    return {
      ...rest,
      fontFamily: getFontFamily({ fontWeight, fontStyle }),
    };
  }, [style]);
  const newStyle = StyleSheet.flatten([defaultStyle, customizedStyle]);
  return {
    style: newStyle,
    props: restProps,
  };
};

export function useInitiateCustomFont() {
  return useFonts({
    "Lato-Thin": require("@assets/fonts/Lato-Thin.ttf"),
    "Lato-ThinItalic": require("@assets/fonts/Lato-ThinItalic.ttf"),
    "Lato-Light": require("@assets/fonts/Lato-Light.ttf"),
    "Lato-LightItalic": require("@assets/fonts/Lato-LightItalic.ttf"),
    "Lato-Regular": require("@assets/fonts/Lato-Regular.ttf"),
    "Lato-RegularItalic": require("@assets/fonts/Lato-Italic.ttf"),
    "Lato-Bold": require("@assets/fonts/Lato-Bold.ttf"),
    "Lato-BoldItalic": require("@assets/fonts/Lato-BoldItalic.ttf"),
  });
}

export default useCustomFont;
