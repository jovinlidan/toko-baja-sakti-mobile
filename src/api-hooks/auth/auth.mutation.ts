import { MutationFetchFunction } from "@common/helpers/common";
import { useMutation, UseMutationOptions } from "react-query";
import { ApiResult, ApiError, client } from "@common/repositories";
import {
  TokenResult,
  RegisterInput,
  LoginInput,
  User,
  ResetPasswordInput,
  CheckPhoneInput,
  UpdateMeInput,
} from "./auth.model";
import { plainToClass } from "class-transformer";

export const refreshToken = async function (
  refresh_token: string
): Promise<ApiResult<TokenResult>> {
  const res = await client
    .post("auth/refresh", { json: { refresh_token } })
    .json<ApiResult<TokenResult>>();

  return {
    ...res,
    data: plainToClass(TokenResult, res.data),
  };
};

export function useRegisterUser(
  options?: UseMutationOptions<ApiResult<TokenResult>, ApiError, RegisterInput>
) {
  return useMutation<ApiResult<TokenResult>, ApiError, RegisterInput>(
    async function (body) {
      return await MutationFetchFunction({
        url: "auth/register",
        method: "POST",
        body: body.body,
        classType: TokenResult,
      });
    },
    options
  );
}

export function useLoginUser(
  options?: UseMutationOptions<ApiResult<TokenResult>, ApiError, LoginInput>
) {
  return useMutation<ApiResult<TokenResult>, ApiError, LoginInput>(
    async function (body) {
      return await MutationFetchFunction({
        url: "auth/login",
        method: "POST",
        body: body.body,
        classType: TokenResult,
      });
    },
    options
  );
}

export function useResetPasswordUser(
  options?: UseMutationOptions<ApiResult<User>, ApiError, ResetPasswordInput>
) {
  return useMutation<ApiResult<User>, ApiError, ResetPasswordInput>(
    async function (body) {
      return await MutationFetchFunction({
        url: "auth/reset-password",
        method: "POST",
        body: body.body,
        classType: User,
      });
    },
    options
  );
}

export function useRevokeUser(options?: UseMutationOptions<any, ApiError>) {
  return useMutation<any, ApiError>(async function (body) {
    return await MutationFetchFunction({
      url: "auth/revoke",
      method: "POST",
      body: body,
    });
  }, options);
}

export function useCheckPhone(
  options?: UseMutationOptions<null, ApiError, CheckPhoneInput>
) {
  return useMutation<null, ApiError, CheckPhoneInput>(async function (body) {
    return await MutationFetchFunction({
      url: "auth/check-phone",
      method: "POST",
      body: body.body,
    });
  }, options);
}

export function useUpdateMe(
  options?: UseMutationOptions<ApiResult<User>, ApiError, UpdateMeInput>
) {
  return useMutation<ApiResult<User>, ApiError, UpdateMeInput>(async function (
    body
  ) {
    return await MutationFetchFunction({
      url: "me",
      method: "POST",
      body: body.body,
      classType: User,
    });
  },
  options);
}
