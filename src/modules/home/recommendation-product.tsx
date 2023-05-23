import { useGetCategoryItems } from "@api-hooks/category-item/category-item.query";
import FetchWrapperComponent from "@components/common/fetch-wrapper-component";
import { FlashList, View, StyleSheet, Button } from "@components/elements";
import ratioConstant from "@constants/ratio.constant";
import { PRODUCT_SCREEN_NAME } from "@constants/route.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import ProductCard from "./components/product-card";

export default function RecommendationProduct() {
  const { data, isLoading, refetch, error } = useGetCategoryItems({
    params: { limit: 5 },
  });
  const router = useRouter();

  const onNavigateProduct = useCallback(() => {
    router.push(PRODUCT_SCREEN_NAME);
  }, [router]);

  return (
    <View>
      <FetchWrapperComponent
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
        component={
          <>
            <FlashList
              data={data?.data}
              renderItem={({ item }) => <ProductCard {...item} />}
              ItemSeparatorComponent={() => (
                <View style={styMargin(16, SeparatorTypeEnum.right)} />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              estimatedItemSize={ratioConstant.recommendedCategoryItemW}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.contentContainer}
            />
            <View style={styMargin(20, SeparatorTypeEnum.bottom)} />
            <Button onPress={onNavigateProduct}>Lihat Semua</Button>
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    // paddingBottom: 4,
    // paddingRight: 4,
    // paddingLeft: 1,
    // paddingTop: 4,
  },
});
