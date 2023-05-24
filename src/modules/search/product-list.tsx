import { useGetCategoryItems } from "@api-hooks/category-item/category-item.query";
import FetchWrapperComponent from "@components/common/fetch-wrapper-component";
import { View, FlashList, StyleSheet, Text } from "@components/elements";
import sizeConstant from "@constants/size.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import ProductCard from "./components/product-card";

interface Props {
  query?: string;
}

export default function ProductList(props: Props) {
  const { query } = props;
  const { data, error, refetch, isLoading } = useGetCategoryItems({
    params: { q: query },
  });
  return (
    <View style={styles.container}>
      <Text variant="h5">
        {query
          ? `${data?.data?.length} Hasil untuk ${query}`
          : `${data?.data?.length} Hasil`}
      </Text>
      <View style={styMargin(32, SeparatorTypeEnum.bottom)} />
      <FetchWrapperComponent
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
        component={
          <FlashList
            data={data?.data}
            estimatedListSize={{ width: 200, height: 200 }}
            renderItem={({ item }) => <ProductCard {...item} />}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <ProductCard.SeparatorVertical />}
            showsHorizontalScrollIndicator={false}
            estimatedItemSize={51}
            keyExtractor={(item) => item.id}
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
