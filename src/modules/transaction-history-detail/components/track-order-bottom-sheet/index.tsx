import * as React from "react";
import { View, Text, StyleSheet } from "@components/elements";
import { SafeAreaView } from "react-native";
import BottomPanel from "@components/widgets/bottom-panel";
import FetchWrapperComponent from "@components/common/fetch-wrapper-component";
import { useGetTransactionHistory } from "@api-hooks/transaction/transaction.query";
import { format } from "date-fns";
import Timeline from "@components/widgets/timeline";
interface Props {
  id: string;
}

function TrackOrderBottomSheet(props: Props, ref) {
  const snapPoints = ["50%"];
  const { data, isLoading, refetch, error } = useGetTransactionHistory({
    id: props.id,
  });

  const onClose = React.useCallback(() => {
    ref?.current && ref?.current?.snapTo(-1);
  }, [ref]);

  const timelineData = React.useMemo(() => {
    return (
      data?.data?.transactionHistories?.map((item, idx) => ({
        id: idx,
        status: item.title,
        date: item?.createdAt
          ? format(item.createdAt, "dd MMM yyyy, HH:mm:ss")
          : "-",
      })) || []
    );
  }, [data?.data?.transactionHistories]);

  return (
    <BottomPanel
      snapPoints={snapPoints}
      ref={ref}
      initialSnapIndex={-1}
      onClose={() => onClose()}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text variant="h4">Lacak Pesanan</Text>
        </View>

        <FetchWrapperComponent
          isLoading={isLoading}
          onRetry={refetch}
          error={error}
          component={
            <View style={styles.timelineContainer}>
              <Timeline data={timelineData} />
            </View>
          }
        />
      </View>
      <SafeAreaView />
    </BottomPanel>
  );
}

export default React.forwardRef(TrackOrderBottomSheet);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
    flex: 1,
    display: "flex",
    zIndex: 2000,
  },
  headerContainer: {
    width: "100%",
    marginBottom: 24,
    alignItems: "center",
  },
  timelineContainer: {
    alignSelf: "flex-start",
    width: "100%",
  },
});
