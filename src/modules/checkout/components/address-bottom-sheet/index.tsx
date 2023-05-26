import * as React from "react";
import { View, Text, Button, StyleSheet } from "@components/elements";
import { Dimensions, SafeAreaView } from "react-native";
import BottomPanel from "@components/widgets/bottom-panel";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import {
  getAddressesKey,
  useGetAddresses,
} from "@api-hooks/address/address.query";
import FetchWrapperComponent from "@components/common/fetch-wrapper-component";
import AddressCard from "./address-card";
import sizeConstant from "@constants/size.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import { plainToClass } from "class-transformer";
import { AddressLite } from "@api-hooks/address/address.model";
import { useUpdateAddress } from "@api-hooks/address/address.mutation";
import Toast from "@common/helpers/toast";
import { useQueryClient } from "react-query";
import { getCheckoutKey } from "@api-hooks/checkout/checkout.query";
import { useRouter } from "expo-router";
import { CREATE_SHIPPING_ADDRESS_SCREEN_NAME } from "@constants/route.constant";

function AddressBottomSheet(_, ref) {
  const snapPoints = ["30%", "80%"];
  const [defaultId, setDefaultId] = React.useState<string>();
  const [selectedId, setSelectedId] = React.useState<string>();
  const { mutateAsync: updateAddress } = useUpdateAddress();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useGetAddresses(
    { params: { limit: -1 } },
    {
      onSuccess: (dataParam) => {
        const addressLite = plainToClass(AddressLite, dataParam?.data);

        const isMainData = addressLite?.find((item) => item.isMain);
        if (isMainData) {
          setSelectedId(isMainData?.id);
          setDefaultId(isMainData?.id);
        }
      },
    }
  );

  const onSelectAddress = React.useCallback((id) => {
    setSelectedId(id);
  }, []);

  const onChangeMainAddress = React.useCallback(async () => {
    try {
      const selectedData = data?.data?.find((item) => item.id === selectedId);
      if (!selectedData || !selectedId) {
        return;
      }
      await updateAddress({
        id: selectedId,
        body: {
          ...selectedData,
          cityId: selectedData.city.id,
          tag: selectedData.tag!,
          addressDetail: selectedData.addressDetail!,
          isMain: !selectedData.isMain,
          recipientName: selectedData.recipientName!,
          recipientNumber: selectedData.recipientNumber!,
        },
      });
      await queryClient.invalidateQueries(getCheckoutKey());
      await queryClient.invalidateQueries(getAddressesKey());
      ref?.current && ref?.current?.snapTo(-1);
    } catch (e: any) {
      e?.message && Toast.error(e?.message);
    }
  }, [data?.data, queryClient, ref, selectedId, updateAddress]);

  const onNavigateCreateShippingAddress = React.useCallback(() => {
    router.push(CREATE_SHIPPING_ADDRESS_SCREEN_NAME);
  }, [router]);

  return (
    <BottomPanel
      snapPoints={snapPoints}
      ref={ref}
      initialSnapIndex={-1}
      onClose={() => onSelectAddress(defaultId)}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text>Pilih Alamat</Text>
        </View>
        <Button
          style={styles.button}
          disabled={defaultId === selectedId}
          onPress={onChangeMainAddress}
        >
          Simpan
        </Button>
        <FetchWrapperComponent
          isLoading={isLoading}
          onRetry={refetch}
          error={error}
          component={
            <BottomSheetFlatList
              data={data?.data}
              keyExtractor={(i) => i.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <AddressCard
                  {...item}
                  selected={selectedId === item.id}
                  onSelectAddress={() => onSelectAddress(item.id)}
                />
              )}
              style={{
                width:
                  Dimensions.get("screen").width - sizeConstant.contentPad * 2,
              }}
              ItemSeparatorComponent={() => <AddressCard.Separator />}
              ListFooterComponent={
                <>
                  <View style={styMargin(32, SeparatorTypeEnum.bottom)} />
                  <Button
                    style={styles.buttonStyle}
                    onPress={onNavigateCreateShippingAddress}
                    variant="outline"
                  >
                    Tambah Alamat
                  </Button>
                </>
              }
            />
          }
        />
      </View>
      <SafeAreaView />
    </BottomPanel>
  );
}

export default React.forwardRef(AddressBottomSheet);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
    flex: 1,
    display: "flex",
    zIndex: 2000,
  },
  headerContainer: {
    width: "100%",
    marginBottom: 24,
    alignItems: "center",
  },
  button: {
    position: "absolute",
    right: 16,
    top: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonStyle: {
    minWidth: 180,
  },
});
