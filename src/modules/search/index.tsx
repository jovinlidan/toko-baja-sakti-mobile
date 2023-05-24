import { Container, View, Content } from "@components/elements";
import colorConstant from "@constants/color.constant";
import sizeConstant from "@constants/size.constant";
import { useState } from "react";
import { StyleSheet } from "react-native";

import Header from "./header";
import ProductList from "./product-list";

export default function Search() {
  const [query, setQuery] = useState<string>();

  return (
    <Container>
      <Header setQuery={setQuery} />
      <Content showsVerticalScrollIndicator={false} noPadding>
        <View style={styles.content}>
          <ProductList query={query} />
        </View>
      </Content>
    </Container>
  );
}
const styles = StyleSheet.create({
  content: {
    paddingTop: sizeConstant.contentPad,
    backgroundColor: colorConstant.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});
