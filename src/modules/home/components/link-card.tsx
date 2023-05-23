import { Text, StyleSheet, Pressable, View } from "@components/elements";
import colorConstant from "@constants/color.constant";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  onPress: VoidFunction;
  text: string;
  color: string;
}

export default function LinkCard(props: Props) {
  return (
    <Pressable
      style={[styles.container, { backgroundColor: props.color }]}
      onPress={props.onPress}
    >
      <Text variant="h4" color={colorConstant.white} style={styles.text}>
        {props.text}
      </Text>
      <View style={styles.circle}>
        <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "47.5%",
    borderRadius: 10,
    aspectRatio: 1 / 1,
    height: "100%",
    marginBottom: 20,
    position: "relative",

    padding: 16,
  },
  text: {},

  circle: {
    position: "absolute",
    width: 40,
    height: 40,
    backgroundColor: colorConstant.white,
    right: 16,
    bottom: 16,

    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
