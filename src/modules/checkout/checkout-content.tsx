import { useGetCheckout } from "@api-hooks/checkout/checkout.query";
import { View, Text, StyleSheet } from "@components/elements";
import colorConstant from "@constants/color.constant";
import { Fragment } from "react";
import ProductCard from "./components/product-card";

function Separator() {
  return <View style={styles.separator} />;
}

export default function CheckoutContent() {
  const { data } = useGetCheckout();
  return (
    <View>
      {data?.data?.checkoutDetails?.map((item, idx) => (
        <Fragment>
          <ProductCard {...item} />
          <Separator />
        </Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    borderBottomColor: colorConstant.stroke,
    borderBottomWidth: 1,
  },
});
