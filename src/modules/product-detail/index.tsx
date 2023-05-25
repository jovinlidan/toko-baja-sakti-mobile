import { useGetCategoryItem } from "@api-hooks/category-item/category-item.query";
import FetchWrapperComponent from "@components/common/fetch-wrapper-component";
import { Container } from "@components/elements";
import { Header } from "@components/widgets";
import colorConstant from "@constants/color.constant";
import { CART_SCREEN_NAME } from "@constants/route.constant";
import { Feather } from "@expo/vector-icons";
import { useRouter, useSearchParams } from "expo-router";
import { useCallback } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import ProductContent from "./product-content";

export default function ProductDetail() {
  const { id } = useSearchParams();
  const router = useRouter();

  const categoryItemQuery = useGetCategoryItem({
    id: id! as string,
  });

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
      <FetchWrapperComponent
        isLoading={
          categoryItemQuery?.isLoading || categoryItemQuery?.isFetching
        }
        error={categoryItemQuery?.error}
        onRetry={categoryItemQuery?.refetch}
        component={
          categoryItemQuery.data?.data && (
            <ProductContent categoryItemQuery={categoryItemQuery} />
          )
        }
      />
    </Container>
  );
}
