import { useGetWishlists } from "@api-hooks/wishlist/wishlist.query";
import FetchWrapperComponent from "@components/common/fetch-wrapper-component";
import { View, FlashList, StyleSheet, Text } from "@components/elements";
import ProductCard from "@components/widgets/product-card";
import sizeConstant from "@constants/size.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import { useMemo } from "react";
import { Dimensions, StatusBar } from "react-native";
import EmptyDataView from "./components/empty-data-view";

export default function ProductList() {
  const { data, error, refetch, isLoading } = useGetWishlists();

  const isEmptyData = useMemo(() => {
    return data?.data?.length === 0;
  }, [data?.data?.length]);

  return (
    <View style={isEmptyData ? styles.emptyDataContent : styles.content}>
      <FetchWrapperComponent
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
        empty={isEmptyData}
        emptyComponent={<EmptyDataView />}
        component={
          <View style={styles.contentContainer}>
            <Text variant="h5">{data?.data?.length} Barang Favorit</Text>
            <View style={styMargin(32, SeparatorTypeEnum.bottom)} />
            <FlashList
              data={data?.data}
              renderItem={({ item, index }) => (
                <ProductCard {...item.categoryItem} index={index} />
              )}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <ProductCard.SeparatorVertical />}
              showsHorizontalScrollIndicator={false}
              estimatedItemSize={51}
              estimatedListSize={{ width: 200, height: 200 }}
              keyExtractor={(item) => item.id}
              numColumns={2}
            />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: 130,
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 28,
    height: "100%",
  },
  emptyDataContent: {
    marginTop:
      Dimensions.get("screen").height / 3 - (StatusBar.currentHeight || 0),
    backgroundColor: "white",
    height: "100%",
    // alignItems: "center",
  },
  contentContainer: {
    paddingHorizontal: sizeConstant.contentPad,
    paddingBottom: sizeConstant.contentPad,
  },
});
