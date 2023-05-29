import { useGetCheckout } from "@api-hooks/checkout/checkout.query";
import { View, Text, StyleSheet, Button } from "@components/elements";
import colorConstant from "@constants/color.constant";
import sizeConstant from "@constants/size.constant";
import { Fragment } from "react";
import Address from "./components/address";
import CheckoutCost from "./components/checkout-cost";
import Note from "./components/note";
import ProductCard from "./components/product-card";
import { CourierCost } from "@api-hooks/checkout/checkout.model";

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
      {data?.data?.checkoutDetails?.map((item) => (
        <Fragment key={item.id}>
          <ProductCard {...item} />
          <Separator />
        </Fragment>
      ))}
      <Address
        onOpenSelectAddressBottomSheet={onOpenSelectAddressBottomSheet}
        address={data?.data?.address}
      />
      <Separator />
      <CheckoutCost
        weight={data?.data?.totalWeight || 0}
        destination={data?.data?.address?.city?.code}
        grandTotal={data?.data?.grandTotal || 0}
      />
      <Separator />
      <Note />
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    borderBottomColor: colorConstant.stroke,
    borderBottomWidth: 1,
  },
});
