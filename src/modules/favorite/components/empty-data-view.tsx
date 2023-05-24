import { View, StyleSheet, Image, Text, Button } from "@components/elements";
import colorConstant from "@constants/color.constant";
import imageConstant from "@constants/image.constant";
import { PRODUCT_SCREEN_NAME } from "@constants/route.constant";
import sizeConstant from "@constants/size.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Dimensions, StatusBar } from "react-native";

export default function EmptyDataView() {
  const [height, setHeight] = useState<number>(0);
  const router = useRouter();

  const onNavigateProduct = useCallback(() => {
    router.push(PRODUCT_SCREEN_NAME);
  }, [router]);
  return (
    <View
      style={[styles.container, { top: -height / 2 }]}
      onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
    >
      <Image source={imageConstant.emptyData} style={styles.image} />
      <View style={styMargin(12, SeparatorTypeEnum.bottom)} />
      <Text variant="h5">Tidak ada favorit</Text>
      <View style={styMargin(12, SeparatorTypeEnum.bottom)} />
      <Text
        variant="bodyMed"
        color={colorConstant.gray4}
        style={styles.description}
      >
        Kamu tidak mempunyai barang favorit. Silahkan tambah barang favorit.
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
