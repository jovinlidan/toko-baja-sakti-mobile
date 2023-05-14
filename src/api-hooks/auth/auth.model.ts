import { City } from "@api-hooks/city/city.model";
import { Expose, Type } from "class-transformer";

export class UserAddress {
  id: string;
  tag?: string;

  @Expose({ name: "address_detail" })
  addressDetail: string;

  @Expose({ name: "recipient_name" })
  recipientName?: string;

  @Expose({ name: "recipient_number" })
  recipientNumber?: string;

  @Expose({ name: "is_main" })
  @Type(() => Boolean)
  isMain: boolean;

  @Type(() => City)
  city: City;
}
export class User {
  id: string;
  name: string;
  email?: string;
  phone: string;
  type: string;
  status: string;

  @Type(() => UserAddress)
  address?: UserAddress;
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

export class ResetPasswordInput {
  body: {
    phone: string;
    password: string;
    passwordConfirmation: string;
    verificationToken: string;
  };
}
export class CheckPhoneInput {
  body: {
    phone: string;
  };
}

export class SendEmailOTPInput {
  body: {};
}

export class UpdateMeInput {
  body: UpdateMeInputForm;
}

export class UpdateMeInputForm {
  name: string;
  email: string;
  address: {
    id: string;
    addressDetail: string;
    cityId: string;
  };
}

export class ChangePhoneNumberInput {
  body: ChangePhoneNumberFormInput;
}
export class ChangePhoneNumberFormInput {
  verificationToken: string;
  password: string;
  phone: string;
}
