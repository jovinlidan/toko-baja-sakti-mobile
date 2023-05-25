import {
  Item,
  ItemUnitEnum,
  CategoryItem,
} from "@api-hooks/category-item/category-item.model";
import { Expose, Type } from "class-transformer";

export class CartItemItem extends Item {
  weight: number;
  @Expose({ name: "category_item" })
  @Type(() => CategoryItem)
  categoryItem: CategoryItem;
}

export class CartItem {
  id: string;
  quantity: number;

  @Type(() => Number)
  price: number;

  unit: string;

  note?: string;

  @Type(() => CartItemItem)
  item: CartItemItem;

  @Expose({ name: "out_of_stock" })
  outOfStock: boolean;
}

export class CartLite {
  id: string;
  @Expose({ name: "grand_total" })
  grandTotal: number;

  note?: string;

  @Expose({ name: "cart_items" })
  @Type(() => CartItem)
  cartItems: CartItem[];
}

export class AddCartFormInput {
  itemId: string;
  quantity: number;
  unit: ItemUnitEnum;
}

export class AddCartInput {
  body: AddCartFormInput;
}

export class RemoveCartInput {
  param: RemoveCartParamInput;
}

export class RemoveCartParamInput {
  cartItem: string;
}
