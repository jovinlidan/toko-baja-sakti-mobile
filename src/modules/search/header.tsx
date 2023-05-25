import { StyleSheet, TextInput, TouchableOpacity } from "@components/elements";
import { Header } from "@components/widgets";
import colorConstant from "@constants/color.constant";
import { Ionicons } from "@expo/vector-icons";
import { searchHistoryState } from "@models/search-history";
import { useCallback, useState, useTransition } from "react";
import { useRecoilState } from "recoil";

interface Props {
  onChangeText: (text: string) => void;
  searchValue?: string;
}

export default function HeaderSearch(props: Props) {
  const { searchValue, onChangeText } = props;
  const [, setSearchHistory] = useRecoilState(searchHistoryState);

  const onSubmitEditing = useCallback(() => {
    if (searchValue) {
      setSearchHistory((past) => [...past, searchValue]);
    }
  }, [searchValue, setSearchHistory]);

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
          returnKeyType="search"
          onSubmitEditing={onSubmitEditing}
          autoFocus
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
              <TouchableOpacity onPress={() => onChangeText("")}>
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
