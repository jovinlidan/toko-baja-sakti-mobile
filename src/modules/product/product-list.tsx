import { useGetCategoryItems } from "@api-hooks/category-item/category-item.query";
import FetchWrapperComponent from "@components/common/fetch-wrapper-component";
import { View, FlashList, StyleSheet, Text } from "@components/elements";
import ProductCard from "@components/widgets/product-card";
import sizeConstant from "@constants/size.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import { Dimensions } from "react-native";

export default function ProductList() {
  const { data, error, refetch, isLoading } = useGetCategoryItems();
  return (
    <View style={styles.container}>
      <Text variant="h5">Seluruh Barang</Text>
      <View style={styMargin(32, SeparatorTypeEnum.bottom)} />
      <FetchWrapperComponent
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
        component={
          <FlashList
            data={data?.data}
            renderItem={({ item, index }) => (
              <ProductCard {...item} index={index} />
            )}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <ProductCard.SeparatorVertical />}
            showsHorizontalScrollIndicator={false}
            estimatedListSize={{
              width: Dimensions.get("screen").width / 2,
              height: Dimensions.get("screen").height / 2,
            }}
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
  container: {
    paddingHorizontal: sizeConstant.contentPad,
    paddingBottom: sizeConstant.contentPad,
  },
});
