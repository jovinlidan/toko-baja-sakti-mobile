import ShippingCostProvider from "@hooks/use-shipping-cost";
import Checkout from "@modules/checkout";

export default function CheckoutScreen() {
  return (
    <ShippingCostProvider>
      <Checkout />
    </ShippingCostProvider>
  );
}
