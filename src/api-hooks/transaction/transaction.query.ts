import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";
import {
  Transaction,
  TransactionHistory,
  TransactionLite,
  getTransactionHistoryInput,
  getTransactionInput,
  getTransactionsInput,
} from "./transaction.model";
import { ApiError, ApiResult, ExtendedApiResult } from "@common/repositories";
import { QueryFetchFunction, QueryTransformer } from "@common/helpers/common";

export function useGetTransactions(
  input?: getTransactionsInput,
  options?: UseQueryOptions<ExtendedApiResult<TransactionLite[]>, ApiError>
): UseQueryResult<ExtendedApiResult<TransactionLite[]>, ApiError> {
  return QueryTransformer(
    useQuery<ExtendedApiResult<TransactionLite[]>, ApiError>(
      getTransactionsKey(input),
      () =>
        QueryFetchFunction({
          url: "transaction",
          params: input?.params,
        }),
      options
    ),
    TransactionLite
  );
}

export function getTransactionsKey(input?: getTransactionsInput) {
  const keys: any[] = ["getTransactions"];
  if (input) {
    keys.push(input?.params);
  }
  return keys;
}

export function useGetTransaction(
  input?: getTransactionInput,
  options?: UseQueryOptions<ApiResult<Transaction>, ApiError>
): UseQueryResult<ApiResult<Transaction>, ApiError> {
  return QueryTransformer(
    useQuery<ApiResult<Transaction>, ApiError>(
      getTransactionKey(input),
      () =>
        QueryFetchFunction({
          url: `transaction/${input?.id}`,
        }),
      options
    ),
    Transaction
  );
}

export function getTransactionKey(input?: getTransactionInput) {
  const keys: any[] = ["getTransaction", input?.id];
  return keys;
}

export function useGetTransactionHistory(
  input?: getTransactionHistoryInput,
  options?: UseQueryOptions<ApiResult<TransactionHistory>, ApiError>
): UseQueryResult<ApiResult<TransactionHistory>, ApiError> {
  return QueryTransformer(
    useQuery<ApiResult<TransactionHistory>, ApiError>(
      getTransactionHistoryKey(input),
      () =>
        QueryFetchFunction({
          url: `transaction/${input?.id}/transaction-history`,
        }),
      options
    ),
    TransactionHistory
  );
}

export function getTransactionHistoryKey(input?: getTransactionHistoryInput) {
  const keys: any[] = ["getTransactionHistory", input?.id];
  return keys;
}
