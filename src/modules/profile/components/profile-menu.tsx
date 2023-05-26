import { useRevokeUser } from "@api-hooks/auth/auth.mutation";
import { View } from "@components/elements";
import colorConstant from "@constants/color.constant";
import {
  SHIPPING_ADDRESS_SCREEN_NAME,
  UPDATE_PROFILE_SCREEN_NAME,
} from "@constants/route.constant";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useCredential } from "@hooks/use-credential";
import useMe from "@hooks/use-me";
import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { useQueryClient } from "react-query";
import ProfileMenuItem, { ProfileMenuItemType } from "./profile-menu-item";

export default function ProfileMenu() {
  const { mutateAsync: revoke } = useRevokeUser();
  const { reset } = useMe();
  const { setCredential } = useCredential();
  const router = useRouter();
  const queryClient = useQueryClient();

  const logoutUser = useCallback(async () => {
    await revoke();
    await reset();
    await queryClient.clear();
    setCredential(undefined);
  }, [queryClient, reset, revoke, setCredential]);

  const onNavigateUpdateProfile = useCallback(() => {
    router.push(UPDATE_PROFILE_SCREEN_NAME);
  }, [router]);

  const onNavigateShippingAddress = useCallback(() => {
    router.push(SHIPPING_ADDRESS_SCREEN_NAME);
  }, [router]);

  const OPTIONS: ProfileMenuItemType[] = useMemo(
    () => [
      {
        label: "Ubah Profil",
        icon: <Feather name="user" size={24} color={colorConstant.gray2} />,
        onPress: onNavigateUpdateProfile,
      },
      {
        label: "Alamat Pengiriman",
        icon: <Feather name="map-pin" size={24} color={colorConstant.gray2} />,
        onPress: onNavigateShippingAddress,
      },
      {
        label: "Riwayat Transaksi",
        icon: <Feather name="truck" size={24} color={colorConstant.gray2} />,
        onPress: () => {},
      },
      {
        label: "Keluar",
        icon: (
          <MaterialIcons
            name="exit-to-app"
            size={24}
            color={colorConstant.gray2}
          />
        ),
        onPress: logoutUser,
      },
    ],
    [logoutUser, onNavigateShippingAddress, onNavigateUpdateProfile]
  );
  return (
    <View>
      {OPTIONS.map((option) => (
        <ProfileMenuItem {...option} key={option.label} />
      ))}
    </View>
  );
}
