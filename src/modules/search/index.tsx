import { Container, View, Content } from "@components/elements";
import colorConstant from "@constants/color.constant";
import sizeConstant from "@constants/size.constant";
import { useCallback, useState, useTransition } from "react";
import { StyleSheet } from "react-native";

import Header from "./header";
import ProductList from "./product-list";
import SearchHistory from "./search-history";

export default function Search() {
  const [query, setQuery] = useState<string>();
  const [searchValue, setSearchValue] = useState<string>();
  const [, startTransition] = useTransition();

  const onChangeText = useCallback(
    (text) => {
      if (text === "") {
        text = undefined;
      }
      setSearchValue(text);
      startTransition(() => {
        setQuery(text);
      });
    },
    [setQuery]
  );

  return (
    <Container>
      <Header onChangeText={onChangeText} searchValue={searchValue} />
      <Content showsVerticalScrollIndicator={false} noPadding>
        <View style={styles.content}>
          {query ? (
            <ProductList query={query} />
          ) : (
            <SearchHistory onSelectHistory={onChangeText} />
          )}
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
