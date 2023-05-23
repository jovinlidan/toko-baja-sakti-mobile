import {
  View,
  Text,
  Container,
  Image,
  TouchableOpacity,
  FlashList,
  StyleSheet,
} from "@components/elements";
import { useNavigation, useRouter } from "expo-router";
import { useSelectModal } from "@hooks/use-select-modal";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Header } from "@components/widgets";
import { SelectOption } from "@components/elements/select-input";
import colorConstant from "@constants/color.constant";
import TextInput from "@components/elements/text-input";
import { Ionicons } from "@expo/vector-icons";

interface ItemProps {
  option: SelectOption;
  value: SelectOption["value"];
  onSelect: (newValue: SelectOption) => void;
}

const OptionItem: React.FC<ItemProps> = memo((props) => {
  const { onSelect, option, value } = props;
  const { label, icon } = option;
  const onPress = useCallback(() => onSelect(option), [option, onSelect]);
  const selected = useMemo(
    () => String(value) === String(option.value),
    [value, option]
  );

  const renderImageComponent = useMemo(() => {
    if (!icon) {
      return;
    }

    return (
      <Image
        style={styles.itemIcon}
        source={{ uri: icon }}
        resizeMode="contain"
      />
    );
  }, [icon]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemContainer}>
        {!!icon && renderImageComponent}
        <Text style={selected && styles.active}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
});

export default function SelectModalScreen() {
  const { back } = useRouter();
  const navigation = useNavigation();
  const [isSearch, setIsSearch] = useState<boolean>();
  const [searchValue, setSearchValue] = useState<string>();
  const { modalOptions, onClose } = useSelectModal();

  const beforeRemoveListener = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const onSelect = useCallback(
    (newValue: SelectOption) => {
      modalOptions?.onSelect?.(newValue);
      back();
    },
    [back, modalOptions]
  );

  useEffect(() => {
    navigation.addListener("beforeRemove", beforeRemoveListener);
    return () => {
      navigation.removeListener("beforeRemove", beforeRemoveListener);
    };
  }, [beforeRemoveListener, navigation]);

  const renderItem = useCallback(
    ({ item }: { item: SelectOption }) => (
      <OptionItem
        option={item}
        value={modalOptions?.value!}
        onSelect={onSelect}
      />
    ),
    [modalOptions?.value, onSelect]
  );

  const keyExtractor = useCallback((item: SelectOption) => `${item.value}`, []);

  const filteredOptions = useMemo(() => {
    if (!searchValue) {
      return modalOptions?.options;
    }
    return modalOptions?.options?.filter((option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [modalOptions?.options, searchValue]);

  const onCloseSearch = useCallback(() => {
    setSearchValue(undefined);
    setIsSearch(false);
  }, []);

  return (
    <Container>
      <Header
        centerStyle={isSearch && styles.centerStyle}
        title={
          isSearch ? (
            <TextInput
              autoFocus
              value={searchValue}
              onChangeText={(text) => setSearchValue(text)}
              textInputContainerStyle={styles.textInputContainerStyle}
              placeholder={`Cari ${modalOptions?.modalTitle}`}
              rightIconComponent={() => (
                <TouchableOpacity onPress={onCloseSearch}>
                  <Ionicons name="close-outline" size={28} color="black" />
                </TouchableOpacity>
              )}
            />
          ) : (
            modalOptions?.modalTitle
          )
        }
        back
        rightComponent={
          !isSearch && (
            <TouchableOpacity onPress={() => setIsSearch((prev) => !prev)}>
              <Ionicons name="search" size={24} color="black" />
            </TouchableOpacity>
          )
        }
      />

      <FlashList
        data={filteredOptions || []}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        // onEndReached={() => console.log("end reached - select - field")}
        estimatedItemSize={51}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  textInputContainerStyle: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 4,
    marginLeft: 20,
  },
  itemContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  itemIcon: {
    width: 30,
    height: 30,
    marginRight: 16,
  },
  active: {
    color: colorConstant.primaryOrange1,
    fontWeight: "500",
  },
  centerStyle: {
    paddingBottom: 0,
  },
});
