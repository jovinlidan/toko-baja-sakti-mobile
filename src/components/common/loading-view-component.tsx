import { View, ActivityIndicator, StyleSheet } from "../elements";
import colorConstant from "@constants/color.constant";
export default function LoadingViewComponent() {
  return (
    <View style={styles.loadingContainer}>
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
