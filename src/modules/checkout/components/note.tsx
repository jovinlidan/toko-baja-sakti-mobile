import { View, Text, StyleSheet } from "@components/elements";
import sizeConstant from "@constants/size.constant";

export default function Note() {
  return (
    <View style={styles.container}>
      <Text variant="bodyReg">Ketentuan Pengembalian Barang:</Text>
      <Text variant="bodyReg">
        Jika terdapat barang yang rusak/tidak sesuai, pengembalian barang
        <Text variant="h5" lineHeight={24}>
          {" "}
          hanya dapat dilakukan dengan datang secara langsung ke Toko Baja Sakti{" "}
        </Text>
        maksimal 2x24 jam setelah pesanan diselesaikan
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: sizeConstant.contentPad,
  },
});
