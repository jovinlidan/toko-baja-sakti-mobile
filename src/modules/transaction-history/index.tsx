import FetchWrapperComponent from "@components/common/fetch-wrapper-component";
import { Container, Content } from "@components/elements";
import { Header } from "@components/widgets";
import { useGetTransactions } from "@api-hooks/transaction/transaction.query";
import TransactionHistoryContent from "./transaction-history-content";

export default function TransactionHistory() {
  const { isLoading, error, refetch } = useGetTransactions();

  return (
    <Container>
      <Header title="Riwayat Transaksi" back />
      <FetchWrapperComponent
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
        component={<TransactionHistoryContent />}
      />
    </Container>
  );
}
