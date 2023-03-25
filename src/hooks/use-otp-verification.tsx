import { Toast } from "@common/helpers";
import { ReactNativeFirebase } from "@react-native-firebase/app";
import auth, { firebase } from "@react-native-firebase/auth";
import { useCallback, useRef } from "react";
import { useOTPHistory } from "./use-otp-history";

interface OTPVerificationOptions {
  onCodeReceived(code: string): void;
}

const getErrorMessage = (
  error: ReactNativeFirebase.NativeFirebaseError
): string => {
  switch (error.code) {
    case "auth/too-many-requests":
      return "Terlalu banyak permintaan kode OTP";
    default:
      return "Kode OTP Gagal dikirim";
  }
};

export default function useOTPVerification(options: OTPVerificationOptions) {
  const { canStartTimer } = useOTPHistory();
  const { onCodeReceived } = options;
  const verificationId = useRef<string | null>(null);

  const requestOTP = useCallback(
    async (phoneNumber: string) => {
      if (auth().currentUser) {
        await auth().signOut();
      }
      try {
        const result = canStartTimer(phoneNumber);
        if (!result.valid) {
          Toast.error("error send otp");
          return;
        }
        result.onStart?.();
        auth()
          .verifyPhoneNumber(phoneNumber)
          .on("state_changed", (phoneAuthSnapshot: any) => {
            switch (phoneAuthSnapshot.state) {
              case firebase.auth.PhoneAuthState.CODE_SENT:
                verificationId.current = phoneAuthSnapshot.verificationId;
                Toast.info("Kode OTP Dikirim");
                break;
              case firebase.auth.PhoneAuthState.ERROR:
                if (phoneAuthSnapshot.error) {
                  Toast.error(getErrorMessage(phoneAuthSnapshot.error));
                }
                break;
              case firebase.auth.PhoneAuthState.AUTO_VERIFIED:
                verificationId.current = phoneAuthSnapshot.verificationId;
                onCodeReceived(phoneAuthSnapshot.code!);

                break;
            }
          });
      } catch {}
    },
    [canStartTimer, onCodeReceived]
  );

  const verifyOTP = useCallback(async (verificationCode: string) => {
    const creds = firebase.auth.PhoneAuthProvider.credential(
      verificationId.current,
      verificationCode
    );
    try {
      const res = await firebase.auth().signInWithCredential(creds);
      return (await res.user.getIdTokenResult()).token;
    } catch (e) {
      Toast.error("Kode OTP Tidak Valid!");
    }
  }, []);

  return { requestOTP, verifyOTP };
}
