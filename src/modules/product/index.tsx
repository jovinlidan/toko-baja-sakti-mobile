import { Container, View, Content } from "@components/elements";
import { StyleSheet } from "react-native";
import { StatusBar } from "react-native";
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import AnimatedHeader from "./animated-header";
import ProductList from "./product-list";

export default function Product() {
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });
  return (
    <Container>
      <AnimatedHeader scrollValue={scrollY} />
      <Content
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        noPadding
      >
        <View style={styles.content}>
          <ProductList />
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
  },
});
