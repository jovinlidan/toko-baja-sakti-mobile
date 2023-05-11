import * as React from "react";
import * as SecureStore from "expo-secure-store";
import CredentialContainer from "@hooks/use-credential";
const InitialContainer = (props) => null;

type PersistState = {
  credential?: any;
  isLoading: boolean;
};

interface Props {
  children: React.ReactNode;
}

export default function CredentialPersist(props: Props) {
  const [persistState, setPersistState] = React.useState<PersistState>({
    isLoading: true,
  });

  const { children } = props;

  let CredentialContainerComponent: any = InitialContainer;

  if (!persistState.isLoading) {
    CredentialContainerComponent = CredentialContainer;
  }

  React.useEffect(() => {
    async function exec() {
      const credential = await SecureStore.getItemAsync("credential");
      setPersistState({
        credential: credential ? JSON.parse(credential) : undefined,
        isLoading: false,
      });
    }

    exec();
  }, []);

  return (
    <CredentialContainerComponent userCredential={persistState.credential}>
      {children}
    </CredentialContainerComponent>
  );
}
