import { useGetCheckout } from "@api-hooks/checkout/checkout.query";
import { View, Text, StyleSheet } from "@components/elements";
import colorConstant from "@constants/color.constant";
import { Fragment } from "react";
import Address from "./components/address";
import ProductCard from "./components/product-card";

function Separator() {
  return <View style={styles.separator} />;
}
interface Props {
  onOpenSelectAddressBottomSheet: VoidFunction;
}
export default function CheckoutContent(props: Props) {
  const { onOpenSelectAddressBottomSheet } = props;
  const { data } = useGetCheckout();
  return (
    <View>
      {data?.data?.checkoutDetails?.map((item, idx) => (
        <Fragment>
          <ProductCard {...item} />
          <Separator />
        </Fragment>
      ))}
      <Address
        onOpenSelectAddressBottomSheet={onOpenSelectAddressBottomSheet}
        address={data?.data?.address}
      />
      <Separator />
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    borderBottomColor: colorConstant.stroke,
    borderBottomWidth: 1,
  },
});
