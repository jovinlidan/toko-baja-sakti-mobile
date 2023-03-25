import { Toast } from "@common/helpers";
import {
  Button,
  Field,
  Form,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "@components/elements";
import colorConstant from "@constants/color.constant";
import { LOGIN_SCREEN_NAME } from "@constants/route.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import { useOTPHistory } from "@hooks/use-otp-history";
import useOTPVerification from "@hooks/use-otp-verification";
import useYupValidationResolver from "@hooks/use-yup-validation-resolver";
import { usePathname, useRouter, useSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import * as Yup from "yup";

type OTPVerificationFormType = {
  phone: string;
  otp: string;
};

export default function OTPVerificationForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { timer } = useOTPHistory();
  const { requestOTP, verifyOTP } = useOTPVerification({
    onCodeReceived: () => {},
  });

  const YupSchema = useMemo(
    () =>
      Yup.object().shape({
        phone: Yup.string().required(),
      }),
    []
  );
  const resolver = useYupValidationResolver(YupSchema);

  const methods = useForm<OTPVerificationFormType>({
    resolver,
    mode: "all",
    defaultValues: {
      phone: JSON.parse(params.values as string)?.phone,
    },
  });

  const onSubmit = useCallback(
    async (values: OTPVerificationFormType) => {
      try {
        const token = await verifyOTP(values.otp);
        console.log(token);
      } catch (e) {
        // console.log({ e });
      }
    },
    [verifyOTP]
  );

  // useEffect(() => {
  //   async function sendOTPExec() {
  //     try {
  //       await requestOTP("+62" + methods.getValues().phone);
  //     } catch (e: any) {
  //       Toast.error(e);
  //     } finally {
  //     }
  //   }
  //   sendOTPExec();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <Form methods={methods}>
      <View style={styMargin(42, SeparatorTypeEnum.bottom)} />
      <Field
        type="phone"
        name="phone"
        label="Nomor Telepon"
        leftIconComponent={() => <Text>+62</Text>}
        disabled
      />
      <Field type="normal" name="otp" label="Kode OTP" keyboardType="numeric" />
      <TouchableOpacity
        disabled={!!timer}
        onPress={() => requestOTP("+62" + methods.getValues().phone)}
      >
        <Text variant="label" style={!timer ? styles.resendText : undefined}>
          Kirim ulang OTP ({timer} s)
        </Text>
      </TouchableOpacity>
      <View style={styMargin(28, SeparatorTypeEnum.bottom)} />

      <Button onPress={methods.handleSubmit(onSubmit)}>Daftar</Button>
    </Form>
  );
}

const styles = StyleSheet.create({
  resendText: {
    color: colorConstant.blueDefault,
  },
});
