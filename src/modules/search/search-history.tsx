import { View, Text, StyleSheet, FlashList } from "@components/elements";
import sizeConstant from "@constants/size.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import { searchHistoryState } from "@models/search-history";
import { useRecoilValue } from "recoil";
import HistoryCard from "./components/history-card";

interface Props {
  onSelectHistory: (text: string) => void;
}

export default function SearchHistory(props: Props) {
  const { onSelectHistory } = props;
  const searchHistory = useRecoilValue(searchHistoryState);
  return (
    <View style={styles.container}>
      <Text variant="h5" style={styles.text}>
        Riwayat Pencarian
      </Text>
      <View style={styMargin(16, SeparatorTypeEnum.bottom)} />
      <FlashList
        data={searchHistory}
        estimatedListSize={{ width: 200, height: 200 }}
        renderItem={({ item }) => (
          <HistoryCard text={item} onPress={() => onSelectHistory(item)} />
        )}
        scrollEnabled={false}
        ListHeaderComponent={<HistoryCard.Separator />}
        ListFooterComponent={<HistoryCard.Separator />}
        ItemSeparatorComponent={() => <HistoryCard.Separator />}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={51}
        keyExtractor={(_, idx) => idx.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: sizeConstant.contentPad,
    paddingBottom: sizeConstant.contentPad,
  },
  text: {
    paddingHorizontal: sizeConstant.contentPad,
  },
});
