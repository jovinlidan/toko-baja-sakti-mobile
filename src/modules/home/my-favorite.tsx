import { useGetWishlists } from "@api-hooks/wishlist/wishlist.query";
import FetchWrapperComponent from "@components/common/fetch-wrapper-component";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlashList,
} from "@components/elements";
import ProductCard from "@components/widgets/product-card";
import colorConstant from "@constants/color.constant";
import { FAVORITE_SCREEN_NAME } from "@constants/route.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import { useRouter } from "expo-router";
import { useCallback } from "react";

export default function MyFavorite() {
  const { data, isLoading, error, refetch } = useGetWishlists({
    params: { limit: 2 },
  });
  const router = useRouter();
  const onNavigateFavorite = useCallback(() => {
    router.push(FAVORITE_SCREEN_NAME);
  }, [router]);
  if (!data?.data?.length) {
    return null;
  }
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text variant="h5">Favorit Kamu</Text>
        <TouchableOpacity
          style={styles.viewMoreWrapper}
          onPress={onNavigateFavorite}
        >
          <Text color={colorConstant.primaryOrange0} variant="bodyMed">
            Lihat Semua
          </Text>
        </TouchableOpacity>
      </View>

      <FetchWrapperComponent
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
        component={
          <FlashList
            data={data?.data}
            renderItem={({ item, index }) => (
              <ProductCard {...item.categoryItem} index={index} key={item.id} />
            )}
            scrollEnabled={false}
            ItemSeparatorComponent={() => (
              <View style={styMargin(16, SeparatorTypeEnum.horizontal)} />
            )}
            showsHorizontalScrollIndicator={false}
            estimatedListSize={{ width: 200, height: 200 }}
            estimatedItemSize={51}
            keyExtractor={(item) => item.id}
            numColumns={2}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  viewMoreWrapper: {
    borderBottomColor: colorConstant.primaryOrange0,
    borderBottomWidth: 1,
  },
});
