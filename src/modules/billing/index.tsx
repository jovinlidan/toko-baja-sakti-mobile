import { useGetBilling } from "@api-hooks/checkout/checkout.query";
import FetchWrapperComponent from "@components/common/fetch-wrapper-component";
import { Container, Content } from "@components/elements";
import { Header } from "@components/widgets";
import BillingContent from "./billing-content";
import { useSearchParams } from "expo-router";

export default function Billing() {
  const { id } = useSearchParams();
  const { isLoading, error, refetch } = useGetBilling({
    billingId: id as string,
  });

  return (
    <Container>
      <Header title="Pembayaran" back />
      <Content noPadding showsVerticalScrollIndicator={false}>
        <FetchWrapperComponent
          isLoading={isLoading}
          error={error}
          onRetry={refetch}
          component={<BillingContent />}
        />
      </Content>
    </Container>
  );
}
