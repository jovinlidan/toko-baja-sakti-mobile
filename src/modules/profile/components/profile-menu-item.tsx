import { StyleSheet, View, Text, TouchableOpacity } from "@components/elements";
import sizeConstant from "@constants/size.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
export type ProfileMenuItemType = {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
};

export default function ProfileMenuItem(props: ProfileMenuItemType) {
  const { icon, label, onPress } = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styMargin(16, SeparatorTypeEnum.right)}>{icon}</View>
      <Text variant="bodyReg">{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopColor: "rgba(226, 223, 223, 0.5)",
    borderTopWidth: 1,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: sizeConstant.contentPad,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
