import { Container, Content, Text, View } from "@components/elements";
import { Header } from "@components/widgets";
import { StyleSheet } from "react-native";
import ResetPasswordForm from "./reset-password-form";

export default function ResetPassword() {
  return (
    <Container>
      <Header title="Reset Kata Sandi" />
      <Content>
        <View style={styles.titleContainer}>
          <Text variant="h4" style={styles.titleText}>
            Toko Baja Sakti
          </Text>
        </View>
        <ResetPasswordForm />
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
