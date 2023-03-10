import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
  SafeAreaView,
} from "react-native";
import color from "@constants/color.constant";

interface Props {
  children: React.ReactNode;
  topSafeArea?: boolean;
  bottomSafeArea?: boolean;
  style?: ViewStyle;
}

export default function Container(props: Props) {
  const { children, topSafeArea = true, bottomSafeArea = true, style } = props;
  const containerStyle = [styles.container, style];
  return Platform.OS === "ios" ? (
    <KeyboardAvoidingView
      keyboardVerticalOffset={0}
      behavior={"padding"}
      style={[containerStyle]}
    >
      {topSafeArea && <SafeAreaView />}
      {children}
      {bottomSafeArea && <SafeAreaView />}
    </KeyboardAvoidingView>
  ) : (
    <View style={containerStyle}>{children}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
});
