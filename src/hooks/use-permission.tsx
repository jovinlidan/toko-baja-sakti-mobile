import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useCallback } from "react";
import { Linking, Platform } from "react-native";
import Permissions, {
  PERMISSIONS,
  PermissionStatus,
  RESULTS,
} from "react-native-permissions";

import useAppState from "./use-app-state";

type PermissionType = "camera" | "storage" | "location" | "photo";

function getPermissionType(type: PermissionType) {
  switch (type) {
    case "camera":
      return Platform.OS === "ios"
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;
    case "storage":
      return PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
    case "photo":
      return Platform.OS === "ios"
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    case "location":
      return Platform.OS === "ios"
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  }
}

export interface RequestPermissionParams {
  onChange?: (status: PermissionStatus) => void;
  type: PermissionType;
}

async function requestNativePermission(params: RequestPermissionParams) {
  const { type, onChange } = params;
  const responseStatus = await Permissions.request(getPermissionType(type));
  if (responseStatus === RESULTS.BLOCKED) {
    if (Platform.OS === "ios") {
      Permissions.openSettings();
    } else if (Platform.OS === "android") {
      Linking.openSettings();
    }
  } else {
    onChange && onChange(responseStatus);
  }
}

export const requestPermission = async function (
  params: RequestPermissionParams
) {
  const { onChange, type } = params;
  let status: PermissionStatus = "unavailable";
  if (
    (Platform.OS === "ios" || Platform.constants?.["Release"] >= 13) &&
    type === "storage"
  ) {
    status = "granted";
  } else {
    status = await Permissions.check(getPermissionType(type));
  }

  onChange && onChange(status);
  if (status === RESULTS.DENIED) {
    await requestNativePermission(params);
  } else if (status !== RESULTS.GRANTED) {
    if (Platform.OS === "ios") {
      Permissions.openSettings();
    } else if (Platform.OS === "android" && status === RESULTS.BLOCKED) {
      Linking.openSettings();
    }
  }
};

export default function usePermission(
  type: PermissionType,
  message: string,
  onDeny: () => void
) {
  const [refreshCount, setRefreshCount] = useState(0);
  const navigation = useNavigation();
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>();
  const currentState = useAppState();
  const isScreenFocused = currentState === "active" && navigation.isFocused();

  const refresh = useCallback(() => {
    setRefreshCount((prev) => prev + 1);
  }, []);

  useEffect(
    function () {
      if (isScreenFocused) {
        requestPermission({
          onChange: (status) => {
            setPermissionStatus(status);
          },
          type,
        });
      }
    },
    [isScreenFocused, navigation, message, onDeny, type, refreshCount]
  );
  return {
    permissionStatus,
    isScreenFocused,
    refresh,
  };
}
