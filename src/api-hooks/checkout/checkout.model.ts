import { Address } from "@api-hooks/address/address.model";
import {
  CategoryItem,
  Item,
} from "@api-hooks/category-item/category-item.model";
import { Expose, Type } from "class-transformer";

export class CheckoutDetailItem extends Item {
  weight: number;
  @Expose({ name: "category_item" })
  @Type(() => CategoryItem)
  categoryItem: CategoryItem;
}

export class CheckoutDetail {
  id: string;
  quantity: number;

  @Type(() => Number)
  price: number;

  unit: string;

  note?: string;

  @Type(() => CheckoutDetailItem)
  item: CheckoutDetailItem;
}

export class Checkout {
  id: string;
  @Expose({ name: "grand_total" })
  grandTotal: number;

  note?: string;

  @Expose({ name: "total_weight" })
  totalWeight: number;

  @Expose({ name: "checkout_details" })
  @Type(() => CheckoutDetail)
  checkoutDetails: CheckoutDetail[];

  @Type(() => Address)
  address: Address;
}

export class CourierCostInput {
  body: CourierCostFormInput;
}

export class CourierCostFormInput {
  destination: number;
  weight: number;
}

export class Cost {
  @Type(() => Number)
  value: number;

  etd: string;
  note?: string;
}

export class CourierCost {
  service: string;
  description: string;

  @Type(() => Cost)
  cost: Cost[];
}

export class MakeBillingInput {
  param: MakeBillingParamInput;
  body: MakeBillingFormInput;
}

export class MakeBillingParamInput {
  checkoutId: string;
}
export class MakeBillingFormInput {
  addressId: string;
  shippingCost: number;
}

export class getBillingInput {
  billingId: string;
}

export class Billing {
  id: string;

  @Expose({ name: "total_price" })
  @Type(() => Number)
  totalPrice: number;

  @Expose({ name: "billing_url" })
  billingUrl: string;

  @Expose({ name: "shipping_cost" })
  @Type(() => Number)
  shippingCost: number;

  status: string;

  @Expose({ name: "created_at" })
  @Type(() => Date)
  createdAt: Date;

  @Expose({ name: "updated_at" })
  @Type(() => Date)
  updatedAt: Date;
}
