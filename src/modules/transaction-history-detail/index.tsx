import FetchWrapperComponent from "@components/common/fetch-wrapper-component";
import { Container, Content } from "@components/elements";
import { Header } from "@components/widgets";
import { useGetTransaction } from "@api-hooks/transaction/transaction.query";
import TransactionHistoryDetailContent from "./transaction-history-detail-content";
import { useSearchParams } from "expo-router";
import TrackOrderBottomSheet from "./components/track-order-bottom-sheet";
import { useCallback, useRef } from "react";

export default function TransactionHistoryDetail() {
  const { id } = useSearchParams();
  const { isLoading, error, refetch } = useGetTransaction({ id: id as string });
  const ref = useRef<any>();

  const handleOpenTrackOrder = useCallback(() => {
    ref?.current?.snapTo(0);
  }, []);

  return (
    <Container>
      <Header title="Rincian Riwayat Transaksi" back />
      <Content noPadding showsVerticalScrollIndicator={false}>
        <FetchWrapperComponent
          isLoading={isLoading}
          error={error}
          onRetry={refetch}
          component={
            <TransactionHistoryDetailContent
              handleOpenTrackOrder={handleOpenTrackOrder}
            />
          }
        />
      </Content>
      <TrackOrderBottomSheet ref={ref} id={id as string} />
    </Container>
  );
}
