import { useRemoveCartItem } from "@api-hooks/cart/cart.mutation";
import { getCartKey, useGetCart } from "@api-hooks/cart/cart.query";
import { getCheckoutKey } from "@api-hooks/checkout/checkout.query";
import Toast from "@common/helpers/toast";
import FetchWrapperComponent from "@components/common/fetch-wrapper-component";
import ConfirmationDialog from "@components/dialog/confirmation-dialog";
import {
  View,
  Text,
  StyleSheet,
  FlashList,
  Button,
} from "@components/elements";
import colorConstant from "@constants/color.constant";
import { CHECKOUT_SCREEN_NAME } from "@constants/route.constant";
import sizeConstant from "@constants/size.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import { AntDesign } from "@expo/vector-icons";
import { string2money } from "@utils/string";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { useQueryClient } from "react-query";
import ProductCard from "./components/product-card";

export default function CartContent() {
  const { data, error, refetch, isLoading } = useGetCart();
  const { mutateAsync: removeCartItem } = useRemoveCartItem();
  const [selectedId, setSelectedId] = useState<string>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleRemoveCartItem = useCallback(async () => {
    if (!selectedId) {
      return;
    }
    try {
      const result = await removeCartItem({ param: { cartItem: selectedId } });
      setSelectedId(undefined);
      result?.message && Toast.success(result?.message);
      await queryClient.invalidateQueries(getCartKey());
    } catch (e: any) {
      e?.message && Toast.error(e?.message);
    }
  }, [queryClient, removeCartItem, selectedId]);

  const onNavigateCheckout = useCallback(async () => {
    router.push(CHECKOUT_SCREEN_NAME);
  }, [router]);

  return (
    <View>
      <ConfirmationDialog
        onPositiveAction={handleRemoveCartItem}
        onNegativeAction={() => setSelectedId(undefined)}
        visible={!!selectedId}
        title="Hapus Barang Keranjang"
        message="Apakah anda yakin ingin menghapus barang ini?"
      />
      <FetchWrapperComponent
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
        component={
          <>
            <FlashList
              data={data?.data?.cartItems}
              renderItem={({ item }) => (
                <ProductCard
                  {...item}
                  onDelete={() => setSelectedId(item.id)}
                />
              )}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <ProductCard.Separator />}
              showsHorizontalScrollIndicator={false}
              estimatedItemSize={51}
              estimatedListSize={{ width: 200, height: 200 }}
              keyExtractor={(item) => item.id}
              ListFooterComponent={
                <View style={styles.footer}>
                  <View style={styles.priceFooter}>
                    <Text color={colorConstant.gray4} variant="h5">
                      Total
                    </Text>
                    <View style={styMargin(4, SeparatorTypeEnum.bottom)} />
                    <Text color={colorConstant.gray1} variant="h4">
                      Rp {string2money(data?.data?.grandTotal)}
                    </Text>
                  </View>
                  <Button style={styles.button} onPress={onNavigateCheckout}>
                    <AntDesign
                      name="arrowright"
                      size={24}
                      color={colorConstant.transparent}
                    />
                    <Text variant="h5" color={colorConstant.white}>
                      Pesan
                    </Text>
                    <View style={styMargin(8, SeparatorTypeEnum.right)} />
                    <AntDesign
                      name="arrowright"
                      size={24}
                      color={colorConstant.white}
                    />
                  </Button>
                </View>
              }
            />
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: sizeConstant.contentPad,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  priceFooter: {
    flex: 1,
  },
  button: {
    width: 172,
    flexDirection: "row",
    alignItems: "center",
  },
});
