import { User } from "./auth.model";
import { QueryFetchFunction } from "@common/helpers/common";
import { plainToClass } from "class-transformer";

export const getMe = async function (): Promise<User> {
  const response = await QueryFetchFunction({ url: "me" });
  return plainToClass(User, response.data);
};
