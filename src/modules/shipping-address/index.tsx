import { AddressLite } from "@api-hooks/address/address.model";
import { useGetAddresses } from "@api-hooks/address/address.query";
import FetchWrapperComponent from "@components/common/fetch-wrapper-component";
import { Container, StyleSheet, FlatList, View } from "@components/elements";
import { Header } from "@components/widgets";
import colorConstant from "@constants/color.constant";
import { useCallback } from "react";
import ShippingAddressCard from "./shipping-address-card";

export default function ShippingAddress() {
  const { data, error, isLoading, isFetching, refetch } = useGetAddresses();

  const renderItem = useCallback(({ item }: { item: AddressLite }) => {
    return <ShippingAddressCard {...item} />;
  }, []);
  return (
    <Container>
      <Header title="Alamat Pengiriman" back />
      <View style={styles.content}>
        <FetchWrapperComponent
          isLoading={isLoading || isFetching}
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
