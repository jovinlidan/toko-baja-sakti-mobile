import { View, Text } from "@components/elements";
import { Platform, StatusBar, StyleSheet } from "react-native";
import Constants from "expo-constants";
import colorConstant from "@constants/color.constant";
import sizeConstant from "@constants/size.constant";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import zIndexConstant from "@constants/z-index.constant";

const preLollipop = Platform.OS === "android" && Platform.Version < 21;

interface Props {
  scrollValue: SharedValue<number>;
}

function SmallSeparator(props: Props) {
  const { scrollValue } = props;
  const animatedStyle = useAnimatedStyle(() => {
    const style = interpolate(scrollValue.value, [0, 20], [28, 12], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    return {
      marginBottom: style,
    };
  });

  return <Animated.View style={animatedStyle} />;
}

export default function AnimatedHeader(props: Props) {
  const { scrollValue } = props;

  const animatedContainer = useAnimatedStyle(() => {
    const borderBottomWidth = interpolate(
      scrollValue.value,
      [0, 39, 40],
      [0, 0.5, 1],
      {
        extrapolateRight: Extrapolation.CLAMP,
      }
    );
    const backgroundColor = interpolateColor(
      scrollValue.value,
      [0, 30],
      ["transparent", "white"]
    );
    return {
      borderBottomWidth,
      borderBottomColor: colorConstant.headerBorderBottom,
      backgroundColor,
      height: 100,
    };
  });

  const animatedConcave = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scrollValue.value,
      [0, 50],
      [colorConstant.headerOrange, "transparent"]
    );
    return {
      backgroundColor,
    };
  });

  return (
    <>
      <Animated.View style={[styles.backgroudConcave, animatedConcave]} />
      <Animated.View style={[styles.container, animatedContainer]}>
        {Platform.OS === "android" && !preLollipop && (
          <View style={styles.statusBar} />
        )}
        <View style={styles.row}>
          <View style={styles.column}>
            <SmallSeparator scrollValue={scrollValue} />
            <Text variant="h4">Keranjang Saya</Text>
          </View>
        </View>
      </Animated.View>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
    </>
  );
}
const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight,
    backgroundColor: "transparent",
    zIndex: 3000,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  backgroudConcave: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
  },
  container: {
    paddingLeft: sizeConstant.contentPad,
    paddingRight: sizeConstant.contentPad,
    paddingBottom: 8,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: zIndexConstant.headerZIndex,
    alignContent: "center",
  },
});
