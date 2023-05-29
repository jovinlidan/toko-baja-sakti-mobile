import colorConstant from "@constants/color.constant";
import { View, StyleSheet } from "@components/elements";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import LinkCard from "./components/link-card";
import {
  CART_SCREEN_NAME,
  FAVORITE_SCREEN_NAME,
  SHIPPING_ADDRESS_SCREEN_NAME,
  TRANSACTION_HISTORY_SCREEN_NAME,
} from "@constants/route.constant";

export default function Links() {
  const router = useRouter();
  const data = useMemo(() => {
    return [
      {
        color: colorConstant.primaryOrange1,
        onPress: () => router.push(TRANSACTION_HISTORY_SCREEN_NAME),
        text: "Riwayat \nTransaksi",
      },
      {
        color: "rgba(188, 120, 53, 0.65)",
        onPress: () => router.push(CART_SCREEN_NAME),
        text: "Keranjang \nBelanja",
      },
      {
        color: "#65ABD2",
        onPress: () => router.push(FAVORITE_SCREEN_NAME),
        text: "Barang \nFavorit",
      },
      {
        color: "#5DD5D5",
        onPress: () => router.push(SHIPPING_ADDRESS_SCREEN_NAME),
        text: "Alamat \nPengiriman",
      },
    ];
  }, [router]);
  return (
    <View style={styles.container}>
      {data.map((item) => (
        <LinkCard {...item} key={item.text} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
