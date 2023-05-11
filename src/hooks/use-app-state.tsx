import { useState, useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";

export default function useAppState(): AppStateStatus {
  const [state, setState] = useState(AppState.currentState);
  useEffect(() => {
    const onChange = (appState: AppStateStatus) => {
      setState(appState);
    };
    const listener = AppState.addEventListener("change", onChange);
    return () => {
      listener.remove();
    };
  }, []);
  return state;
}
