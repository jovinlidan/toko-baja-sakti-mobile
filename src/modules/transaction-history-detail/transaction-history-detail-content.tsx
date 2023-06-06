import {
  getTransactionsKey,
  useGetTransaction,
} from "@api-hooks/transaction/transaction.query";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "@components/elements";
import sizeConstant from "@constants/size.constant";
import { Fragment, useCallback } from "react";
import ProductCard from "./components/product-card";
import { format } from "date-fns";
import colorConstant from "@constants/color.constant";
import { useSearchParams } from "expo-router";
import {
  downloadFile,
  getTransactionStatusColor,
  getTransactionStatusLabel,
} from "@utils/helper";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import ShippingCost from "./components/shipping-cost";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Toast from "@common/helpers/toast";
import { TransactionStatusEnum } from "@api-hooks/transaction/transaction.model";
import { useSetFinishTransaction } from "@api-hooks/transaction/transaction.mutation";
import { useQueryClient } from "react-query";
import { requestPermission } from "@hooks/use-permission";
import { useCredential } from "@hooks/use-credential";

interface Props {
  handleOpenTrackOrder: VoidFunction;
}

export default function TransactionHistoryDetailContent(props: Props) {
  const { id } = useSearchParams();
  const { data, refetch } = useGetTransaction({ id: id as string });
  const queryClient = useQueryClient();
  const { handleOpenTrackOrder } = props;
  const { credential } = useCredential();
  const {
    mutateAsync: setFinishTransaction,
    isLoading: setFinishTransactionLoading,
  } = useSetFinishTransaction();

  const item = data?.data;

  const handleOpenInvoices = useCallback(async () => {
    requestPermission({
      onChange: async (status) => {
        if (status === "granted") {
          try {
            await downloadFile(
              {
                url: `/transaction/${id}/print-invoice`,
                title: `bukti-pembayaran-${id}`,
                filePathTitle: `bukti-pembayaran-${id}`,
                filePathType: "pdf",
              },
              credential?.accessToken
            );
          } catch (e: any) {
            e?.message && Toast.error(e?.message);
          }
        }
      },
      type: "storage",
    });
  }, [credential?.accessToken, id]);

  const handleFinishTransaction = useCallback(async () => {
    try {
      const res = await setFinishTransaction({
        params: { transactionId: item?.id! },
      });
      res?.message && Toast.success(res?.message);
      await refetch();
      await queryClient.invalidateQueries(getTransactionsKey());
    } catch (e: any) {
      e?.message && Toast.error(e?.message);
    }
  }, [item?.id, queryClient, refetch, setFinishTransaction]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text variant="hint">
          {item?.transactionAt
            ? format(item?.transactionAt, "dd MMM yyyy, HH:mm:ss")
            : "-"}
        </Text>
        <View
          style={[
            styles.pill,
            { backgroundColor: getTransactionStatusColor(item?.status) },
          ]}
        >
          <Text variant="hint" color={colorConstant.white}>
            {getTransactionStatusLabel(item?.status)}
          </Text>
        </View>
      </View>
      {item?.transactionDetails?.map((i) => (
        <Fragment key={i.id}>
          <ProductCard {...i} />
        </Fragment>
      ))}
      <ProductCard.Separator />

      <View style={styles.addressContainer}>
        <Text variant="h5">Alamat Pengiriman</Text>
        <View style={styMargin(4, SeparatorTypeEnum.bottom)} />
        <Text variant="bodyReg">
          {item?.address?.addressDetail}, {item?.address?.city?.name}
        </Text>
      </View>
      <ProductCard.Separator />
      <ShippingCost
        grandTotal={item?.billing?.totalPrice}
        shippingCost={item?.billing?.shippingCost}
        total={
          (item?.billing?.totalPrice || 0) - (item?.billing?.shippingCost || 0)
        }
      />
      <ProductCard.Separator />
      <TouchableOpacity style={styles.option} onPress={handleOpenInvoices}>
        <AntDesign name="filetext1" size={24} color={colorConstant.gray3} />
        <View style={styMargin(20, SeparatorTypeEnum.right)} />
        <Text variant="bodyReg">Bukti Pembayaran</Text>
      </TouchableOpacity>
      <ProductCard.Separator />
      <TouchableOpacity style={styles.option} onPress={handleOpenTrackOrder}>
        <MaterialIcons
          name="my-location"
          size={24}
          color={colorConstant.gray3}
        />
        <View style={styMargin(20, SeparatorTypeEnum.right)} />
        <Text variant="bodyReg">Lacak Pesanan</Text>
      </TouchableOpacity>
      <ProductCard.Separator />

      <View style={styMargin(32, SeparatorTypeEnum.bottom)} />
      <Button
        style={styles.button}
        disabled={item?.status !== TransactionStatusEnum.Delivered}
        onPress={handleFinishTransaction}
        loading={setFinishTransactionLoading}
      >
        Selesaikan Pesanan
      </Button>

      {item?.status === TransactionStatusEnum.Delivered && (
        <Text
          color={colorConstant.redDefault}
          variant="bodyMed"
          style={styMargin(sizeConstant.contentPad, SeparatorTypeEnum.all)}
        >
          * Jika pesanan tidak diselesaikan setelah 2x24 jam sejak pesanan
          sampai tujuan maka pesanan akan diselesaikan secara otomatis.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingHorizontal: sizeConstant.contentPad,
    backgroundColor: colorConstant.white,
  },
  addressContainer: {
    paddingHorizontal: sizeConstant.contentPad,
    paddingVertical: 12,
  },
  pill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: sizeConstant.contentPad,
    paddingVertical: 16,
  },
  button: {
    marginHorizontal: sizeConstant.contentPad,
  },
});
