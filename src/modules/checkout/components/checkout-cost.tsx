import { useGetCourierCost } from "@api-hooks/checkout/checkout.mutation";
import FetchWrapperComponent from "@components/common/fetch-wrapper-component";
import { View, Text, StyleSheet } from "@components/elements";
import colorConstant from "@constants/color.constant";
import sizeConstant from "@constants/size.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import { useShippingCostContext } from "@hooks/use-shipping-cost";
import { string2money } from "@utils/string";
import { useCallback, useEffect } from "react";

interface Props {
  destination?: number;
  weight: number;
  grandTotal: number;
}

export default function CheckoutCost(props: Props) {
  const { destination, weight, grandTotal } = props;
  const { setCost, cost } = useShippingCostContext();
  const {
    mutateAsync: getCourierCost,
    error,
    isLoading,
  } = useGetCourierCost({
    onSuccess(_data: any) {
      setCost?.(_data);
    },
  });

  const fetchCourierCost = useCallback(async () => {
    if (typeof destination !== "number") {
      return;
    }
    await getCourierCost({
      body: { destination, weight },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destination, weight]);

  useEffect(() => {
    fetchCourierCost();
  }, [fetchCourierCost]);

  return (
    <View style={styles.container}>
      <FetchWrapperComponent
        error={error}
        onRetry={fetchCourierCost}
        isLoading={isLoading}
        loadingViewHeight={100}
        component={
          <View>
            <View style={styles.row}>
              <Text variant="h5" color={colorConstant.gray4}>
                Ongkos Kirim
              </Text>
              <Text variant="bodyReg" style={styles.costText}>
                Rp{" "}
                {cost?.cost?.[0]?.value
                  ? string2money(cost?.cost?.[0]?.value)
                  : "-"}
              </Text>
            </View>
            <View style={styMargin(16, SeparatorTypeEnum.bottom)} />
            <View style={styles.row}>
              <Text variant="h5" color={colorConstant.gray4}>
                Total Harga Barang
              </Text>
              <Text variant="bodyReg" style={styles.costText}>
                Rp {string2money(grandTotal)}
              </Text>
            </View>
            <View style={styMargin(16, SeparatorTypeEnum.bottom)} />
            <View style={styles.row}>
              <Text variant="h5" color={colorConstant.gray4}>
                Total
              </Text>
              <Text variant="h4" style={styles.costText}>
                Rp {string2money(grandTotal + (cost?.cost?.[0]?.value || 0))}
              </Text>
            </View>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: sizeConstant.contentPad,
  },
  costText: {
    flex: 1,
    textAlign: "right",
  },
  row: {
    flexDirection: "row",
  },
});
