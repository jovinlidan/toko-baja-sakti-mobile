import storage from "@common/repositories/storage";
import { Container, Content, Text } from "@components/elements";
import { meState, meSelector } from "@models/auth";
import { Button } from "react-native";
import { StyleSheet, TextInput } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";

export default function SearchScreen() {
  const me = useRecoilValue(meSelector);
  const [getMe, setMe] = useRecoilState(meState);

  return (
    <Container>
      <Content>
        <Text>Search Screen</Text>
        <Text>{me}</Text>

        {/* <TextInput value={getMe} onChangeText={(val) => setMe(val)} />
        <Text>{storage.getAllKeys().toString()}</Text>

        <Button title="Test" onPress={() => storage.set("a", "test")} /> */}
      </Content>
    </Container>
  );
}
