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
import RecommendationProduct from "./recommendation-product";
import HomeHeader from "./home-header";
import MyFavorite from "./my-favorite";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import Links from "./links";
import { useCallback, useState } from "react";
import Toast from "@common/helpers/toast";
import { useQueryClient } from "react-query";
import { getCategoryItemsKey } from "@api-hooks/category-item/category-item.query";
import { getWishlistsKey } from "@api-hooks/wishlist/wishlist.query";

export default function Home() {
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refetch = useCallback(async () => {
    try {
      setIsLoading(true);
      await queryClient.invalidateQueries(
        getCategoryItemsKey({ params: { limit: 5 } })
      );
      await queryClient.invalidateQueries(
        getWishlistsKey({ params: { limit: 2 } })
      );
    } catch (e: any) {
      e?.message && Toast.error(e?.message);
    } finally {
      setIsLoading(false);
    }
  }, [queryClient]);

  return (
    <Container>
      <HomeHeader scrollValue={scrollY} />
      <Content
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      >
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
