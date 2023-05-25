import imageConstant from "@constants/image.constant";
import * as React from "react";
import { Image, ImageProps, ImageStyle, StyleSheet, View } from "react-native";

interface Props extends ImageProps {
  placeholderStyle?: ImageStyle;
}

export default function ImageComponent(props: Props) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { onLoad, resizeMode = "contain", ...restProps } = props;

  return (
    <View>
      <Image
        {...restProps}
        resizeMode={resizeMode}
        onLoad={(e) => {
          onLoad && onLoad(e);
          if (restProps.source && typeof restProps.source === "object") {
            if ((restProps.source as any).uri) {
              setIsLoaded(true);
            }
          } else {
            setIsLoaded(true);
          }
        }}
      />
      {!isLoaded && (
        <Image
          resizeMode="cover"
          source={imageConstant.placeholder}
          style={[styles.absolute, props.placeholderStyle]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    alignSelf: "center",
  },
});
