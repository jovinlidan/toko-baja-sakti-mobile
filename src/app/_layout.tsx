import { useInitiateCustomFont } from "@hooks/use-custom-font";
import OTPHistoryProvider from "@hooks/use-otp-history";
import SelectModalProvider from "@hooks/use-select-modal";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
  SuccessToast,
} from "react-native-toast-message";
import { RecoilRoot } from "recoil";
import { setLocale } from "yup";
import yupID from "@common/validation.yup";
import CredentialPersist from "@common/helpers/credential-persist";
import Handler from "@common/helpers/handler";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@common/repositories";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  // initialRouteName: "index",
};

export default function RootLayout() {
  const [loaded, error] = useInitiateCustomFont();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

setLocale(yupID as any);

/*
  1. Create the config
*/
const toastConfig = {
  success: (props) => <SuccessToast {...props} text1NumberOfLines={null} />,
  error: (props) => <ErrorToast {...props} text1NumberOfLines={null} />,
  info: (props) => <InfoToast {...props} text1NumberOfLines={null} />,
  base: (props) => <BaseToast {...props} text1NumberOfLines={null} />,
};

function RootLayoutNav() {
  return (
    <RecoilRoot>
      <GestureHandlerRootView style={styles.gestureHandlerRootView}>
        <QueryClientProvider client={queryClient}>
          <CredentialPersist>
            <Handler />
            <OTPHistoryProvider>
              <SelectModalProvider>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="(tabs)" />

                  <Stack.Screen
                    name="select-modal"
                    options={{
                      presentation: "modal",
                      animation: "slide_from_bottom",
                    }}
                  />
                </Stack>

                <Toast position="top" topOffset={40} config={toastConfig} />
              </SelectModalProvider>
            </OTPHistoryProvider>
          </CredentialPersist>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
});
