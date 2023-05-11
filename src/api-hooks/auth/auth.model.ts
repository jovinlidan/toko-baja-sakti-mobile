import { Expose } from "class-transformer";

export class User {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  type: string;
  status: string;
  address: string | null;
}

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
  body: {
    username: string;
    password: string;
  };
}

export class RegisterInput {
  body: {
    name: string;
    phone: string;
    password: string;
    passwordConfirmation: string;
    verificationToken: string;
  };
}

export class ForgotPasswordInput {
  body: {};
}

export class SendEmailOTPInput {
  body: {};
}
