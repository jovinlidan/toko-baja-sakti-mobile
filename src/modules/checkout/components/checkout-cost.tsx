import { CourierCost } from "@api-hooks/checkout/checkout.model";
import { useGetCourierCost } from "@api-hooks/checkout/checkout.mutation";
import FetchWrapperComponent from "@components/common/fetch-wrapper-component";
import { View, Text, StyleSheet } from "@components/elements";
import colorConstant from "@constants/color.constant";
import sizeConstant from "@constants/size.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import { string2money } from "@utils/string";
import { useCallback, useEffect, useState } from "react";

interface Props {
  destination: number;
  weight: number;
  grandTotal: number;
}

export default function CheckoutCost(props: Props) {
  const { destination, weight, grandTotal } = props;
  const [data, setData] = useState<CourierCost>();
  const {
    mutateAsync: getCourierCost,
    error,
    isLoading,
  } = useGetCourierCost({
    onSuccess(_data: any) {
      setData(_data);
    },
  });

  const fetchCourierCost = useCallback(async () => {
    await getCourierCost({
      body: { courier: "jne", destination, weight, origin: 70 },
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
                Rp {string2money(data?.cost?.[0]?.value || 0)}
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
                Rp {string2money(grandTotal + (data?.cost?.[0]?.value || 0))}
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
    // backgroundColor: "red",
  },
  costText: {
    flex: 1,
    textAlign: "right",
  },
  row: {
    flexDirection: "row",
  },
});
