import { Container, View } from "@components/elements";
import { Header } from "@components/widgets";
import colorConstant from "@constants/color.constant";
import { CART_SCREEN_NAME } from "@constants/route.constant";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import ProductContent from "./product-content";

export default function ProductDetail() {
  const router = useRouter();

  const onNavigateCart = useCallback(() => {
    router.push(CART_SCREEN_NAME);
  }, [router]);

  return (
    <Container>
      <Header
        back
        title="Detail Barang"
        rightComponent={
          <TouchableOpacity onPress={onNavigateCart}>
            <Feather
              name="shopping-cart"
              size={24}
              color={colorConstant.gray1}
            />
          </TouchableOpacity>
        }
      />
      <ProductContent />
    </Container>
  );
}
