import { View, StyleSheet, Text, Pressable } from "@components/elements";
import colorConstant from "@constants/color.constant";
import sizeConstant from "@constants/size.constant";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  text: string;
  onPress: VoidFunction;
}

export default function HistoryCard(props: Props) {
  const { text, onPress } = props;
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text variant="bodyReg" color={colorConstant.gray2} style={styles.text}>
        {text}
      </Text>
      <Ionicons name="chevron-forward" size={24} color={colorConstant.gray4} />
    </Pressable>
  );
}

HistoryCard.Separator = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: sizeConstant.contentPad,
    flexDirection: "row",
    alignItems: "center",
  },
  separator: {
    borderBottomColor: colorConstant.stroke,
    borderBottomWidth: 1,
  },
  text: {
    flex: 1,
  },
});
