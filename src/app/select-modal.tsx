import {
  View,
  Text,
  Container,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "@components/elements";
import {
  useNavigation,
  usePathname,
  useRouter,
  useSearchParams,
} from "expo-router";
import { useSelectModal } from "@hooks/use-select-modal";
import { memo, useCallback, useEffect, useMemo } from "react";
import { Header } from "@components/widgets";
import { SelectOption } from "@components/elements/select-input";
import colorConstant from "@constants/color.constant";

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

export default function SelectModalScreen(props) {
  const { back } = useRouter();
  const navigation = useNavigation();

  const { modalOptions, onClose } = useSelectModal();

  const beforeRemoveListener = useCallback(() => {
    onClose?.();
  }, []);

  const onSelect = useCallback((newValue: SelectOption) => {
    modalOptions?.onSelect?.(newValue);
    back();
  }, []);

  useEffect(() => {
    navigation.addListener("beforeRemove", beforeRemoveListener);
    return () => {
      navigation.removeListener("beforeRemove", beforeRemoveListener);
    };
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: SelectOption }) => (
      <OptionItem
        option={item}
        value={modalOptions?.value!}
        onSelect={onSelect}
      />
    ),
    []
  );

  const keyExtractor = useCallback((item: SelectOption) => `${item.value}`, []);

  return (
    <Container>
      <Header title={modalOptions?.modalTitle} back />
      <FlatList
        data={modalOptions?.options || []}
        renderItem={renderItem}
        windowSize={1}
        keyExtractor={keyExtractor}
      />
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
});
