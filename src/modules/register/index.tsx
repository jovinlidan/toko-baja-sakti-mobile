import { Container, Content, Form, Text, View } from "@components/elements";
import { Header } from "@components/widgets";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
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
