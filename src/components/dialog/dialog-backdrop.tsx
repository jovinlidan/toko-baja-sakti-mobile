import colorConstant from "@constants/color.constant";
import React, { useCallback, useEffect } from "react";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  BackHandler,
  Platform,
  StatusBar,
} from "react-native";
import { Modal, View, Pressable } from "../elements";

interface PropsInterface {
  children: React.ReactNode;
  cancelable?: boolean;
  onClose: () => void;
  style?: StyleProp<ViewStyle>;
  noSafeArea?: boolean;
  visible: boolean;
}

export default function DialogBackdrop(props: PropsInterface) {
  const { children, onClose, cancelable, visible } = props;

  const onCancel = useCallback(() => {
    if (cancelable) {
      onClose();
    }
  }, [cancelable, onClose]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        onCancel();
        return true;
      }
    );
    return () => {
      backHandler.remove();
    };
  }, [onCancel]);

  return (
    <Modal
      style={styles.container}
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onCancel} />
      <StatusBar backgroundColor={colorConstant.dialogBackdropColor} />
      {children}
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "none",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "black",
  },
  backdrop: {
    backgroundColor: colorConstant.dialogBackdropColor,
    ...StyleSheet.absoluteFillObject,
  },
});
