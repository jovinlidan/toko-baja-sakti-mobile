import { Address } from "@api-hooks/address/address.model";
import {
  CategoryItem,
  Item,
} from "@api-hooks/category-item/category-item.model";
import { Billing } from "@api-hooks/checkout/checkout.model";
import { Expose, Type } from "class-transformer";

export class TransactionDetail {
  id: string;
  quantity: number;
  unit: string;

  @Expose({ name: "unit_price" })
  @Type(() => Number)
  unitPrice: number;

  @Type(() => Number)
  price: number;

  @Type(() => TransactionDetailItem)
  item: TransactionDetailItem;
}

export class TransactionDetailItem extends Item {
  @Expose({ name: "category_item" })
  @Type(() => CategoryItem)
  categoryItem: CategoryItem;
}

export class TransactionLite {
  id: string;

  @Expose({ name: "transaction_at" })
  @Type(() => Date)
  transactionAt: Date;

  @Expose({ name: "sub_total" })
  @Type(() => Number)
  subTotal: number;

  @Expose({ name: "shipping_cost" })
  @Type(() => Number)
  shippingCost: number;

  @Expose({ name: "grand_total" })
  @Type(() => Number)
  grandTotal: number;

  status: string;

  @Expose({ name: "no_receipt" })
  noReceipt?: string;

  @Expose({ name: "transaction_details" })
  @Type(() => TransactionDetail)
  transactionDetails: TransactionDetail[];
}

export class Transaction {
  id: string;

  @Expose({ name: "transaction_at" })
  @Type(() => Date)
  transactionAt: Date;

  @Expose({ name: "sub_total" })
  @Type(() => Number)
  subTotal: number;

  @Expose({ name: "shipping_cost" })
  @Type(() => Number)
  shippingCost: number;

  @Expose({ name: "grand_total" })
  @Type(() => Number)
  grandTotal: number;

  @Type(() => Address)
  address: Address;

  status: string;

  @Expose({ name: "no_receipt" })
  noReceipt?: string;

  @Type(() => Billing)
  billing: Billing;

  @Expose({ name: "transaction_details" })
  @Type(() => TransactionDetail)
  transactionDetails: TransactionDetail[];
}

export class TransactionHistoryTrack {
  id: string;
  status: string;
  title: string;
  description?: string;
  @Expose({ name: "created_at" })
  @Type(() => Date)
  createdAt: Date;
}

export class TransactionHistory {
  id: string;

  @Expose({ name: "transaction_id" })
  transactionId: string;

  @Expose({ name: "sub_total" })
  @Type(() => Number)
  subTotal: number;

  @Expose({ name: "shipping_cost" })
  @Type(() => Number)
  shippingCost: number;

  @Expose({ name: "grand_total" })
  @Type(() => Number)
  grandTotal: number;

  status: string;

  @Expose({ name: "no_receipt" })
  noReceipt?: string;

  @Expose({ name: "transaction_histories" })
  @Type(() => TransactionHistoryTrack)
  transactionHistories: TransactionHistoryTrack[];
}

export class getTransactionsInput {
  params?: {
    q?: string;
    page?: number;
    limit?: number;
  };
}

export class getTransactionInput {
  id: string;
}

export class getTransactionHistoryInput {
  id: string;
}

export class SetFinishTransactionInput {
  params: {
    transactionId: string;
  };
}
