import { TransactionStatusEnum } from "@api-hooks/transaction/transaction.model";

export class TransactionItemHeader {
  date: Date;
  status: TransactionStatusEnum;
}
