import { useGetTransactions } from "@api-hooks/transaction/transaction.query";
import { View, Text, StyleSheet, SectionList } from "@components/elements";
import sizeConstant from "@constants/size.constant";
import { useCallback, useMemo } from "react";
import ProductCard from "./components/product-card";
import { format } from "date-fns";
import colorConstant from "@constants/color.constant";
import { useRouter } from "expo-router";
import { TRANSACTION_HISTORY_DETAIL_SCREEN_NAME } from "@constants/route.constant";
import {
  getTransactionStatusColor,
  getTransactionStatusLabel,
} from "@utils/helper";

export default function TransactionHistoryContent() {
  const { data, refetch, isRefetching } = useGetTransactions();
  const router = useRouter();

  const mapData = useMemo(() => {
    return data?.data?.map((item) => {
      return {
        ...item,
        data: item.transactionDetails,
        transactionDetails: undefined,
      };
    });
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

  const renderSectionHeader = useCallback(
    ({ section: { status, transactionAt } }) => {
      return (
        <View>
          <ProductCard.Separator />
          <View style={styles.row}>
            <Text variant="hint">
              {transactionAt
                ? format(transactionAt, "dd MMM yyyy, HH:mm:ss")
                : "-"}
            </Text>
            <View
              style={[
                styles.pill,
                { backgroundColor: getTransactionStatusColor(status) },
              ]}
            >
              <Text variant="hint" color={colorConstant.white}>
                {getTransactionStatusLabel(status)}
              </Text>
            </View>
          </View>
        </View>
      );
    },
    []
  );
  const renderItem = useCallback(
    ({ item, section }) => {
      return (
        <ProductCard
          {...item}
          onPress={() => onNavigateTransactionHistoryDetail(section.id)}
        />
      );
    },
    [onNavigateTransactionHistoryDetail]
  );

  return (
    <SectionList
      sections={mapData || []}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      scrollEnabled
      ListFooterComponentStyle={styles.footerComponent}
      keyExtractor={(item, idx) => item.id + idx.toString()}
      refreshing={isRefetching}
      stickySectionHeadersEnabled
      onRefresh={refetch}
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
