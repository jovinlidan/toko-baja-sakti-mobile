import { useGetCart } from "@api-hooks/cart/cart.query";
import {
  Container,
  Content,
  RefreshControl,
  StyleSheet,
  View,
} from "@components/elements";

import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import AnimatedHeader from "./animated-header";
import CartContent from "./cart-content";

export default function Cart() {
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });
  const { refetch, isRefetching } = useGetCart();

  return (
    <Container>
      <AnimatedHeader scrollValue={scrollY} />
      <Content
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        noPadding
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        <View style={styles.content}>
          <CartContent />
        </View>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: 130,
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 28,
    flexGrow: 1,
  },
});
