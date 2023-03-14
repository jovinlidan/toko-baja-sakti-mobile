import * as React from "react";

import TextField, { CustomTextInputProps } from "./field-component/text-field";
// import SelectField, { SelectFieldProps } from "./field-component/select-field";

export type FieldType = "normal" | "phone" | "password" | "select";

export interface FieldProps {
  type: FieldType;
  name: string;
}

export type CombinedFieldProps = CustomTextInputProps;
// | SelectFieldProps;

export default function Field(props: CombinedFieldProps) {
  switch (props.type) {
    // case "select":
    //   return <SelectField {...props} />;
    default:
      return <TextField {...props} />;
  }
}
