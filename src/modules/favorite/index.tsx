import { Container, View, Content } from "@components/elements";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import { useMemo } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { StatusBar } from "react-native";
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import AnimatedHeader from "./animated-header";

export default function Favorite() {
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  const isEmptyData = useMemo(() => {
    return true;
  }, []);
  return (
    <Container>
      <AnimatedHeader scrollValue={scrollY} />
      <Content
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        noPadding
      >
        <View style={isEmptyData ? styles.emptyDataContent : styles.content}>
          {/* <View style={styMargin(1000, SeparatorTypeEnum.bottom)} /> */}
        </View>
      </Content>
    </Container>
  );
}
const styles = StyleSheet.create({
  content: {
    marginTop: 130 - (StatusBar.currentHeight || 0),
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 28,
    height: "100%",
  },
  emptyDataContent: {
    marginTop:
      Dimensions.get("screen").height / 3 - (StatusBar.currentHeight || 0),
    backgroundColor: "white",
    height: "100%",
  },
});
