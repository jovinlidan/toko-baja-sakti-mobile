import * as React from "react";
import {
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  View,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
} from "react-native";
import colorConstant from "@constants/color.constant";
import sizeConstant from "@constants/size.constant";
import typographyConstant from "@constants/typography.constant";
import Text from "./text";

import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import useCustomFont from "@hooks/use-custom-font";
import { Entypo } from "@expo/vector-icons";

interface Props extends TextInputProps {
  type?: "normal" | "password";
  value?: string;
  label?: string;
  children?: any;
  disabled?: boolean;
  ref?: React.Ref<TextInput>;
  containerStyle?: StyleProp<ViewStyle>;
  leftIconContainerStyle?: StyleProp<ViewStyle>;
  leftIconComponent?: (size, color) => React.ReactNode;
  rightIconComponent?: (size, color) => React.ReactNode;
  customRightIconComponent?: () => React.ReactNode;
  rightIconOnPress?: () => void;
  leftIconOnPress?: () => void;
  isError?: boolean;
  required?: boolean;
  textInputContainerStyle?: StyleProp<ViewStyle>;
}

export const iconSize = 15;

function CustomTextInput(props: Props, ref: any) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [secureTextEntry, setSecureTextEntry] = React.useState(
    props.type === "password"
  );

  const {
    label,
    value,
    type,
    onFocus,
    onBlur,
    containerStyle,
    leftIconComponent,
    rightIconComponent,
    rightIconOnPress,
    leftIconContainerStyle,
    leftIconOnPress,
    placeholderTextColor = colorConstant.gray3,
    selectionColor,
    isError = false,
    customRightIconComponent,
    disabled,
    ...restProps
  } = props;

  const customRef = React.useRef<TextInput>();
  const customFont = useCustomFont(restProps, styles.defaultStyle);

  const currentColor = React.useMemo(() => {
    if (isError) return colorConstant.redDefault;
    return colorConstant.gray1;
  }, [containerStyle, isError, isFocused, value]);

  const currentBorderColor = React.useMemo(() => {
    if (isError) return colorConstant.redDefault;
    return colorConstant.gray5;
  }, [containerStyle, isError, isFocused, value]);

  const _handleOnPressView = React.useCallback(
    (onPress?: () => void) => {
      if (!isFocused && !onPress) {
        if (customRef?.current) {
          customRef.current.focus();
        } else if (ref?.current) {
          ref?.current?.focus && ref?.current?.focus();
        }
      } else {
        onPress && onPress();
      }
    },
    [ref, isFocused]
  );

  const _handleOnFocus = React.useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onFocus && onFocus(e);
      setIsFocused(true);
    },
    [onFocus]
  );

  const _handleOnBlur = React.useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onBlur && onBlur(e);
      setIsFocused(false);
    },
    [onBlur]
  );

  const rightComponent = React.useMemo(() => {
    if (customRightIconComponent) {
      return customRightIconComponent();
    } else if (rightIconComponent) {
      return (
        <TouchableWithoutFeedback
          style={styles.rightIconContainer}
          onPress={() => {
            rightIconOnPress && rightIconOnPress();
          }}
        >
          {rightIconComponent(iconSize, currentColor)}
        </TouchableWithoutFeedback>
      );
    } else if (props.type === "password") {
      return (
        <TouchableWithoutFeedback
          style={styles.rightIconContainer}
          onPress={() => {
            setSecureTextEntry((prev) => !prev);
          }}
        >
          {secureTextEntry ? (
            <Entypo
              name="eye-with-line"
              size={24}
              color={colorConstant.gray1}
            />
          ) : (
            <Entypo name="eye" size={24} color={colorConstant.gray1} />
          )}
        </TouchableWithoutFeedback>
      );
    }
    return null;
  }, [
    currentColor,
    customRightIconComponent,
    rightIconComponent,
    rightIconOnPress,
    secureTextEntry,
  ]);
  return (
    <>
      {!!label && (
        <Text variant="h5" style={[styles.defaultLabel]}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.defaultTextInputContainer,
          props.textInputContainerStyle && props.textInputContainerStyle,
          containerStyle,
          {
            borderColor: currentBorderColor,
            backgroundColor: disabled ? colorConstant.gray5 : undefined,
          },
          restProps.multiline && styles.multiline,
        ]}
      >
        {leftIconComponent && (
          <TouchableWithoutFeedback
            onPress={() => _handleOnPressView(leftIconOnPress)}
            style={[styles.leftIconContainer, leftIconContainerStyle]}
          >
            <View>{leftIconComponent(iconSize, currentColor)}</View>
          </TouchableWithoutFeedback>
        )}
        <TextInput
          {...customFont.props}
          allowFontScaling={false}
          secureTextEntry={secureTextEntry}
          style={[
            customFont.style,
            {
              color: currentColor,
            },
            restProps.multiline && styles.multiline,
          ]}
          selectionColor={selectionColor || currentColor}
          value={value}
          onFocus={_handleOnFocus}
          onBlur={_handleOnBlur}
          editable={!disabled}
          selectTextOnFocus={!disabled}
          contextMenuHidden={disabled}
          placeholderTextColor={placeholderTextColor}
          ref={(ref ? ref : customRef) as any}
        />
        {rightComponent}
      </View>
    </>
  );
}

export default React.forwardRef(CustomTextInput);

const styles = StyleSheet.create({
  defaultLabel: {
    marginBottom: 4,
  },
  defaultStyle: {
    height: "100%",
    width: "100%",
    borderColor: colorConstant.gray5,
    borderRadius: 10,
    color: colorConstant.gray1,
    paddingHorizontal: 16,
    flex: 1,
    ...typographyConstant.bodyReg,
  },
  defaultTextInputContainer: {
    height: sizeConstant.inputHeight,
    borderRadius: 2,
    position: "relative",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",

    width: "100%",
  },
  leftIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 16,
    height: "100%",
  },
  rightIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    height: "100%",
  },
  multiline: {
    height: 108,
  },
});
