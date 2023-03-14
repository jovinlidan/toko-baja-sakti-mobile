import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import color from "@constants/color.constant";
import size from "@constants/size.constant";
import Text from "@components/elements/text";
import typographyConstant from "@constants/typography.constant";
import { FieldError } from "react-hook-form";

export interface InputGroupProps extends ViewProps {
  children: React.ReactNode;
  error?: string | boolean | undefined | any | FieldError;
  disabledErrorText?: boolean;
}

export default function InputGroup(props: InputGroupProps) {
  const { error, style, children, disabledErrorText } = props;

  const renderErrorText = React.useMemo(() => {
    if (typeof error === "string") {
      return error;
    } else if (error?.message as FieldError) {
      return error.message;
    }
    return null;
  }, [error]);

  return (
    <View style={style}>
      <View style={[styles.container, !!error && styles.errorContainer]}>
        <View style={styles.content}>{children}</View>
      </View>
      {!!error && !disabledErrorText && renderErrorText && (
        <Text style={styles.errorText}>{renderErrorText}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  content: {
    flexDirection: "column",
    flexGrow: 1,
    flexShrink: 1,
  },
  label: {
    color: color.gray1,
    position: "absolute",
    // top: size.inputBottomPadding,
    // left: size.inputHorizontalPadding,
    ...typographyConstant.h5,
  },
  errorLabel: {
    color: color.redDefault,
  },
  errorContainer: {
    borderColor: color.redDefault,
  },
  errorText: {
    color: color.redDefault,
    fontSize: 13,
  },
  required: {
    color: color.redDefault,
    fontSize: 13,
    fontWeight: "500",
  },
});
