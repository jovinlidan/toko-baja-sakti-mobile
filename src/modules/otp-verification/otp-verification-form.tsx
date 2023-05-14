import { useRegisterUser } from "@api-hooks/auth/auth.mutation";
import Toast from "@common/helpers/toast";
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
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import { useCredential } from "@hooks/use-credential";
import useMe from "@hooks/use-me";
import { useOTPHistory } from "@hooks/use-otp-history";
import useOTPVerification from "@hooks/use-otp-verification";
import useYupValidationResolver from "@hooks/use-yup-validation-resolver";
import { useSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import * as Yup from "yup";

type OTPVerificationFormType = {
  phone: string;
  otp: string;
};

interface Props {
  onSubmit: (values, token) => void;
}

export default function OTPVerificationForm(props: Props) {
  const params = useSearchParams();
  const { timer } = useOTPHistory();
  const { requestOTP, verifyOTP } = useOTPVerification({
    onCodeReceived: () => {},
  });

  const YupSchema = useMemo(
    () =>
      Yup.object().shape({
        phone: Yup.string().required(),
        otp: Yup.string().required(),
      }),
    []
  );
  const resolver = useYupValidationResolver(YupSchema);

  const methods = useForm<OTPVerificationFormType>({
    resolver,
    mode: "all",
    defaultValues: {
      ...JSON.parse(params.values as string),
      phone: JSON.parse(params.values as string)?.phone,
    },
  });
  const onSubmit = useCallback(
    async (values: OTPVerificationFormType) => {
      try {
        const token = await verifyOTP(values.otp);
        if (!token) {
          throw new Error("Gagal Verifikasi OTP");
        }
        await props.onSubmit(values, token);
      } catch (e: any) {
        Toast.error(e?.message);
      }
    },
    [props, verifyOTP]
  );

  const requestOTPByPhone = useCallback(() => {
    requestOTP("+62" + methods.getValues().phone);
  }, [methods, requestOTP]);

  useEffect(() => {
    requestOTPByPhone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <TouchableOpacity disabled={!!timer} onPress={requestOTPByPhone}>
        <Text variant="label" style={!timer ? styles.resendText : undefined}>
          Kirim ulang OTP {timer ? `(${timer} s)` : null}
        </Text>
      </TouchableOpacity>
      <View style={styMargin(28, SeparatorTypeEnum.bottom)} />

      <Field type="submit" onSubmit={onSubmit}>
        Verifikasi
      </Field>
    </Form>
  );
}

const styles = StyleSheet.create({
  resendText: {
    color: colorConstant.blueDefault,
  },
});
