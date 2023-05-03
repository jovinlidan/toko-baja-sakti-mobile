import { MutationFetchFunction } from "@common/helpers/common";
import { useMutation, UseMutationOptions } from "react-query";
import { ApiResult, ApiError, client } from "@common/repositories";
import {
  TokenResult,
  RegisterInput,
  LoginInput,
  User,
  ForgotPasswordInput,
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

export function useForgotPasswordUser(
  options?: UseMutationOptions<ApiResult<User>, ApiError, ForgotPasswordInput>
) {
  return useMutation<ApiResult<User>, ApiError, ForgotPasswordInput>(
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
