import * as React from "react";

interface OTPContext {
  timer: number;
  canStartTimer: (phoneProps: string) =>
    | {
        valid: boolean;
        onStart?: undefined;
      }
    | {
        valid: boolean;
        onStart: () => void;
      };
}

const context = React.createContext<OTPContext>({
  timer: 0,
  canStartTimer: () => ({
    valid: false,
  }),
});

const { Provider } = context;

interface OTPHistoryProviderProps {
  children: React.ReactNode;
}

export default function OTPHistoryProvider(props: OTPHistoryProviderProps) {
  const [timer, setTimer] = React.useState<number>(0);
  const [phone, setPhone] = React.useState<string>();
  const intervalRef = React.useRef<NodeJS.Timer>();

  const canStartTimer = React.useCallback(
    (phoneProps: string) => {
      if (phoneProps === phone && !!timer) {
        return { valid: false };
      } else {
        return {
          valid: true,
          onStart: () => {
            setPhone(phone);
            setTimer(60);
          },
        };
      }
    },
    [phone, timer]
  );

  React.useEffect(() => {
    if (timer > 0 && !intervalRef.current?.hasRef) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => --prev);
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    };
  }, [timer]);

  React.useEffect(() => {
    if (timer <= 0 && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, [timer]);

  return <Provider value={{ timer, canStartTimer }}>{props.children}</Provider>;
}

export function useOTPHistory() {
  return React.useContext(context);
}
