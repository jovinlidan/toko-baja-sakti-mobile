import {
  Button,
  Field,
  Form,
  Text,
  View,
  StyleSheet,
} from "@components/elements";
import { LOGIN_SCREEN_NAME } from "@constants/route.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import useYupValidationResolver from "@hooks/use-yup-validation-resolver";
import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";

import * as Yup from "yup";

export default function RegisterForm() {
  const router = useRouter();
  const YupSchema = useMemo(
    () =>
      Yup.object().shape({
        phone: Yup.string().required(),
      }),
    []
  );
  const resolver = useYupValidationResolver(YupSchema);

  const methods = useForm<any>({
    resolver,
    mode: "all",
    defaultValues: {},
  });

  const onSubmit = useCallback(async (values) => {
    console.log(values);
  }, []);

  const onNavigateLogin = useCallback(() => {
    router.push(LOGIN_SCREEN_NAME);
  }, []);

  return (
    <Form methods={methods}>
      <View style={styMargin(42, SeparatorTypeEnum.bottom)} />
      <Field type="normal" name="fullName" label="Nama Lengkap" />
      <Field
        type="phone"
        name="phone"
        label="Nomor Telepon"
        leftIconComponent={() => <Text>+62</Text>}
      />
      <Field type="password" name="password" label="Kata Sandi" />
      <View style={styMargin(28, SeparatorTypeEnum.bottom)} />

      <Button onPress={methods.handleSubmit(onSubmit)}>Kirim OTP</Button>
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
