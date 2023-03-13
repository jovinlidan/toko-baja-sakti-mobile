import {
  Container,
  Content,
  ImageComponent,
  View,
  Text,
  Button,
} from "@components/elements";
import colorConstant from "@constants/color.constant";
import imageConstant from "@constants/image.constant";
import { StyleSheet } from "react-native";

interface Props {
  onNext: () => void;
}
export default function OnboardingWelcome(props: Props) {
  return (
    <Container>
      <View style={styles.leftCircle} />
      <View style={styles.rightCircle} />
      <Content>
        <View style={styles.content}>
          <ImageComponent
            source={imageConstant.logo}
            style={{ width: 50, height: 50, marginBottom: 28 }}
          />
          <Text style={styles.titleText}>Toko Baja Sakti</Text>
          <Text style={styles.descText}>Jl. Kh Wahid Hasyim No.37, Binjai</Text>
        </View>
        <Button onPress={props.onNext}>Mulai</Button>
      </Content>
    </Container>
  );
}
const styles = StyleSheet.create({
  leftCircle: {
    position: "absolute",
    backgroundColor: colorConstant.lightTeal,
    width: 516,
    height: 516,
    borderRadius: 258,

    left: -250,
    top: -150,
  },
  rightCircle: {
    position: "absolute",
    backgroundColor: "rgba(250, 177, 49, 0.35)",
    width: 516,
    height: 516,
    borderRadius: 258,
    right: -250,
    top: -150,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  titleText: {
    fontSize: 36,
    fontWeight: "bold",
    lineHeight: 40,
    marginBottom: 24,
  },
  descText: {
    fontStyle: "italic",
    fontSize: 16,
    fontWeight: "400",
  },
});
