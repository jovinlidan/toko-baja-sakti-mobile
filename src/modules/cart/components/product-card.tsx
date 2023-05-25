import { CartItem } from "@api-hooks/cart/cart.model";
import { View, Text, StyleSheet, ImageComponent } from "@components/elements";
import colorConstant from "@constants/color.constant";
import sizeConstant from "@constants/size.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import { FontAwesome5 } from "@expo/vector-icons";
import { string2money } from "@utils/string";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { Animated } from "react-native";

interface Props extends CartItem {
  onDelete: VoidFunction;
}

export default function ProductCard(props: Props) {
  const { item, price, quantity, unit, onDelete } = props;

  const renderRightActions = (progress) => {
    const translateX = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [135, 0],
    });

    return (
      <Animated.View style={styles.rightActionContainer}>
        <Animated.View
          style={[styles.rightActionWrapper, { transform: [{ translateX }] }]}
        >
          <RectButton style={styles.deleteButton} onPress={onDelete}>
            <FontAwesome5
              name="trash-alt"
              size={24}
              color={colorConstant.redDefault}
            />
            <View style={styMargin(12, SeparatorTypeEnum.right)} />
            <Text color={colorConstant.white} variant="h4">
              Hapus
            </Text>
          </RectButton>
        </Animated.View>
      </Animated.View>
    );
  };

  return (
    <Swipeable
      childrenContainerStyle={styles.container}
      renderRightActions={renderRightActions}
      friction={2}
      leftThreshold={30}
      rightThreshold={40}
    >
      <ImageComponent
        source={{
          uri: item?.categoryItem?.file?.fileUrl,
        }}
        resizeMode="stretch"
        style={styles.image}
      />
      <View style={styles.descriptionContainer}>
        <Text variant="bodyReg" color={colorConstant.gray1}>
          {item.categoryItem.name} - {item.categoryItem.brand}
        </Text>
        <View style={styMargin(4, SeparatorTypeEnum.bottom)} />
        <View style={styles.priceContainer}>
          <Text variant="bodyMed" style={styles.priceText}>
            Rp {string2money(Math.round(price / quantity))}
          </Text>
          <Text variant="h6">x{quantity}</Text>
        </View>
        <View style={styMargin(4, SeparatorTypeEnum.bottom)} />
        <Text variant="bodySm" color={colorConstant.gray2}>
          {item.size}, {item.thick} mm, {item.color}, {unit}
        </Text>
      </View>

      <View style={styles.total}>
        <Text variant="h5">Rp {string2money(price)}</Text>
      </View>
    </Swipeable>
  );
}

ProductCard.Separator = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    paddingHorizontal: sizeConstant.contentPad,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 4,
  },
  descriptionContainer: {
    paddingLeft: 12,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 12,
    flex: 1,
  },
  total: {
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    borderBottomColor: colorConstant.stroke,
    borderBottomWidth: 1,
  },
  priceContainer: {
    flexDirection: "row",
  },
  priceText: {
    flex: 1,
  },
  rightActionContainer: {
    width: 135,
    flexDirection: "row",
  },
  rightActionWrapper: {
    flex: 1,
  },
  deleteButton: {
    backgroundColor: colorConstant.gray1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
