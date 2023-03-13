import { useInitiateCustomFont } from "@hooks/use-custom-font";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import Toast from "react-native-toast-message";
import { RecoilRoot } from "recoil";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  // initialRouteName: "index",
};

export default function RootLayout() {
  const [loaded, error] = useInitiateCustomFont();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  return (
    <RecoilRoot>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
      {/* <Slot /> */}
      {/* <Stack initialRouteName="modal" /> */}
      {/* <Stack
        initialRouteName="gakanjing"
        screenOptions={{ headerShown: false }}
      >
      </Stack> */}
      <Toast position="top" topOffset={40} />
    </RecoilRoot>
  );
}
