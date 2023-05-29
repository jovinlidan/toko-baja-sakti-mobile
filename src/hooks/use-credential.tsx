import invariant from "invariant";
import * as SecureStore from "expo-secure-store";
import * as React from "react";
import { TokenResult } from "@api-hooks/auth/auth.model";
import { useRouter, useSegments } from "expo-router";
import { useRecoilState } from "recoil";
import { firstTimeState } from "@models/first-time";
import {
  HOME_SCREEN_NAME,
  ONBOARDING_SCREEN_NAME,
  REGISTER_SCREEN_NAME,
} from "@constants/route.constant";

export interface CredentialStateProps {
  credential?: TokenResult;
  setCredential: (credential, persist?) => void;
}

export const CredentialContext = React.createContext<CredentialStateProps>({
  credential: undefined,
  setCredential: () => { },
});

interface Props {
  userCredential?: TokenResult;
  children: React.ReactNode;
}

export default function Credential(props: Props) {
  const [userCredential, setUserCredential] = React.useState<
    TokenResult | undefined
  >(props.userCredential);
  const segments = useSegments();
  const router = useRouter();
  const [isFirstTime] = useRecoilState(firstTimeState);

  const { children } = props;

  const value = React.useMemo<CredentialStateProps>(
    () => ({
      credential: userCredential,
      setCredential: async (credential, persist: boolean = true) => {
        if (!credential) {
          await SecureStore.deleteItemAsync("credential");
          setUserCredential(undefined);
        } else {
          if (persist) {
            SecureStore.setItemAsync("credential", JSON.stringify(credential));
          }
          setUserCredential(credential);
        }
      },
    }),
    [userCredential]
  );
  React.useEffect(() => {
    if (segments[0] === "(global)") {
      return;
    }
    const inAuthGroup = segments[0] === "(no-auth)";
    if (!userCredential && !inAuthGroup) {
      if (isFirstTime) {
        router.replace(ONBOARDING_SCREEN_NAME);
      } else {
        router.replace(REGISTER_SCREEN_NAME);
      }
    } else if (!!userCredential && inAuthGroup) {
      router.replace(HOME_SCREEN_NAME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segments, userCredential]);

  return (
    <CredentialContext.Provider value={value}>
      {children}
    </CredentialContext.Provider>
  );
}

export function useCredential() {
  const context = React.useContext(CredentialContext);

  invariant(
    context !== undefined,
    "useCredential must be used inside Credential Container"
  );

  return context;
}
