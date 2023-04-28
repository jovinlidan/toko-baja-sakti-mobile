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
import imageConstant from "@constants/image.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import { useCallback } from "react";
import { PROFILE_SCREEN_NAME } from "@constants/route.constant";

const preLollipop = Platform.OS === "android" && Platform.Version < 21;

function ProfileImage(props: Props) {
  const { scrollValue } = props;
  const animatedStyle = useAnimatedStyle(() => {
    const width = interpolate(scrollValue.value, [0, 50], [39, 28], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    const height = interpolate(scrollValue.value, [0, 50], [39, 28], {
      extrapolateRight: Extrapolation.CLAMP,
    });

    return {
      width,
      height,
    };
  });

  return (
    <Animated.Image
      resizeMode="contain"
      source={imageConstant.profile}
      style={[animatedStyle, styMargin(5, SeparatorTypeEnum.bottom)]}
    />
  );
}

function ProfileText(props: Props) {
  const { scrollValue } = props;

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollValue.value, [0, 80], [1, 0], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    return {
      opacity,
    };
  });
  return (
    <Animated.View style={animatedStyle}>
      <Text variant="h5">Profil</Text>
    </Animated.View>
  );
}

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
function ProfileSeparator(props: Props) {
  const { scrollValue } = props;
  const animatedStyle = useAnimatedStyle(() => {
    const style = interpolate(scrollValue.value, [0, 20], [8, 12], {
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

  const onNavigateProfile = useCallback(() => {
    router.push(PROFILE_SCREEN_NAME);
  }, [router]);

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
            <Text variant="h4">Favorit</Text>
          </View>
          <View style={styles.nothing} />
          <View style={styles.column}>
            <ProfileSeparator scrollValue={scrollValue} />
            <TouchableOpacity onPress={onNavigateProfile}>
              <ProfileImage scrollValue={scrollValue} />
            </TouchableOpacity>
            <ProfileText scrollValue={scrollValue} />
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
    justifyContent: "space-between",
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
  nothing: {
    width: 24,
  },
});
