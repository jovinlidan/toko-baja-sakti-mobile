import invariant from "invariant";
import * as SecureStore from "expo-secure-store";
import * as React from "react";
import { TokenResult } from "@api-hooks/auth/auth.model";
import { useRouter, useSegments } from "expo-router";

export interface CredentialStateProps {
  credential?: TokenResult;
  setCredential: React.Dispatch<React.SetStateAction<any>>;
}

export const CredentialContext = React.createContext<CredentialStateProps>({
  credential: undefined,
  setCredential: () => {},
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

  const { children } = props;

  const value = React.useMemo<CredentialStateProps>(
    () => ({
      credential: userCredential,
      setCredential: async (credential) => {
        if (!credential) {
          await SecureStore.deleteItemAsync("credential");
          setUserCredential(undefined);
        } else {
          SecureStore.setItemAsync("credential", JSON.stringify(credential));
          setUserCredential(credential);
        }
      },
    }),
    [userCredential]
  );

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    if (!userCredential && !inAuthGroup) {
      router.replace("/register");
    } else if (!!userCredential && inAuthGroup) {
      router.replace("/");
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
