import { SelectOption } from "@components/elements/select-input";
import { useNavigation, useRouter } from "expo-router";
import * as React from "react";

interface SelectModalProps {
  options?: SelectOption[];
  modalTitle?: string;
  routeName?: string;
  value?: SelectOption["value"];
  onSelect?: (newValue: SelectOption) => void;
}

interface SelectModalState {
  modalOptions?: SelectModalProps;
  setModalOptions?: (key: SelectModalProps) => void;
  onClose?: () => void;
}

const context = React.createContext<SelectModalState>({});

const { Provider } = context;

interface SelectModalProviderProps {
  children: React.ReactNode;
}

export default function SelectModalProvider(props: SelectModalProviderProps) {
  const [modalOptions, setState] = React.useState<SelectModalProps>();
  const { push } = useRouter();
  const setModalOptions = React.useCallback(async (key: SelectModalProps) => {
    await setState(key);
    key.routeName && (await push(key.routeName));
  }, []);

  const onClose = React.useCallback(() => {
    setState({});
  }, []);

  return (
    <Provider value={{ modalOptions, setModalOptions, onClose }}>
      {props.children}
    </Provider>
  );
}

export function useSelectModal() {
  return React.useContext(context);
}
