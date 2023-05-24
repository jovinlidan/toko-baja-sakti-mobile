import { View, Text, StyleSheet, Pressable } from "@components/elements";
import colorConstant from "@constants/color.constant";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import { Fragment } from "react";

interface Props {
  options: string[];
  selectedValue: string;
  onSelectValue: (value: string) => void;
  label: string;
}

interface PillProps {
  selected: boolean;
  label: string;
  onPress: VoidFunction;
}

function Pill(props: PillProps) {
  const { selected, label, onPress } = props;
  return (
    <Pressable
      style={[
        pillStyles.selectedWrapper,
        selected && { borderColor: colorConstant.primaryOrange1 },
      ]}
      onPress={onPress}
    >
      <View style={pillStyles.defaultWrapper}>
        <Text variant="bodyMed">{label}</Text>
      </View>
    </Pressable>
  );
}
const pillStyles = StyleSheet.create({
  selectedWrapper: {
    borderColor: colorConstant.transparent,
    borderWidth: 3,
    padding: 1,
    borderRadius: 1000,
  },
  defaultWrapper: {
    borderColor: colorConstant.gray4,
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 1000,
  },
});

export default function ItemOption(props: Props) {
  const { onSelectValue, options, selectedValue, label } = props;
  return (
    <View>
      <Text variant="h5">{label}</Text>
      <View style={styMargin(4, SeparatorTypeEnum.bottom)} />
      <View style={styles.optionContainer}>
        {options.map((option, idx) => (
          <Fragment key={option}>
            {idx !== 0 && (
              <View style={styMargin(8, SeparatorTypeEnum.right)} />
            )}
            <Pill
              label={option}
              selected={selectedValue === option}
              onPress={() => onSelectValue(option)}
            />
          </Fragment>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
