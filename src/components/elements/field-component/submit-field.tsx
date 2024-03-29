import Button from "@components/elements/button";
import { useFormContext } from "react-hook-form";

export interface SubmitFieldProps {
  onSubmit: (values: any) => Promise<void>;
  type: "submit";
  children: any;
}
export default function SubmitField(props: SubmitFieldProps) {
  const methods = useFormContext();
  return (
    <Button
      onPress={methods.handleSubmit(props.onSubmit)}
      loading={methods.formState.isSubmitting}
      disabled={Object.keys(methods.formState.errors).length > 0}
      {...props}
    />
  );
}
