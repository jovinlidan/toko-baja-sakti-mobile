import { BASE_URL } from "react-native-dotenv";

function getConfig(
  key: string,
  value: string | undefined,
  required: boolean
): string | undefined {
  if (required && !value) {
    throw Error(`${key} is not defined`);
  }
  return value;
}

export default {
  baseURL: getConfig("BASE_URL", BASE_URL, true)!,
};
