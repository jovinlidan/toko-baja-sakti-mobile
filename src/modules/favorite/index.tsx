import { useGetWishlists } from "@api-hooks/wishlist/wishlist.query";
import { Container, Content, RefreshControl } from "@components/elements";
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import AnimatedHeader from "./animated-header";
import ProductList from "./product-list";

export default function Favorite() {
  const scrollY = useSharedValue(0);
  const { refetch, isRefetching } = useGetWishlists();
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
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        <ProductList />
      </Content>
    </Container>
  );
}
