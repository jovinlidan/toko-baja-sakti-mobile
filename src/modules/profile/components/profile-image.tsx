import { Image, View, Text } from "@components/elements";
import imageConstant from "@constants/image.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import { meState } from "@models/auth";
import { StyleSheet } from "react-native";
import { useRecoilState } from "recoil";
export default function ProfileImage() {
  const [me] = useRecoilState(meState);
  return (
    <View style={styles.container}>
      <Image
        source={imageConstant.profile}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styMargin(16, SeparatorTypeEnum.bottom)} />
      <Text variant="h4">{me?.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 77,
    height: 78,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
