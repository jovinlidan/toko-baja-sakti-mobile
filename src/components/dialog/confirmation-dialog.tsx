import { View, Text, Button } from "@components/elements";
import colorConstant from "@constants/color.constant";
import React, { useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import DialogBackdrop from "./dialog-backdrop";

type VoidFunction = () => void;

export interface ConfirmationOption {
  title?: string;
  message: string;
  positiveLabel?: string;
  negativeLabel?: string;
  cancelable: boolean;
  onPositiveAction: (dismiss: VoidFunction) => void;
  onNegativeAction: (dismiss: VoidFunction) => void;
  noNegative?: boolean;
  positiveButtonColor?: string;
}

interface Props {
  title?: string;
  message?: string;
  positiveLabel?: string;
  negativeLabel?: string;
  cancelable?: boolean;
  onPositiveAction: () => Promise<void>;
  onNegativeAction: () => void;
  noNegative?: boolean;
  visible: boolean;
}

export default function ConfirmationDialog(props: Props) {
  const {
    title,
    message,
    positiveLabel = "Ok",
    negativeLabel = "Batal",
    cancelable = true,
    onPositiveAction,
    onNegativeAction,
    noNegative = false,
    visible,
  } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onPositivePress = useCallback(async () => {
    setIsLoading(true);
    await onPositiveAction();
    setIsLoading(false);
  }, [onPositiveAction]);

  const onNegativePress = useCallback(() => {
    if (onNegativeAction) {
      onNegativeAction();
    } else {
    }
  }, [onNegativeAction]);

  return (
    <DialogBackdrop
      onClose={onNegativePress}
      cancelable={cancelable}
      visible={visible}
    >
      <View style={styles.container}>
        <View style={styles.textSection}>
          {title && (
            <Text style={styles.title} variant="bodyLg">
              {title}
            </Text>
          )}
          <Text style={styles.message} variant="bodyReg">
            {message}
          </Text>
        </View>
        <View style={styles.buttonSection}>
          {!noNegative && (
            <Button
              onPress={onNegativePress}
              style={[styles.action, styles.negativeAction]}
              variant="outline"
              textStyle={styles.negativeLabel}
            >
              {negativeLabel}
            </Button>
          )}
          <Button
            onPress={onPositivePress}
            style={styles.action}
            loading={isLoading}
          >
            {positiveLabel}
          </Button>
        </View>
      </View>
    </DialogBackdrop>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorConstant.white,
    width: "90%",
    borderRadius: 16,
    overflow: "hidden",
    marginTop: "auto",
    marginBottom: "auto",
    alignSelf: "center",
  },
  action: {
    flex: 1,
    // padding: 24,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 8,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  message: {
    textAlign: "center",
  },
  textSection: {
    marginTop: 16,
    marginBottom: 32,
    padding: 8,
  },
  buttonSection: {
    flexDirection: "row",
    padding: 16,
  },
  negativeAction: {
    marginRight: 16,
    borderColor: colorConstant.redDefault,
  },
  negativeLabel: {
    color: colorConstant.redDefault,
  },
});
