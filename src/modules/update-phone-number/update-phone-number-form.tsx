import { useCheckPhone } from "@api-hooks/auth/auth.mutation";
import Toast from "@common/helpers/toast";
import { Field, Form, Text, View } from "@components/elements";
import { OTP_VERIFICATION_SCREEN_NAME } from "@constants/route.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import useYupValidationResolver from "@hooks/use-yup-validation-resolver";
import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

export default function UpdatePhoneNumberForm() {
  const router = useRouter();
  const { mutateAsync: checkPhone } = useCheckPhone();
  const YupSchema = useMemo(
    () =>
      Yup.object().shape({
        phone: Yup.string()
          .matches(new RegExp(/[2-9]\d{8,13}$/), "Nomor telepon tidak valid")
          .required(),
        password: Yup.string().required(),
      }),
    []
  );
  const resolver = useYupValidationResolver(YupSchema);

  const methods = useForm<any>({
    resolver,
    mode: "all",
    defaultValues: {},
  });

  const onSubmit = useCallback(
    async (values) => {
      try {
        await checkPhone({ body: { phone: "+62" + values.phone } });
        router.push({
          pathname: OTP_VERIFICATION_SCREEN_NAME,
          params: {
            values: JSON.stringify(values),
            type: "change-phone-number",
          },
        });
      } catch (e: any) {
        e?.message && Toast.error(e?.message);
      }
    },
    [checkPhone, router]
  );

  return (
    <Form methods={methods}>
      <View style={styMargin(42, SeparatorTypeEnum.bottom)} />
      <Field
        type="phone"
        name="phone"
        label="Nomor Telepon"
        leftIconComponent={() => <Text>+62</Text>}
      />
      <Field type="password" name="password" label="Kata Sandi" />

      <View style={styMargin(28, SeparatorTypeEnum.bottom)} />

      <Field onSubmit={onSubmit} type="submit">
        Kirim OTP
      </Field>
    </Form>
  );
}
