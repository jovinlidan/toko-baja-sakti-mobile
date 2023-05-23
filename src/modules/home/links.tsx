import colorConstant from "@constants/color.constant";
import { View, StyleSheet } from "@components/elements";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import LinkCard from "./components/link-card";

export default function Links() {
  const router = useRouter();
  const data = useMemo(() => {
    return [
      {
        color: colorConstant.primaryOrange1,
        onPress: () => router.push(""),
        text: "Riwayat Transaksi",
      },
      {
        color: "rgba(188, 120, 53, 0.65)",
        onPress: () => router.push(""),
        text: "Keranjang Belanja",
      },
      {
        color: "#65ABD2",
        onPress: () => router.push(""),
        text: "Barang Favorit",
      },
      {
        color: "#5DD5D5",
        onPress: () => router.push(""),
        text: "Alamat Pengiriman",
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
