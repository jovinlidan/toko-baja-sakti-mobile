import * as React from "react";
import { FieldProps } from "../field";
import { Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { SelectInput } from "@app/components/elements";
import { useField } from "formik";
import { NavigationAnyProp } from "@app/../router";
import { SELECT_OPTION_SCREEN_NAME } from "@app/screens/select-option-screen";
import {
  SelectInputProps,
  SelectOption,
} from "@app/components/elements/select-input";

export interface SelectFieldProps extends SelectInputProps, FieldProps {
  type: "select";
}

export default function SelectField(
  props: Omit<SelectFieldProps, "value" | "onPick">
) {
  const { options, name, onRetry, onChange, fetchError } = props;
  const navigation = useNavigation<NavigationAnyProp>();

  const [, meta, helpers] = useField(name);

  const error = (meta.touched || "") && meta.error;

  const pick = React.useCallback(
    (selected?: SelectOption) => {
      Keyboard.dismiss();
      helpers.setTouched(true);
      if (fetchError) {
        onRetry && onRetry();
      } else {
        navigation.navigate({
          name: SELECT_OPTION_SCREEN_NAME,
          params: {
            options: options,
            value: selected ? selected.value : "",
            onSelect: (newValue: SelectOption) => {
              if (onChange && newValue !== meta?.value) {
                onChange(newValue);
              }
            },
          },
        });
      }
    },
    [helpers, fetchError, onRetry, navigation, options, onChange, meta?.value]
  );

  return <SelectInput {...props} error={error} onPick={pick} />;
}
