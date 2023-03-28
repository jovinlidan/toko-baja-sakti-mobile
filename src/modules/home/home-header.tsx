import { View, Text, TouchableOpacity } from "@components/elements";
import { Image, Platform, StatusBar, StyleSheet } from "react-native";
import Constants from "expo-constants";
import colorConstant from "@constants/color.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import sizeConstant from "@constants/size.constant";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import zIndexConstant from "@constants/z-index.constant";
import imageConstant from "@constants/image.constant";
import typographyConstant from "@constants/typography.constant";
import { useCallback } from "react";
import { useRouter } from "expo-router";
import { PROFILE_SCREEN_NAME } from "@constants/route.constant";

const preLollipop = Platform.OS === "android" && Platform.Version < 21;

interface Props {
  scrollValue: SharedValue<number>;
}

function AddressText(props: Props) {
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
      <Text variant="h5">Jalan K.H Wahyd Hasyim</Text>
      <Text variant="h5">No. 37 Kota Binjai</Text>
    </Animated.View>
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

function BigSeparator(props: Props) {
  const { scrollValue } = props;
  const animatedStyle = useAnimatedStyle(() => {
    const style = interpolate(scrollValue.value, [0, 50], [32, 0], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    return {
      marginBottom: style,
    };
  });

  return <Animated.View style={animatedStyle} />;
}

function SmallSeparator(props: Props) {
  const { scrollValue } = props;
  const animatedStyle = useAnimatedStyle(() => {
    const style = interpolate(scrollValue.value, [0, 20], [12, 0], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    return {
      marginBottom: style,
    };
  });

  return <Animated.View style={animatedStyle} />;
}

function TinySeparator(props: Props) {
  const { scrollValue } = props;
  const animatedStyle = useAnimatedStyle(() => {
    const style = interpolate(scrollValue.value, [0, 20], [8, 4], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    return {
      marginBottom: style,
    };
  });

  return <Animated.View style={animatedStyle} />;
}

function ProfileImage(props: Props) {
  const { scrollValue } = props;
  const animatedStyle = useAnimatedStyle(() => {
    const width = interpolate(scrollValue.value, [0, 50], [39, 28], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    const height = interpolate(scrollValue.value, [0, 50], [39, 28], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    const marginTop = interpolate(scrollValue.value, [0, 50], [0, 8], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    return {
      width,
      height,
      marginTop,
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

export default function HomeHeader(props: Props) {
  const { scrollValue } = props;
  const router = useRouter();

  const animatedOpacityCariBarang = useAnimatedStyle(() => {
    const opacity = interpolate(scrollValue.value, [0, 40], [1, 0], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    return {
      opacity,
    };
  });

  const animatedContainer = useAnimatedStyle(() => {
    const borderBottomWidth = interpolate(
      scrollValue.value,
      [0, 79, 80],
      [0, 0.5, 1],
      {
        extrapolateRight: Extrapolation.CLAMP,
      }
    );
    const backgroundColor = interpolateColor(
      scrollValue.value,
      [0, 50],
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

  const animatedTitleText = useAnimatedStyle(() => {
    const fontSize = interpolate(
      scrollValue.value,
      [0, 50],
      [typographyConstant.h2.fontSize, typographyConstant.h4.fontSize],
      { extrapolateRight: Extrapolation.CLAMP }
    );
    const marginTop = interpolate(scrollValue.value, [0, 50], [0, 12], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    return {
      fontSize,
      fontWeight: "700",
      marginTop,
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
            <Animated.Text style={animatedTitleText}>
              Toko Baja Sakti
            </Animated.Text>
            <SmallSeparator scrollValue={scrollValue} />
            <AddressText scrollValue={scrollValue} />
          </View>
          <View style={styles.column}>
            <TinySeparator scrollValue={scrollValue} />
            <TouchableOpacity onPress={onNavigateProfile}>
              <ProfileImage scrollValue={scrollValue} />
            </TouchableOpacity>
            <ProfileText scrollValue={scrollValue} />
          </View>
        </View>
        <BigSeparator scrollValue={scrollValue} />
        <Animated.View style={animatedOpacityCariBarang}>
          <Text variant="bodyReg">
            Cari barang yang sesuai dengan kebutuhanmu!
          </Text>
        </Animated.View>
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
    width: 608,
    height: 461,
    left: -87,
    top: -151,
    position: "absolute",
    borderRadius: 500,
    zIndex: -10,
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
