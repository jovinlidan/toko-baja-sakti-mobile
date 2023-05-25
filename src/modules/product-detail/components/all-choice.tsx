import { CategoryItem } from "@api-hooks/category-item/category-item.model";
import { View } from "@components/elements";
import { SeparatorTypeEnum, styMargin } from "@constants/styles.constant";
import { useCallback } from "react";
import { StateForm } from "../types";
import ItemOption from "./item-option";

interface Props {
  item: CategoryItem;
  setStateForm: (value: Partial<StateForm>) => void;
  stateForm: StateForm;
}

export default function AllChoice(props: Props) {
  const { item, setStateForm, stateForm } = props;

  const getOptionsItem = useCallback(
    (property: string) => {
      return item.items.reduce((prev, next) => {
        if (!prev.includes(next[property])) {
          return [...prev, next[property]];
        }
        return [...prev];
      }, [] as string[]);
    },
    [item.items]
  );

  const getUnitOption = useCallback(() => {
    if (item.bigUnit === item.smallUnit) {
      return [item.bigUnit];
    }
    return [item.bigUnit, item.smallUnit];
  }, [item.bigUnit, item.smallUnit]);

  return (
    <>
      <ItemOption
        options={getOptionsItem("size")}
        onSelectValue={(value) => {
          setStateForm({ size: value });
        }}
        selectedValue={stateForm?.size!}
        label="Ukuran"
      />
      <View style={styMargin(12, SeparatorTypeEnum.bottom)} />
      <ItemOption
        options={getOptionsItem("thick")}
        onSelectValue={(value) => {
          setStateForm({ thick: value });
        }}
        selectedValue={stateForm?.thick!}
        label="Tebal"
      />
      <View style={styMargin(12, SeparatorTypeEnum.bottom)} />
      <ItemOption
        options={getOptionsItem("color")}
        onSelectValue={(value) => {
          setStateForm({ color: value });
        }}
        selectedValue={stateForm?.color!}
        label="Warna"
      />
      <View style={styMargin(12, SeparatorTypeEnum.bottom)} />
      <ItemOption
        options={getUnitOption()}
        onSelectValue={(value) => {
          setStateForm({ unit: value });
        }}
        selectedValue={stateForm?.unit!}
        label="Per Satuan"
      />
    </>
  );
}
