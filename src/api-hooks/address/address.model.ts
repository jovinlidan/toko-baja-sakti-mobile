import { City, CityLite } from "@api-hooks/city/city.model";
import { Expose, Type } from "class-transformer";

export class AddressLite {
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

  @Type(() => CityLite)
  city: CityLite;
}

export class Address {
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

export class getAddressesInput {
  params?: {
    q?: string;
    page?: number;
    limit?: number;
  };
}

export class getAddressInput {
  id: string;
}

export class CreateAddressInput {
  body: CreateAddressFormInput;
}

export class CreateAddressFormInput {
  cityId: string;
  tag: string;
  addressDetail: string;
  recipientName: string;
  recipientNumber: string;
  isMain: boolean;
}

export class UpdateAddressInput {
  id: string;
  body: UpdateAddressFormInput;
}

export class UpdateAddressFormInput {
  cityId: string;
  tag: string;
  addressDetail: string;
  recipientName: string;
  recipientNumber: string;
  isMain: boolean;
}

export class DeleteAddressInput {
  id: string;
}
