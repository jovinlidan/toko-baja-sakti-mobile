import { Container, Content, Text, View } from "@components/elements";
import { Header } from "@components/widgets";
import { StyleSheet } from "react-native";
import RegisterForm from "./register-form";

export default function Register() {
  return (
    <Container>
      <Header title="Buat Akun Baru" />
      <Content>
        <View style={styles.titleContainer}>
          <Text variant="h4" style={styles.titleText}>
            Toko Baja Sakti
          </Text>
        </View>
        <RegisterForm />
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
