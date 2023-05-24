export enum QuantitySetterEnum {
  INCREMENT = "INCREMENT",
  DECREMENT = "DECREMENT",
  OUTOFSTOCK = "OUT_OF_STOCK",
  DIRECTSET = "DIRECT_SET",
}

export interface StateForm {
  size: string;
  thick: string;
  color: string;
  unit: string;
}

export type QuantityReducerAction = {
  type: QuantitySetterEnum;
  quantity?: number;
};
