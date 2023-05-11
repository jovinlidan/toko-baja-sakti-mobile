import { useRevokeUser } from "@api-hooks/auth/auth.mutation";
import { View } from "@components/elements";
import colorConstant from "@constants/color.constant";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useCredential } from "@hooks/use-credential";
import useMe from "@hooks/use-me";
import { useCallback, useMemo } from "react";
import ProfileMenuItem, { ProfileMenuItemType } from "./profile-menu-item";

export default function ProfileMenu() {
  const { mutateAsync: revoke } = useRevokeUser();
  const { reset } = useMe();
  const { setCredential } = useCredential();

  const logoutUser = useCallback(async () => {
    await revoke();
    await reset();
    setCredential(undefined);
  }, [reset, revoke, setCredential]);
  const OPTIONS: ProfileMenuItemType[] = useMemo(
    () => [
      {
        label: "Ubah Profil",
        icon: <Feather name="user" size={24} color={colorConstant.gray2} />,
        onPress: () => {},
      },
      {
        label: "Alamat Pengiriman",
        icon: <Feather name="map-pin" size={24} color={colorConstant.gray2} />,
        onPress: () => {},
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
    [logoutUser]
  );
  return (
    <View>
      {OPTIONS.map((option) => (
        <ProfileMenuItem {...option} key={option.label} />
      ))}
    </View>
  );
}
