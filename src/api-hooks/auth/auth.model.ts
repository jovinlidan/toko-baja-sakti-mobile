import { Expose, Type } from "class-transformer";

export class User {}

export class TokenResult {
  @Expose({ name: "token_type" })
  tokenType: string;

  @Expose({ name: "expires_in" })
  expiresIn: number;

  @Expose({ name: "access_token" })
  accessToken: string;

  @Expose({ name: "refresh_token" })
  refreshToken: string;
}

export class LoginInput {
  body: {};
}

export class RegisterInput {
  body: {};
}

export class ForgotPasswordInput {
  body: {};
}

export class SendEmailOTPInput {
  body: {};
}
