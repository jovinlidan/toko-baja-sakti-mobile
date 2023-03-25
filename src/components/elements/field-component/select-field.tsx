import * as React from "react";
import { FieldProps } from "../field";
import { Keyboard } from "react-native";
import SelectInput, {
  SelectInputProps,
  SelectOption,
} from "@components/elements/select-input";
import { useController, useFormContext } from "react-hook-form";
import { SELECT_MODAL_SCREEN_NAME } from "@constants/route.constant";
import { useSelectModal } from "@hooks/use-select-modal";

export interface SelectFieldProps extends SelectInputProps, FieldProps {
  type: "select";
}

export default function SelectField(
  props: Omit<SelectFieldProps, "value" | "onPick">
) {
  const { options, name, onRetry, onChange, fetchError, label } = props;
  const { setModalOptions } = useSelectModal();

  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name,
    control,
  });

  const pick = React.useCallback(
    (selected?: SelectOption) => {
      Keyboard.dismiss();
      if (fetchError) {
        onRetry && onRetry();
      } else {
        setModalOptions?.({
          routeName: SELECT_MODAL_SCREEN_NAME,
          options: options,
          value: selected ? selected.value : "",
          onSelect: (newValue: SelectOption) => {
            if (newValue !== field?.value) {
              field.onChange(newValue);
            }
          },
          modalTitle: label,
        });
      }
    },
    [fetchError, onRetry, options, onChange, field.value]
  );

  return (
    <SelectInput
      {...props}
      onChange={field.onChange}
      value={field.value?.value}
      error={fieldState.error?.message}
      onPick={pick}
    />
  );
}
