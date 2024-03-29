import { Container, View, Content } from "@components/elements";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import { StyleSheet } from "react-native";
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import AnimatedHeader from "./animated-header";
import ProfileImage from "./components/profile-image";
import ProfileMenu from "./components/profile-menu";

export default function Profile() {
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });
  return (
    <Container>
      <AnimatedHeader scrollValue={scrollY} />
      <Content
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        noPadding
      >
        <View style={styles.content}>
          <ProfileImage />
          <View style={styMargin(64, SeparatorTypeEnum.bottom)} />
          <ProfileMenu />
        </View>
      </Content>
    </Container>
  );
}
const styles = StyleSheet.create({
  content: {
    marginTop: 120,
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 28,
  },
});
