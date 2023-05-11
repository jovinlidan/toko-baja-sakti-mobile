import {
  Animated,
  StyleSheet,
  TextProps,
  useWindowDimensions,
} from "react-native";
import { ImageComponent, Text } from "@components/elements";
import imageConstant from "@constants/image.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";

export function Slide1({ onLayout }: { onLayout: TextProps["onLayout"] }) {
  const { width } = useWindowDimensions();

  return (
    <Animated.View style={[styles.swipeContainer, { width }]}>
      <ImageComponent
        source={imageConstant.onboarding1}
        style={styMargin(50, SeparatorTypeEnum.bottom)}
      />

      <Text variant="h1">Selamat Datang!</Text>
      <Text variant="bodyReg" style={styles.descText} onLayout={onLayout}>
        Hai! Senang bertemu denganmu. Kami senang Anda ada di sini, jadi mari
        kita mulai.
      </Text>
    </Animated.View>
  );
}

export function Slide2({ onLayout }: { onLayout: TextProps["onLayout"] }) {
  const { width } = useWindowDimensions();

  return (
    <Animated.View style={[styles.swipeContainer, { width }]}>
      <ImageComponent
        source={imageConstant.onboarding2}
        style={styMargin(50, SeparatorTypeEnum.bottom)}
      />

      <Text variant="h2">Sangat Cepat</Text>
      <Text variant="bodyReg" style={styles.descText} onLayout={onLayout}>
        Lelah karena harus pergi ke toko langsung? Sekarang anda dapat memesan
        produk kami melalui aplikasi
      </Text>
    </Animated.View>
  );
}
export function Slide3({ onLayout }: { onLayout: TextProps["onLayout"] }) {
  const { width } = useWindowDimensions();

  return (
    <Animated.View style={[styles.swipeContainer, { width }]}>
      <ImageComponent
        source={imageConstant.onboarding3}
        style={styMargin(50, SeparatorTypeEnum.bottom)}
      />

      <Text variant="h2">Harga Terjangkau</Text>
      <Text variant="bodyReg" style={styles.descText} onLayout={onLayout}>
        Dapatkan berbagai kebutuhan besi, baja dengan harga yang sangat
        terjangkau per satuan ataupun per lusinan
      </Text>
    </Animated.View>
  );
}
export function Slide4({ onLayout }: { onLayout: TextProps["onLayout"] }) {
  const { width } = useWindowDimensions();

  return (
    <Animated.View style={[styles.swipeContainer, { width }]}>
      <ImageComponent
        source={imageConstant.onboarding4}
        style={styMargin(50, SeparatorTypeEnum.bottom)}
      />

      <Text variant="h2">Langkah Terakhir</Text>
      <Text variant="bodyReg" style={styles.descText} onLayout={onLayout}>
        Harga bersahabat, pengiriman cepat dan produk terjamin. Semua dapat
        dinikmati hanya dengan melakukan pendaftaran di bawah ini.
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  swipeContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  descText: {
    textAlign: "center",
    marginHorizontal: 40,
    marginTop: 16,
  },
});
