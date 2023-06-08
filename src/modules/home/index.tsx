import {
  Button,
  Container,
  Content,
  StyleSheet,
  View,
} from "@components/elements";
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import RecommendationProduct from "./recommendation-product";
import HomeHeader from "./home-header";
import MyFavorite from "./my-favorite";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import Links from "./links";

export default function Home() {
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });
  return (
    <Container>
      <HomeHeader scrollValue={scrollY} />
      <Content showsVerticalScrollIndicator={false} onScroll={scrollHandler}>
        <View style={styles.defaultMargin}>
          <RecommendationProduct />
          <View style={styMargin(28, SeparatorTypeEnum.bottom)} />
          <MyFavorite />
          <View style={styMargin(60, SeparatorTypeEnum.bottom)} />
          <Links />
        </View>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  defaultMargin: {
    marginTop: 175,
    flexGrow: 1,
  },
});
