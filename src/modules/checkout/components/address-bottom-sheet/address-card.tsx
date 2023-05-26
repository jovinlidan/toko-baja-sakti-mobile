import { AddressLite } from "@api-hooks/address/address.model";
import { View, StyleSheet, Text, TouchableOpacity } from "@components/elements";
import colorConstant from "@constants/color.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";

interface Props extends AddressLite {
  onSelectAddress: VoidFunction;
  selected: boolean;
}

function MainPill() {
  return (
    <View style={mainPillStyles.container}>
      <Text variant="hint" color={colorConstant.white}>
        Dipilih
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

export default function AddressCard(props: Props) {
  const {
    addressDetail,
    city,
    isMain,
    recipientName,
    recipientNumber,
    tag,
    onSelectAddress,
    selected,
  } = props;

  return (
    <TouchableOpacity style={styles.container} onPress={onSelectAddress}>
      <View style={styles.leftContainer}>
        <View style={styles.titleContainer}>
          <Text color={colorConstant.gray2} variant="bodyMed">
            {tag || "Alamat"}
          </Text>
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
      <View style={styles.rightContainer}>{selected && <MainPill />}</View>
    </TouchableOpacity>
  );
}

AddressCard.Separator = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
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
  separator: {
    borderBottomColor: colorConstant.stroke,
    borderBottomWidth: 1,
  },
});
