import { StyleSheet, TextInput, TouchableOpacity } from "@components/elements";
import { Header } from "@components/widgets";
import colorConstant from "@constants/color.constant";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useState, useTransition } from "react";

interface Props {
  setQuery: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function HeaderSearch(props: Props) {
  const { setQuery } = props;
  const [searchValue, setSearchValue] = useState<string>();
  const [, startTransition] = useTransition();

  const onCloseSearch = useCallback(() => {
    setSearchValue(undefined);
  }, []);

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
    <Header
      centerStyle={styles.centerStyle}
      title={
        <TextInput
          value={searchValue}
          onChangeText={onChangeText}
          textInputContainerStyle={styles.textInputContainerStyle}
          placeholder="Cari berdasarkan kata kunci"
          leftIconContainerStyle={styles.leftIconTextInput}
          rightIconContainerStyle={styles.rightIconTextInput}
          leftIconComponent={() =>
            searchValue ? (
              <Ionicons
                name="chevron-back"
                size={24}
                color={colorConstant.gray1}
              />
            ) : (
              <Ionicons name="search" size={24} color={colorConstant.gray1} />
            )
          }
          rightIconComponent={() =>
            searchValue ? (
              <TouchableOpacity onPress={onCloseSearch}>
                <Ionicons name="close-outline" size={28} color="black" />
              </TouchableOpacity>
            ) : null
          }
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  textInputContainerStyle: {
    borderWidth: 0,
    borderRadius: 4,
  },
  centerStyle: {
    paddingBottom: 0,
  },
  leftIconTextInput: {
    paddingLeft: 0,
  },
  rightIconTextInput: {
    paddingRight: 0,
  },
});
