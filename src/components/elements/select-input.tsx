import * as React from "react";
import {
  StyleProp,
  ViewStyle,
  TextStyle,
  View,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { SELECT_MODAL_SCREEN_NAME } from "@constants/route.constant";
import colorConstant from "@constants/color.constant";
import { Ionicons } from "@expo/vector-icons";
import typographyConstant from "@constants/typography.constant";
import sizeConstant from "@constants/size.constant";
import ImageComponent from "./image-component";
import InputGroup from "./input-group";
import Text from "./text";
import { useSelectModal } from "@hooks/use-select-modal";

export interface SelectOption {
  value: string | number;
  label: string;
  icon?: string;
  extra?: any;
}

export interface SelectInputProps {
  options: SelectOption[];
  value?: string | number;
  placeholder?: string;
  contentStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  placeholderStyle?: StyleProp<TextStyle>;
  dropdownStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  error?: string;
  fetchError?: boolean;
  loading?: boolean;
  label?: string;
  labelColor?: string;
  onRetry?: () => void;
  onPick?: (selected?: SelectOption) => void;
  onChange?: (value: SelectOption) => void;
  required?: boolean;
}

function SelectInput(props: SelectInputProps) {
  const {
    value,
    options,
    onChange,
    label,
    placeholder,
    labelColor,
    placeholderStyle,
    contentStyle,
    labelStyle,
    dropdownStyle,
    containerStyle,
    disabled = false,
    loading = false,
    error = "",
    fetchError = false,
    onRetry,
    onPick,
    required,
  } = props;
  const router = useRouter();
  const { setModalOptions } = useSelectModal();
  const selected = React.useMemo<SelectOption | undefined>(
    () => options.find((option) => String(option.value) === String(value)),
    [value, options]
  );

  const pick = React.useCallback(() => {
    Keyboard.dismiss();
    if (fetchError) {
      onRetry && onRetry();
    } else {
      setModalOptions?.({
        routeName: SELECT_MODAL_SCREEN_NAME,
        options: options,
        value: selected ? selected.value : "",
        onSelect: (newOption: SelectOption) => {
          if (onChange && newOption.value !== value) {
            onChange(newOption);
          }
        },
        modalTitle: "Pilih " + name,
      });
    }
  }, [fetchError, onRetry, options, selected, onChange, value]);

  const currentColor =
    !!error || fetchError
      ? colorConstant.redDefault
      : selected
      ? "white"
      : colorConstant.gray1;

  const iconContent = React.useMemo(() => {
    if (loading) {
      return (
        <ActivityIndicator
          style={StyleSheet.flatten([styles.dropdown, dropdownStyle])}
          color={colorConstant.gray1}
        />
      );
    } else if (fetchError) {
      return (
        <Ionicons
          name="ios-reload-outline"
          size={16}
          color={colorConstant.redDefault}
        />
      );
    }

    return <Ionicons name="chevron-down" size={24} color={currentColor} />;
  }, [currentColor, dropdownStyle, fetchError, loading]);

  const renderImageComponent = React.useMemo(() => {
    if (!selected || !selected.icon) {
      return;
    }

    return (
      <ImageComponent
        style={styles.icon}
        placeholderStyle={styles.icon}
        source={{ uri: selected.icon }}
        resizeMode="cover"
      />
    );
  }, [selected]);

  return (
    <InputGroup error={error} style={[styles.inputGroup, props.containerStyle]}>
      {!!label && (
        <Text
          style={[
            styles.label,
            { color: labelColor || colorConstant.gray1 },
            fetchError && !loading && styles.errorText,
            !!error && styles.errorText,
          ]}
          variant="h5"
        >
          {label || " "}
          {required && <Text style={styles.requiredText}>{"    *"}</Text>}
        </Text>
      )}
      <TouchableOpacity
        style={[
          styles.container,
          !!error && styles.errorContainer,
          fetchError && !loading && styles.errorText,
          containerStyle,
        ]}
        disabled={disabled || loading}
        onPress={onPick ? () => onPick(selected) : pick}
      >
        <View style={StyleSheet.flatten([styles.content, contentStyle])}>
          {!!selected && !!selected.icon && renderImageComponent}
          {selected && (
            <Text style={[styles.text, labelStyle]}>{selected.label}</Text>
          )}
          {!!placeholder && !selected && (
            <Text
              style={[
                styles.placeholder,
                placeholderStyle,
                typographyConstant.bodyReg,
              ]}
            >
              {placeholder}
            </Text>
          )}
          {iconContent}
        </View>
      </TouchableOpacity>
    </InputGroup>
  );
}

const styles = StyleSheet.create({
  container: {},
  errorContainer: {
    borderWidth: 1,
    borderColor: colorConstant.redDefault,
    borderRadius: 8,
  },
  requiredText: {
    color: colorConstant.redDefault,
    letterSpacing: -2,
  },
  errorText: {
    color: colorConstant.redDefault,
  },
  content: {
    height: sizeConstant.inputHeight,
    borderRadius: 2,
    flexDirection: "row",
    alignItems: "center",
    margin: 0,
    paddingLeft: 16,
    borderColor: colorConstant.gray5,
    borderWidth: 1,
    paddingRight: 12,
  },
  text: {
    // color: co.defaultText,
    // fontSize: size.inputSize,
    flexGrow: 1,
    flexShrink: 1,
  },
  placeholder: {
    // color: color.placeholder,
    // fontSize: size.inputSize,
    flexGrow: 1,
    flexShrink: 1,
  },
  label: {
    marginBottom: 4,
  },
  inputGroup: {
    width: "100%",
    marginBottom: 16,
  },
  icon: {
    // width: size.inputSize + 5,
    // height: size.inputSize + 5,
    marginRight: 8,
  },
  dropdown: {
    // width: size.inputSize,
    // height: size.inputSize,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    position: "absolute",
    right: 16,
    // top: 18,
  },
  errorBg: {
    // backgroundColor: color.warningRedLight,
    // borderRadius: (size.inputSize - 2) / 2,
  },
  errorLabel: {
    color: "white",
    // width: size.inputSize - 2,
    // height: size.inputSize - 2,
    // fontSize: size.inputSize - 1,
    // lineHeight: size.inputSize,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default React.memo(SelectInput);
