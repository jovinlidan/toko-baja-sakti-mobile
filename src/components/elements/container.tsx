import colorConstant from "@constants/color.constant";
import React, { ReactNode } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ViewStyle,
} from "react-native";

interface Props {
  children: React.ReactNode;
  topSafeArea?: boolean;
  bottomSafeArea?: boolean;
  style?: ViewStyle;
  halfBackgroundContainer?: boolean;
  keyboardAvoidingViewBehavior?: "padding" | "height" | "position" | "none";
}

export default function Container(props: Props) {
  const {
    children,
    topSafeArea = true,
    bottomSafeArea = true,
    style,
    halfBackgroundContainer = false,
    keyboardAvoidingViewBehavior = "padding",
  } = props;
  const containerStyle = [styles.container, style];
  return Platform.OS === "ios" ? (
    <KeyboardAvoidingView
      keyboardVerticalOffset={0}
      style={containerStyle}
      behavior={
        keyboardAvoidingViewBehavior === "none"
          ? undefined
          : keyboardAvoidingViewBehavior
      }
    >
      {topSafeArea && <SafeAreaView />}
      {halfBackgroundContainer && <View style={styles.topBackground} />}
      {children}
      {bottomSafeArea && <SafeAreaView />}
    </KeyboardAvoidingView>
  ) : (
    <View style={containerStyle}>
      {halfBackgroundContainer && <View style={styles.topBackground} />}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorConstant.white,
  },
  topBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: "50%",
    backgroundColor: colorConstant.white,
  },
});
