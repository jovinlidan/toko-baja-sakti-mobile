import { useGetTransactions } from "@api-hooks/transaction/transaction.query";
import { View, Text, StyleSheet, FlashList } from "@components/elements";
import sizeConstant from "@constants/size.constant";
import { useCallback, useMemo } from "react";
import ProductCard from "./components/product-card";
import { TransactionItemHeader } from "./types";
import { format } from "date-fns";
import colorConstant from "@constants/color.constant";
import { getStatusColor, getStatusLabel } from "./helper";
import { useRouter } from "expo-router";
import { TRANSACTION_HISTORY_DETAIL_SCREEN_NAME } from "@constants/route.constant";

export default function TransactionHistoryContent() {
  const { data } = useGetTransactions();
  const router = useRouter();

  const mapData = useMemo(() => {
    return data?.data?.reduce((prev, next) => {
      const newObj = new TransactionItemHeader();
      newObj.date = next.transactionAt;
      newObj.status = next.status;

      return [
        ...prev,
        newObj,
        ...next.transactionDetails.map((item) => ({
          ...item,
          transactionId: next.id,
        })),
      ];
    }, [] as any[]);
  }, [data?.data]);

  const onNavigateTransactionHistoryDetail = useCallback(
    (id: string) => {
      router.push({
        pathname: TRANSACTION_HISTORY_DETAIL_SCREEN_NAME,
        params: {
          id,
        },
      });
    },
    [router]
  );

  const renderItem = useCallback(
    ({ item, index }) => {
      if (item instanceof TransactionItemHeader) {
        return (
          <View>
            {index !== 0 && <ProductCard.Separator />}
            <View style={styles.row}>
              <Text variant="hint">
                {item.date ? format(item.date, "dd MMM yyyy, HH:mm:ss") : "-"}
              </Text>
              <View
                style={[
                  styles.pill,
                  { backgroundColor: getStatusColor(item.status) },
                ]}
              >
                <Text variant="hint" color={colorConstant.white}>
                  {getStatusLabel(item.status)}
                </Text>
              </View>
            </View>
          </View>
        );
      }
      return (
        <ProductCard
          {...item}
          onPress={() => onNavigateTransactionHistoryDetail(item.transactionId)}
        />
      );
    },
    [onNavigateTransactionHistoryDetail]
  );

  const getItemType = useCallback((item) => {
    if (item instanceof TransactionItemHeader) {
      return "sectionHeader";
    }
    return "row";
  }, []);

  const stickyHeaderIndices = useMemo(() => {
    return mapData
      ?.map((item, index) => {
        if (item instanceof TransactionItemHeader) {
          return index;
        }
        return null;
      })
      .filter((item) => item !== null) as number[];
  }, [mapData]);

  return (
    <FlashList
      data={mapData}
      renderItem={renderItem}
      getItemType={getItemType}
      estimatedItemSize={100}
      stickyHeaderIndices={stickyHeaderIndices}
      scrollEnabled
      ListFooterComponentStyle={styles.footerComponent}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingHorizontal: sizeConstant.contentPad,
    backgroundColor: colorConstant.white,
  },
  footerComponent: {
    marginBottom: sizeConstant.contentPad,
  },
  pill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
});
