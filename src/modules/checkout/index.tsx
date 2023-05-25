import { useGetCheckout } from "@api-hooks/checkout/checkout.query";
import FetchWrapperComponent from "@components/common/fetch-wrapper-component";
import { Container, Content } from "@components/elements";
import { Header } from "@components/widgets";
import CheckoutContent from "./checkout-content";

export default function Checkout() {
  const { isLoading, error, refetch } = useGetCheckout();
  return (
    <Container>
      <Header title="Checkout" back />
      <Content noPadding>
        <FetchWrapperComponent
          isLoading={isLoading}
          error={error}
          onRetry={refetch}
          component={<CheckoutContent />}
        />
      </Content>
    </Container>
  );
}
