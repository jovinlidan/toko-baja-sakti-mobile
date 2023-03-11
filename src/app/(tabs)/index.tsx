import storage from "@common/repositories/storage";
import { Container, Content, Text } from "@components/elements";
import { meState, meSelector } from "@models/auth";
import { useEffect } from "react";
import { Button } from "react-native";
import { StyleSheet, TextInput } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";

export default function TabOneScreen() {
  const me = useRecoilValue(meSelector);
  const [getMe, setMe] = useRecoilState(meState);

  return (
    <Container>
      <Content>
        <Text>Tab 1</Text>
        <Text>{me}</Text>

        <TextInput value={getMe} onChangeText={(val) => setMe(val)} />
        <Text>{storage.getAllKeys().toString()}</Text>

        <Button title="Test" onPress={() => storage.set("a", "test")} />
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
