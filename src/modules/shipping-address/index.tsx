import { AddressLite } from "@api-hooks/address/address.model";
import { useGetAddresses } from "@api-hooks/address/address.query";
import FetchWrapperComponent from "@components/common/fetch-wrapper-component";
import {
  Container,
  StyleSheet,
  FlatList,
  View,
  Button,
} from "@components/elements";
import { Header } from "@components/widgets";
import colorConstant from "@constants/color.constant";
import { CREATE_SHIPPING_ADDRESS_SCREEN_NAME } from "@constants/route.constant";
import sizeConstant from "@constants/size.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import ShippingAddressCard from "./components/shipping-address-card";

export default function ShippingAddress() {
  const { data, error, isLoading, isFetching, isRefetching, refetch } =
    useGetAddresses();
  const router = useRouter();

  const renderItem = useCallback(({ item }: { item: AddressLite }) => {
    return <ShippingAddressCard {...item} />;
  }, []);

  const onNavigateCreateShippingAddress = useCallback(() => {
    router.push(CREATE_SHIPPING_ADDRESS_SCREEN_NAME);
  }, [router]);
  return (
    <Container>
      <Header title="Alamat Pengiriman" back />
      <View style={styles.content}>
        <FetchWrapperComponent
          isLoading={isLoading || isFetching || isRefetching}
          onRetry={refetch}
          error={error}
          empty={!data?.data?.length}
          component={
            <FlatList
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparator} />
              )}
              keyExtractor={(item) => item.id}
              data={data?.data}
              renderItem={renderItem}
              estimatedItemSize={10}
              onRefresh={refetch}
              refreshing={isRefetching}
              ListFooterComponent={() => (
                <Button
                  style={styMargin(
                    sizeConstant.contentPad,
                    SeparatorTypeEnum.horizontal
                  )}
                  onPress={onNavigateCreateShippingAddress}
                >
                  Tambah Alamat
                </Button>
              )}
            />
          }
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexGrow: 1,
  },
  itemSeparator: {
    backgroundColor: colorConstant.stroke,
    height: 1.5,
  },
});
