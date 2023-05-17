import { AddressLite } from "@api-hooks/address/address.model";
import { View, StyleSheet, Text, TouchableOpacity } from "@components/elements";
import colorConstant from "@constants/color.constant";
import sizeConstant from "@constants/size.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import { Ionicons } from "@expo/vector-icons";

interface Props extends AddressLite {}

function MainPill() {
  return (
    <View style={mainPillStyles.container}>
      <Text variant="hint" color={colorConstant.white}>
        Utama
      </Text>
    </View>
  );
}

const mainPillStyles = StyleSheet.create({
  container: {
    backgroundColor: colorConstant.successDefault,
    borderRadius: 16,
    height: 24,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
});

export default function ShippingAddressCard(props: Props) {
  const { addressDetail, city, isMain, recipientName, recipientNumber, tag } =
    props;

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.titleContainer}>
          <Text color={colorConstant.gray2} variant="bodyMed">
            {tag || "Alamat"}
          </Text>
          {isMain && <MainPill />}
        </View>
        <View style={styMargin(8, SeparatorTypeEnum.bottom)}>
          <Text variant="bodyMed" color={colorConstant.black}>
            {recipientName || "-"}
          </Text>
        </View>
        <View style={styMargin(8, SeparatorTypeEnum.bottom)}>
          <Text variant="bodyMed" color={colorConstant.black}>
            {recipientNumber || "-"}
          </Text>
        </View>
        <View>
          <Text
            variant="bodyMed"
            color={colorConstant.black}
          >{`${addressDetail}, ${city?.name}`}</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <Ionicons
          name="chevron-forward"
          color={colorConstant.gray4}
          size={24}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 32,
    marginHorizontal: sizeConstant.contentPad,
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  leftContainer: {
    paddingRight: 20,
    flexShrink: 1,
    flex: 1,
  },
  rightContainer: {
    flexShrink: 0,
  },
});
