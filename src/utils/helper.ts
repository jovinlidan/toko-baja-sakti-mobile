import { TransactionStatusEnum } from "@api-hooks/transaction/transaction.model";
import colorConstant from "@constants/color.constant";

export function getTransactionStatusLabel(status?: TransactionStatusEnum) {
  switch (status) {
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
  }
}
export function getTransactionStatusColor(status?: TransactionStatusEnum) {
  switch (status) {
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
      return colorConstant.redDefault;
  }
}
