import { View, ActivityIndicator, StyleSheet } from "../elements";
import colorConstant from "@constants/color.constant";
import sizeConstant from "@constants/size.constant";

interface Props {
  noPadding?: boolean;
}
export default function LoadingViewComponent(props: Props) {
  return (
    <View
      style={[
        styles.loadingContainer,
        !props.noPadding && { paddingHorizontal: sizeConstant.contentPad },
      ]}
    >
      <ActivityIndicator color={colorConstant.primaryOrange1} size="large" />
    </View>
  );
}
const styles = StyleSheet.create({
  loadingContainer: {
    width: "100%",
    height: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
