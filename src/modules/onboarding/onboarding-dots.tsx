import { View } from "@components/elements";
import colorConstant from "@constants/color.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import { Fragment, useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface Props {
  activeIdx: number;
  totalSlider: number;
}

interface DotProps {
  index: number;
  activeIdx: number;
}
function Dot(props: DotProps) {
  const animatedStyles = useAnimatedStyle(() => {
    if (props.index === props.activeIdx) {
      return {
        width: withTiming(16),
        height: 8,
        backgroundColor: withTiming(colorConstant.primaryOrange1),
        borderRadius: 8,
      };
    }
    return {
      width: withTiming(8),
      height: 8,
      backgroundColor: withTiming("#C4C4C4"),
      borderRadius: 8,
    };
  });

  return <Animated.View style={animatedStyles} />;
}
export default function OnboardingDots(props: Props) {
  return (
    <View style={styles.container}>
      {[...Array(props.totalSlider).fill({})].map((_, idx) => (
        <Fragment key={idx.toString()}>
          {idx !== 0 && <View style={styMargin(6, SeparatorTypeEnum.left)} />}
          <Dot activeIdx={props.activeIdx} index={idx} />
        </Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
