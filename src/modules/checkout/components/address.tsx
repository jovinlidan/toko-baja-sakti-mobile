import { Address } from "@api-hooks/address/address.model";
import { View, Text, TouchableOpacity, StyleSheet } from "@components/elements";
import colorConstant from "@constants/color.constant";
import sizeConstant from "@constants/size.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";

interface Props {
  onOpenSelectAddressBottomSheet: VoidFunction;
  address?: Address;
}

export default function AddressCheckout(props: Props) {
  const { onOpenSelectAddressBottomSheet, address } = props;
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text variant="h5">Alamat Pengiriman</Text>
        <TouchableOpacity
          style={styles.viewMoreWrapper}
          onPress={onOpenSelectAddressBottomSheet}
        >
          <Text color={colorConstant.primaryOrange0} variant="bodyMed">
            Edit
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {address ? (
          <View>
            <Text variant="bodyReg">
              {address.addressDetail}, {address.city.name}
            </Text>
            <View style={styMargin(4, SeparatorTypeEnum.bottom)} />
            <Text variant="bodyReg">
              {address.recipientName}, {address.recipientNumber}
            </Text>
          </View>
        ) : (
          <Text variant="bodyReg" color={colorConstant.redDefault}>
            Tidak ada alamat dipilih
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: sizeConstant.contentPad,
    paddingVertical: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  viewMoreWrapper: {
    borderBottomColor: colorConstant.primaryOrange0,
    borderBottomWidth: 1,
  },
});
