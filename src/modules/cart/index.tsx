import { Container, Content, StyleSheet, View } from "@components/elements";

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

  return (
    <Container>
      <AnimatedHeader scrollValue={scrollY} />
      <Content
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        noPadding
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
