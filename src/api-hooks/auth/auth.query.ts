import { User } from "./auth.model";
import { QueryFetchFunction } from "@common/helpers/common";

export const getMe = async function (): Promise<User> {
  const response = await QueryFetchFunction("me");
  return response.data;
};
