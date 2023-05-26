import { useCheckPhone } from "@api-hooks/auth/auth.mutation";
import Toast from "@common/helpers/toast";
import {
  Button,
  Field,
  Form,
  Text,
  View,
  StyleSheet,
} from "@components/elements";
import {
  LOGIN_SCREEN_NAME,
  OTP_VERIFICATION_SCREEN_NAME,
} from "@constants/route.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import useYupValidationResolver from "@hooks/use-yup-validation-resolver";
import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";

import * as Yup from "yup";

export default function ResetPasswordForm() {
  const router = useRouter();
  const { mutateAsync: checkPhone } = useCheckPhone();
  const YupSchema = useMemo(
    () =>
      Yup.object().shape({
        phone: Yup.string().required(),
        password: Yup.string().required(),
        passwordConfirmation: Yup.string()
          .oneOf(
            [Yup.ref("password"), null],
            "Kolom tidak sama dengan Kata Sandi diatas"
          )
          .required(),
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
        // await checkPhone({ body: { phone: "+62" + values.phone } });
        router.push({
          pathname: OTP_VERIFICATION_SCREEN_NAME,
          params: { values: JSON.stringify(values), type: "reset-password" },
        });
      } catch (e: any) {
        e?.message && Toast.error(e?.message);
      }
    },
    [router]
  );

  const onNavigateLogin = useCallback(() => {
    router.push(LOGIN_SCREEN_NAME);
  }, [router]);

  return (
    <Form methods={methods}>
      <View style={styMargin(42, SeparatorTypeEnum.bottom)} />
      <Field
        type="phone"
        name="phone"
        label="Nomor Telepon"
        leftIconComponent={() => <Text>+62</Text>}
      />
      <Field type="password" name="password" label="Kata Sandi Baru" />
      <Field
        type="password"
        name="passwordConfirmation"
        label="Konfirmasi Kata Sandi Baru"
      />
      <View style={styMargin(28, SeparatorTypeEnum.bottom)} />

      <Field onSubmit={onSubmit} type="submit">
        Kirim OTP
      </Field>

      <View style={styMargin(28, SeparatorTypeEnum.bottom)} />
      <View style={styles.alreadyHaveAccContainer}>
        <Text variant="bodyReg">Sudah Mempunyai Akun?</Text>
        <View style={styMargin(8, SeparatorTypeEnum.right)} />
        <TouchableOpacity onPress={onNavigateLogin}>
          <Text variant="linkReg">Masuk</Text>
        </TouchableOpacity>
      </View>
    </Form>
  );
}

const styles = StyleSheet.create({
  alreadyHaveAccContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
