import { View, Text, TouchableOpacity } from "@components/elements";
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
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

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
  const router = useRouter();

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
      height: 80,
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
        <SmallSeparator scrollValue={scrollValue} />
        <View style={styles.row}>
          <TouchableOpacity onPress={router.back}>
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>

          <Text variant="h4">Profil</Text>
          <View style={styles.nothing} />
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
    justifyContent: "space-between",
  },
  backgroudConcave: {
    top: 0,
    left: 0,
    right: 0,
    bottom: "70%",
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
  nothing: {
    width: 24,
  },
});
