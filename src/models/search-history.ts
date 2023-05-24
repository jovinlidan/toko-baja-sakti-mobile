import storageKeyConstant from "@constants/storage-key.constant";
import { createAtom } from "./recoil";

export const searchHistoryState = createAtom<string[]>({
  key: storageKeyConstant.searchHistoryKey,
  default: [],
  persist: true,
});
