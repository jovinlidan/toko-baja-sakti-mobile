import {
  Address,
  CreateAddressFormInput,
  UpdateAddressFormInput,
} from "@api-hooks/address/address.model";
import Toast from "@common/helpers/toast";
import { View, Field, Form, Button, StyleSheet } from "@components/elements";
import CitySelectOption from "@components/elements/select-option/city-select-option";
import colorConstant from "@constants/color.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import useYupValidationResolver from "@hooks/use-yup-validation-resolver";
import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

interface FormType extends CreateAddressFormInput, UpdateAddressFormInput {}

interface Props {
  data?: Address;
  onSubmit: (values) => Promise<void>;
}

export default function ShippingAddressForm(props: Props) {
  const { onSubmit, data } = props;
  const router = useRouter();
  const YupSchema = useMemo(
    () =>
      Yup.object().shape({
        cityId: Yup.string().required(),
        tag: Yup.string(),
        addressDetail: Yup.string(),
        recipientName: Yup.string(),
        recipientNumber: Yup.string(),
        isMain: Yup.boolean().default(false),
      }),
    []
  );
  const resolver = useYupValidationResolver(YupSchema);

  const methods = useForm<FormType>({
    resolver,
    mode: "all",
    defaultValues: { ...data, cityId: data?.city?.id },
  });

  const handleSubmit = useCallback(
    async (values) => {
      try {
        const input = YupSchema.cast(values);
        await onSubmit(input);
        router.back();
      } catch (e: any) {
        e?.message && Toast.error(e?.message);
      }
    },
    [YupSchema, onSubmit, router]
  );

  const handleDelete = useCallback(() => {
    router.push("/modal");
  }, []);

  return (
    <Form methods={methods}>
      <Field type="normal" name="tag" label="Label Alamat" />
      <Field
        type="normal"
        name="addressDetail"
        label="Alamat"
        numberOfLines={4}
        multiline
      />
      <CitySelectOption name="cityId" label="Kota" placeholder="Pilih Kota" />
      <Field type="normal" name="recipientName" label="Nama Penerima" />
      <Field
        type="normal"
        name="recipientNumber"
        label="No. Handphone Penerima"
      />
      <Field name="isMain" type="checkbox" label="Jadikan alamat utama" />
      <View style={styMargin(16, SeparatorTypeEnum.bottom)} />
      <Field type="submit" onSubmit={handleSubmit}>
        Simpan
      </Field>
      {data?.id && (
        <Button
          onPress={handleDelete}
          style={[styMargin(16, SeparatorTypeEnum.top), styles.deleteButton]}
          variant="outline"
          textStyle={styles.deleteButtonText}
        >
          Hapus
        </Button>
      )}
    </Form>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    borderColor: colorConstant.redDefault,
  },
  deleteButtonText: {
    color: colorConstant.redDefault,
  },
});
