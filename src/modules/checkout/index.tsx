import { useGetCheckout } from "@api-hooks/checkout/checkout.query";
import FetchWrapperComponent from "@components/common/fetch-wrapper-component";
import {
  Button,
  Container,
  Content,
  RefreshControl,
  StyleSheet,
} from "@components/elements";
import { Header } from "@components/widgets";
import sizeConstant from "@constants/size.constant";
import { useCallback, useRef } from "react";
import CheckoutContent from "./checkout-content";
import AddressBottomSheet from "./components/address-bottom-sheet";
import { useMakeBilling } from "@api-hooks/checkout/checkout.mutation";
import Toast from "@common/helpers/toast";
import { useShippingCostContext } from "@hooks/use-shipping-cost";
import { useRouter } from "expo-router";
import {
  BILLING_SCREEN_NAME,
  CART_SCREEN_NAME,
} from "@constants/route.constant";
import { useQueryClient } from "react-query";
import { getCartKey } from "@api-hooks/cart/cart.query";

export default function Checkout() {
  const { isLoading, error, refetch, data, isRefetching } = useGetCheckout();
  const { mutateAsync: makeBilling, isLoading: makeBillingLoading } =
    useMakeBilling();
  const { cost } = useShippingCostContext();
  const router = useRouter();
  const queryClient = useQueryClient();

  const addressBottomSheetRef = useRef<any>();

  const handleOpenSelectAddress = useCallback(() => {
    addressBottomSheetRef?.current?.snapTo(0);
  }, []);

  const handleMakeBilling = useCallback(async () => {
    try {
      if (
        !data?.data?.id ||
        !data?.data?.address?.id ||
        !cost?.cost?.[0]?.value
      ) {
        return;
      }
      const res = await makeBilling({
        body: {
          addressId: data?.data?.address?.id,
          shippingCost: cost?.cost?.[0]?.value,
        },
        param: { checkoutId: data?.data?.id },
      });
      await queryClient.invalidateQueries(getCartKey());
      res?.message && Toast.success(res?.message);
      router.replace({
        pathname: BILLING_SCREEN_NAME,
        params: {
          id: res?.data?.id,
        },
      });
    } catch (e: any) {
      e?.message && Toast.error(e?.message);

      if (e?.type === "insufficient-stock") {
        await queryClient.invalidateQueries(getCartKey()).catch(() => {});
        router.replace(CART_SCREEN_NAME);
      }
    }
  }, [
    cost?.cost,
    data?.data?.address?.id,
    data?.data?.id,
    makeBilling,
    queryClient,
    router,
  ]);

  return (
    <Container>
      <Header title="Checkout" back />
      <Content
        noPadding
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        <FetchWrapperComponent
          isLoading={isLoading}
          error={error}
          onRetry={refetch}
          component={
            <CheckoutContent
              onOpenSelectAddressBottomSheet={handleOpenSelectAddress}
            />
          }
        />
      </Content>
      <Button
        style={styles.button}
        onPress={handleMakeBilling}
        loading={makeBillingLoading}
        disabled={
          !data?.data?.id || !data?.data?.address?.id || !cost?.cost?.[0]?.value
        }
      >
        Bayar Sekarang
      </Button>
      <AddressBottomSheet ref={addressBottomSheetRef} />
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: sizeConstant.contentPad,
    marginVertical: sizeConstant.contentPad,
  },
});
