import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import {
  setupToken,
  removeOnUnAuthorized,
  setupOnUnAuthorized,
  logout,
} from "../repositories";
import { useThrottledCallback } from "use-debounce";
import { useCredential } from "@hooks/use-credential";
import { refreshToken } from "@api-hooks/auth/auth.mutation";
import useAppState from "@hooks/use-app-state";
import useMe from "@hooks/use-me";

export default function Handler() {
  const { credential, setCredential } = useCredential();
  const appState = useAppState();
  const isAuthenticated = !!credential;
  const { refetch, reset } = useMe();

  React.useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  React.useEffect(() => {
    setupToken(credential?.accessToken);
  }, [credential?.accessToken]);

  const refreshTokenThrottledFunc = useThrottledCallback(
    async () => {
      try {
        if (credential?.refreshToken) {
          const result = await refreshToken(credential?.refreshToken);
          setupToken(result?.data?.accessToken);
          setCredential(result?.data);
        } else {
          throw Error("");
        }
      } catch (e) {
        //@ts-ignore
        throw Error(e);
      }
    },
    5000,
    { trailing: false }
  );

  React.useEffect(() => {
    if (isAuthenticated) {
      const logoutFunc = () => {
        logout(() => {
          reset();
          setCredential(undefined);
        });
      };

      setupOnUnAuthorized(async () => {
        try {
          await refreshTokenThrottledFunc();
        } catch (e) {
          logoutFunc();
        }
      });
    } else {
      removeOnUnAuthorized();
    }
  }, [isAuthenticated, setCredential, reset, refreshTokenThrottledFunc]);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (appState === "active" && isAuthenticated) {
      interval = setInterval(() => {
        refetch();
      }, 60000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [appState, refetch, isAuthenticated]);

  return null;
}
