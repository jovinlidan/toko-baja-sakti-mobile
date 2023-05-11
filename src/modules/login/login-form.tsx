import { useLoginUser } from "@api-hooks/auth/auth.mutation";
import { formSetErrors } from "@common/helpers/form";
import Toast from "@common/helpers/toast";
import { setupToken } from "@common/repositories";
import {
  Button,
  Field,
  Form,
  Text,
  View,
  StyleSheet,
} from "@components/elements";
import { REGISTER_SCREEN_NAME } from "@constants/route.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import { useCredential } from "@hooks/use-credential";
import useMe from "@hooks/use-me";
import useYupValidationResolver from "@hooks/use-yup-validation-resolver";
import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";

import * as Yup from "yup";

export default function LoginForm() {
  const router = useRouter();
  const { mutateAsync: login } = useLoginUser();
  const { setCredential } = useCredential();
  const { refetch } = useMe();
  const YupSchema = useMemo(
    () =>
      Yup.object().shape({
        username: Yup.string().required(),
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
        const result = await login({
          body: { ...values, username: "+62" + values.username },
        });
        setupToken(result?.data?.accessToken);
        setCredential(result?.data);
        await refetch();
        result?.message && Toast.success(result?.message);
      } catch (e: any) {
        if (e?.errors) {
          formSetErrors(e?.errors, methods.setError);
        }
        Toast.success(e?.message);
      }
    },
    [login, methods.setError, refetch, setCredential]
  );

  const onNavigateRegister = useCallback(() => {
    router.push(REGISTER_SCREEN_NAME);
  }, [router]);

  return (
    <Form methods={methods}>
      <View style={styMargin(42, SeparatorTypeEnum.bottom)} />
      <Field
        type="phone"
        name="username"
        label="Nomor Telepon"
        leftIconComponent={() => <Text>+62</Text>}
      />
      <Field type="password" name="password" label="Kata Sandi" />
      <View style={styMargin(28, SeparatorTypeEnum.bottom)} />

      <Button
        onPress={methods.handleSubmit(onSubmit)}
        loading={methods.formState.isSubmitting}
      >
        Login In
      </Button>

      <View style={styMargin(28, SeparatorTypeEnum.bottom)} />

      <Field name="rememberMe" label="Ingat Saya" type="checkbox" />

      <View style={styMargin(28, SeparatorTypeEnum.bottom)} />

      <View style={styles.alreadyHaveAccContainer}>
        <Text variant="bodyReg">Belum Mempunyai Akun?</Text>
        <View style={styMargin(8, SeparatorTypeEnum.right)} />
        <TouchableOpacity onPress={onNavigateRegister}>
          <Text variant="linkReg">Daftar</Text>
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
