import {
  Container,
  Content,
  View,
  TouchableOpacity,
  Text,
  Button,
} from "@components/elements";
import colorConstant from "@constants/color.constant";
import {
  LOGIN_SCREEN_NAME,
  REGISTER_SCREEN_NAME,
} from "@constants/route.constant";
import sizeConstant from "@constants/size.constant";
import { useRouter } from "expo-router";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import OnboardingDots from "./onboarding-dots";
import { Slide1, Slide2, Slide3, Slide4 } from "./slides";

const preLollipop = Platform.OS === "android" && Platform.Version < 21;

export default function OnboardingSwiper() {
  const { width } = useWindowDimensions();
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const x = useSharedValue(activeIdx * -width);
  const dotY = useSharedValue(0);
  const router = useRouter();

  const nextSlide = () => {
    x.value = withTiming((activeIdx + 1) * -width, {
      easing: Easing.sin,
    });
    setActiveIdx((prev) => ++prev);
  };

  const prevSlide = () => {
    x.value = withTiming((activeIdx - 1) * -width, {
      easing: Easing.sin,
    });
    setActiveIdx((prev) => --prev);
  };

  const reset = () => {
    x.value = withTiming(activeIdx * -width, {
      easing: Easing.sin,
    });
  };

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      x.value = e.translationX + -width * activeIdx;
    })
    .onEnd((e) => {
      if (
        (e.translationX < -width / 3 || e.velocityX <= -1000) &&
        activeIdx < 3
      ) {
        nextSlide();
      } else if (
        (e.translationX > width / 3 || e.velocityX >= 1000) &&
        activeIdx > 0
      ) {
        prevSlide();
      } else {
        reset();
      }
    })
    .runOnJS(true);

  const skip = () => {
    x.value = withTiming(3 * -width);
    setActiveIdx(3);
  };

  const swipeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
  }));

  const leftCircleAnimatedStyle = useAnimatedStyle(() => {
    switch (activeIdx) {
      case 0:
        return {
          opacity: withTiming(0),
        };
      case 1:
        return {
          opacity: withTiming(1),
          backgroundColor: colorConstant.lightTeal,
        };
      case 2:
        return {
          opacity: withTiming(0),
        };
      default:
        return {
          opacity: withTiming(1),
          backgroundColor: colorConstant.lightTeal,
        };
    }
  });

  const rightCircleAnimatedStyle = useAnimatedStyle(() => {
    switch (activeIdx) {
      case 0:
        return {
          opacity: withTiming(1),
          backgroundColor: "rgba(250, 177, 49, 0.35)",
        };
      case 1:
        return {
          opacity: withTiming(0),
        };
      case 2:
        return {
          opacity: withTiming(1),
          backgroundColor: "rgba(223, 57, 57, 0.15)",
        };
      default:
        return {
          opacity: withTiming(0),
        };
    }
  });

  const dotAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY:
            dotY.value +
            2 * sizeConstant.contentPad -
            (activeIdx === 3 ? -20 : -30),
        },
      ],
    };
  });

  const onNavigateDaftar = useCallback(() => {
    router.replace(REGISTER_SCREEN_NAME);
  }, []);

  const onNavigateMasuk = useCallback(() => {
    router.replace(LOGIN_SCREEN_NAME);
  }, []);

  return (
    <Container>
      {Platform.OS === "android" && !preLollipop && (
        <View style={[styles.statusBar]} />
      )}
      <Animated.View style={[styles.leftCircle, leftCircleAnimatedStyle]} />
      <Animated.View style={[styles.rightCircle, rightCircleAnimatedStyle]} />
      <Animated.View style={[styles.dots, dotAnimatedStyle]}>
        <OnboardingDots activeIdx={activeIdx} totalSlider={4} />
      </Animated.View>
      {activeIdx !== 3 && (
        <View style={styles.skipButtonContainer}>
          <TouchableOpacity onPress={skip}>
            <Text variant="bodyReg">Skip</Text>
          </TouchableOpacity>
        </View>
      )}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.animatedRoot, swipeAnimatedStyle]}>
          <Slide1
            onLayout={(e) => {
              dotY.value = withTiming(
                e.nativeEvent.layout.height + e.nativeEvent.layout.y
              );
            }}
          />
          <Slide2
            onLayout={(e) => {
              dotY.value = withTiming(
                e.nativeEvent.layout.height + e.nativeEvent.layout.y
              );
            }}
          />
          <Slide3
            onLayout={(e) => {
              dotY.value = withTiming(
                e.nativeEvent.layout.height + e.nativeEvent.layout.y
              );
            }}
          />
          <Slide4
            onLayout={(e) => {
              dotY.value = withTiming(
                e.nativeEvent.layout.height + e.nativeEvent.layout.y
              );
            }}
          />
        </Animated.View>
      </GestureDetector>
      <View style={styles.buttonContainer}>
        {activeIdx === 3 ? (
          <>
            <Button onPress={onNavigateDaftar}>Daftar</Button>
            <Button
              onPress={onNavigateMasuk}
              variant="outline"
              textStyle={styles.buttonMasukStyle}
            >
              Masuk
            </Button>
          </>
        ) : (
          <>
            <Button onPress={() => nextSlide()}>Berikutnya</Button>
          </>
        )}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  animatedRoot: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
  leftCircle: {
    position: "absolute",
    backgroundColor: colorConstant.lightTeal,
    width: 516,
    height: 516,
    borderRadius: 258,

    left: -150,
    top: -150,
  },
  rightCircle: {
    position: "absolute",
    backgroundColor: "rgba(250, 177, 49, 0.35)",
    width: 516,
    height: 516,
    borderRadius: 258,
    right: -150,
    top: -150,
  },
  buttonContainer: {
    paddingHorizontal: sizeConstant.contentPad,
    paddingBottom: sizeConstant.contentPad,
  },
  buttonMasukStyle: {
    color: "rgba(0,0,0,0.5)",
    fontWeight: "600",
  },
  skipButtonContainer: {
    alignSelf: "flex-end",
    marginHorizontal: sizeConstant.contentPad,
  },
  dots: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  statusBar: {
    height: StatusBar.currentHeight,
  },
});
