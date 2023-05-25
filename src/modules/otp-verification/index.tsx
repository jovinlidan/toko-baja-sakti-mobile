import {
  useChangePhoneNumber,
  useRegisterUser,
  useResetPasswordUser,
} from "@api-hooks/auth/auth.mutation";
import Toast from "@common/helpers/toast";
import { setupToken } from "@common/repositories";
import { Container, Content, Text, View } from "@components/elements";
import { Header } from "@components/widgets";
import {
  HOME_SCREEN_NAME,
  LOGIN_SCREEN_NAME,
  UPDATE_PROFILE_SCREEN_NAME,
} from "@constants/route.constant";
import { useCredential } from "@hooks/use-credential";
import useMe from "@hooks/use-me";
import { useRouter, useSearchParams } from "expo-router";
import { useCallback } from "react";
import { StyleSheet } from "react-native";
import OTPVerificationForm from "./otp-verification-form";

export default function OTPVerification() {
  const params = useSearchParams();
  const { mutateAsync: register } = useRegisterUser();
  const { mutateAsync: resetPassword } = useResetPasswordUser();
  const { mutateAsync: changePhoneNumber } = useChangePhoneNumber();
  const { setCredential } = useCredential();
  const { refetch } = useMe();
  const router = useRouter();

  const onRegisterSubmit = useCallback(
    async (values, token) => {
      const result = await register({
        body: {
          ...values,
          verificationToken: token,
        },
      });
      router.replace(HOME_SCREEN_NAME);
      setupToken(result?.data?.accessToken);
      setCredential(result?.data);
      await refetch();
      result?.message && Toast.success(result?.message);
    },
    [refetch, register, router, setCredential]
  );

  const onResetPasswordSubmit = useCallback(
    async (values, token) => {
      const result = await resetPassword({
        body: {
          ...values,
          phone: "+62" + values.phone,
          verificationToken: token,
        },
      });
      result?.message && Toast.success(result?.message);
      router.replace(LOGIN_SCREEN_NAME);
    },
    [resetPassword, router]
  );
  const onChangePhoneNumberSubmit = useCallback(
    async (values, token) => {
      const result = await changePhoneNumber({
        body: {
          ...values,
          phone: "+62" + values.phone,
          verificationToken: token,
        },
      });
      await refetch();
      result?.message && Toast.success(result?.message);
      router.replace(UPDATE_PROFILE_SCREEN_NAME);
    },
    [changePhoneNumber, refetch, router]
  );

  const onSubmit = useCallback(
    (values, token) => {
      switch (params.type) {
        case "register":
          return onRegisterSubmit(values, token);
        case "reset-password":
          return onResetPasswordSubmit(values, token);
        case "change-phone-number":
          return onChangePhoneNumberSubmit(values, token);
      }
    },
    [
      onChangePhoneNumberSubmit,
      onRegisterSubmit,
      onResetPasswordSubmit,
      params.type,
    ]
  );

  return (
    <Container>
      <Header back title="Verifikasi OTP" />
      <Content>
        <View style={styles.titleContainer}>
          <Text variant="h4" style={styles.titleText}>
            Toko Baja Sakti
          </Text>
        </View>

        <OTPVerificationForm onSubmit={onSubmit} />
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  titleText: {
    letterSpacing: 0.3,
  },
  titleContainer: {
    alignItems: "center",
  },
});
