import { View, StyleSheet, Image, Text, Button } from "@components/elements";
import colorConstant from "@constants/color.constant";
import imageConstant from "@constants/image.constant";
import { PRODUCT_SCREEN_NAME } from "@constants/route.constant";
import sizeConstant from "@constants/size.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import { useRouter } from "expo-router";
import { useCallback } from "react";

export default function EmptyDataView() {
  const router = useRouter();

  const onNavigateProduct = useCallback(() => {
    router.push(PRODUCT_SCREEN_NAME);
  }, [router]);
  return (
    <View style={styles.container}>
      <Image source={imageConstant.emptyData} style={styles.image} />
      <View style={styMargin(12, SeparatorTypeEnum.bottom)} />
      <Text variant="h5">Tidak ada Riwayat Transaksi</Text>
      <View style={styMargin(12, SeparatorTypeEnum.bottom)} />
      <Text
        variant="bodyMed"
        color={colorConstant.gray4}
        style={styles.description}
      >
        Kamu tidak mempunyai riwayat transaksi. Silahkan lakukan pembelian
        produk terlebih dahulu
      </Text>
      <View style={styMargin(16, SeparatorTypeEnum.bottom)} />
      <Button onPress={onNavigateProduct} style={styles.button}>
        Lihat Semua Barang
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorConstant.white,
    paddingHorizontal: 28,
    paddingVertical: 20,
    marginHorizontal: sizeConstant.contentPad,
    marginTop: 20,
    alignItems: "center",
    borderRadius: 10,

    borderColor: colorConstant.stroke,
    borderWidth: 1,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  image: {
    width: 107,
    height: 80,
  },
  description: {
    textAlign: "center",
  },
  button: {
    width: "100%",
  },
});
