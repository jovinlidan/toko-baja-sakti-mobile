import Toast, { ToastType } from "react-native-toast-message";

const AlertHelper: {
  show: (
    type: ToastType,
    title: string,
    message: string,
    onPress?: () => void
  ) => void;
  success: (message: string, title?: string, onPress?: () => void) => void;
  error: (message: string, title?: string, onPress?: () => void) => void;
  info: (message: string, title?: string, onPress?: () => void) => void;
} = {
  show(type, title, message, onPress) {
    Toast.show({ type: type, text1: message, text2: title, onPress });
  },
  success(message: string, title: string | undefined, onPress) {
    Toast.show({ type: "success", text1: message, text2: title, onPress });
  },
  error(message: string, title: string | undefined, onPress) {
    Toast.show({ type: "error", text1: message, text2: title, onPress });
  },
  info(message: string, title: string | undefined, onPress) {
    Toast.show({ type: "info", text1: message, text2: title, onPress });
  },
};

export default AlertHelper;
