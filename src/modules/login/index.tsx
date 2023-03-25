import { Container, Content, Text, View } from "@components/elements";
import { Header } from "@components/widgets";
import { StyleSheet } from "react-native";
import LoginForm from "./login-form";

export default function Login() {
  return (
    <Container>
      <Header title="Masuk" />
      <Content>
        <View style={styles.titleContainer}>
          <Text variant="h4" style={styles.titleText}>
            Toko Baja Sakti
          </Text>
        </View>
        <LoginForm />
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  titleText: {
    letterSpacing: 0.3,
  },
  titleContainer: {
    alignItems: "center",
  },
});
