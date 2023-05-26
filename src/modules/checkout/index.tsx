import { useGetCheckout } from "@api-hooks/checkout/checkout.query";
import FetchWrapperComponent from "@components/common/fetch-wrapper-component";
import { Button, Container, Content, StyleSheet } from "@components/elements";
import { Header } from "@components/widgets";
import sizeConstant from "@constants/size.constant";
import { useCallback, useRef } from "react";
import CheckoutContent from "./checkout-content";
import AddressBottomSheet from "./components/address-bottom-sheet";

export default function Checkout() {
  const { isLoading, error, refetch } = useGetCheckout();

  const addressBottomSheetRef = useRef<any>();

  const handleOpenSelectAddress = useCallback(() => {
    addressBottomSheetRef?.current?.snapTo(0);
  }, []);
  return (
    <Container>
      <Header title="Checkout" back />
      <Content noPadding showsVerticalScrollIndicator={false}>
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
      <AddressBottomSheet ref={addressBottomSheetRef} />
      <Button style={styles.button}>Bayar Sekarang</Button>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: sizeConstant.contentPad,
    marginVertical: sizeConstant.contentPad,
  },
});
