import { View } from "@components/elements";
import colorConstant from "@constants/color.constant";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import ProfileMenuItem, { ProfileMenuItemType } from "./profile-menu-item";

export default function ProfileMenu() {
  const OPTIONS: ProfileMenuItemType[] = [
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
      onPress: () => {},
    },
  ];
  return (
    <View>
      {OPTIONS.map((option) => (
        <ProfileMenuItem {...option} key={option.label} />
      ))}
    </View>
  );
}
