import { Address } from "@api-hooks/address/address.model";
import {
  CategoryItem,
  Item,
} from "@api-hooks/category-item/category-item.model";
import { Billing } from "@api-hooks/checkout/checkout.model";
import colorConstant from "@constants/color.constant";
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

export enum TransactionStatusEnum {
  Created = "created",
  InProcess = "in_process",
  Requested = "requested",
  Shipped = "shipped",
  Delivered = "delivered",
  Finished = "finished",
  Disputed = "disputed",
  Cancelled = "cancelled",
  HalfReturn = "half_return",
  AllReturn = "all_return",
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

  status: TransactionStatusEnum;

  @Expose({ name: "no_receipt" })
  noReceipt?: string;

  @Expose({ name: "transaction_details" })
  @Type(() => TransactionDetail)
  transactionDetails: TransactionDetail[];
}

export class ReturnTransactionDetail extends TransactionDetail {
  reason?: string;
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

  status: TransactionStatusEnum;

  getStatusLabel() {
    switch (this.status) {
      case TransactionStatusEnum.Created:
        return "Belum Dibayar";
      case TransactionStatusEnum.InProcess:
        return "Sedang Diproses";
      case TransactionStatusEnum.Requested:
        return "Menunggu Kurir";
      case TransactionStatusEnum.Shipped:
        return "Sedang Dikirim";
      case TransactionStatusEnum.Delivered:
        return "Pesanan Telah Tiba Di Tujuan";
      case TransactionStatusEnum.Finished:
        return "Selesai";
      case TransactionStatusEnum.Disputed:
        return "Dikomplain";
      case TransactionStatusEnum.Cancelled:
        return "Dibatalkan";
      case TransactionStatusEnum.AllReturn:
        return "Dikembalikan semua";
      case TransactionStatusEnum.HalfReturn:
        return "Dikembalikan sebagian";
    }
  }
  getStatusColor() {
    switch (this.status) {
      case TransactionStatusEnum.Created:
      case TransactionStatusEnum.InProcess:
      case TransactionStatusEnum.Requested:
      case TransactionStatusEnum.Shipped:
        return colorConstant.primaryOrange1;
      case TransactionStatusEnum.Delivered:
      case TransactionStatusEnum.Finished:
        return colorConstant.successDefault;
      case TransactionStatusEnum.Disputed:
      case TransactionStatusEnum.Cancelled:
      case TransactionStatusEnum.AllReturn:
      case TransactionStatusEnum.HalfReturn:
        return colorConstant.redDefault;
    }
  }

  @Expose({ name: "no_receipt" })
  noReceipt?: string;

  @Type(() => Billing)
  billing: Billing;

  @Expose({ name: "sales_return_items" })
  @Type(() => TransactionDetail)
  salesReturnItems: TransactionDetail[];

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

export class PrintInvoiceTransactionInput {
  id: string;
}
