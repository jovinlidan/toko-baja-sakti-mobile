import FetchWrapperComponent from "@components/common/fetch-wrapper-component";
import { Container } from "@components/elements";
import { Header } from "@components/widgets";
import { useGetTransactions } from "@api-hooks/transaction/transaction.query";
import TransactionHistoryContent from "./transaction-history-content";
import EmptyDataView from "./components/empty-data-view";

export default function TransactionHistory() {
  const { isLoading, error, refetch, data } = useGetTransactions();

  return (
    <Container>
      <Header title="Riwayat Transaksi" back />
      <FetchWrapperComponent
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
        empty={!data?.data?.length}
        emptyComponent={<EmptyDataView />}
        component={<TransactionHistoryContent />}
      />
    </Container>
  );
}
