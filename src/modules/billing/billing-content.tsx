import { useGetBilling } from "@api-hooks/checkout/checkout.query";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "@components/elements";
import colorConstant from "@constants/color.constant";
import { useRouter, useSearchParams } from "expo-router";
import BillingCost from "./components/billing-cost";
import { Linking } from "react-native";
import Toast from "@common/helpers/toast";
import { useCallback } from "react";
import sizeConstant from "@constants/size.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import { HOME_SCREEN_NAME } from "@constants/route.constant";

function Separator() {
  return <View style={styles.separator} />;
}
interface Props {}

export default function BillingContent(props: Props) {
  const { id } = useSearchParams();
  const { data, refetch } = useGetBilling({ billingId: id as string });
  const router = useRouter();

  const handleOpenBillingUrl = useCallback(async () => {
    if (!data?.data?.billingUrl) {
      return;
    }
    const supported = await Linking.canOpenURL(data?.data?.billingUrl);
    if (supported) {
      await Linking.openURL(data?.data?.billingUrl);
    } else {
      Toast.error("Gagal membuka url");
    }
  }, [data?.data?.billingUrl]);

  const statusBgColor = () => {
    switch (data?.data?.status) {
      case "PAID":
        return colorConstant.successDefault;
      case "EXPIRED":
        return colorConstant.redDefault;
      default:
        return colorConstant.primaryOrange1;
    }
  };

  const handleSubmitButton = useCallback(() => {
    switch (data?.data?.status) {
      case "PAID":
      case "EXPIRED":
        router.replace(HOME_SCREEN_NAME);
        break;
      case "PENDING":
        return refetch();
    }
  }, [data?.data?.status, refetch, router]);

  const submitButtonText = () => {
    switch (data?.data?.status) {
      case "PENDING":
        return "Refresh";
      default:
        return "Kembali Ke Halaman Utama";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text variant="bodyMed" style={styles.linkLabel}>
          Link Pembayaran
        </Text>
        <TouchableOpacity
          onPress={handleOpenBillingUrl}
          style={styles.linkWrapper}
        >
          <Text
            color={colorConstant.blueDefault}
            variant="bodyMed"
            style={styles.linkLabel}
          >
            {data?.data?.billingUrl}
          </Text>
        </TouchableOpacity>
        <View style={styMargin(20, SeparatorTypeEnum.bottom)} />
        <Text variant="bodyMed" style={styles.linkLabel}>
          Status
        </Text>
        <View style={[styles.pill, { backgroundColor: statusBgColor() }]}>
          <Text variant="bodyMed" color={colorConstant.white}>
            {data?.data?.getStatusLabel()}
          </Text>
        </View>
      </View>

      <Separator />
      <BillingCost
        grandTotal={data?.data?.totalPrice}
        shippingCost={data?.data?.shippingCost}
        total={(data?.data?.totalPrice || 0) - (data?.data?.shippingCost || 0)}
      />
      <Button style={styles.button} onPress={handleSubmitButton}>
        {submitButtonText()}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    borderBottomColor: colorConstant.stroke,
    borderBottomWidth: 1,
  },
  linkWrapper: {
    marginTop: 8,
  },
  topContainer: {
    paddingHorizontal: sizeConstant.contentPad,
    paddingVertical: sizeConstant.contentPad,
  },
  container: {},
  linkLabel: {
    flex: 1,
    fontWeight: "bold",
  },
  pill: {
    alignSelf: "flex-start",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 4,
  },
  button: {
    marginHorizontal: sizeConstant.contentPad,
  },
});
