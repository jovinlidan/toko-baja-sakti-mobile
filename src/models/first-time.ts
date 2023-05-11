import storageKeyConstant from "@constants/storage-key.constant";
import { createAtom } from "./recoil";

export const firstTimeState = createAtom<boolean>({
  key: storageKeyConstant.firstTimeKey,
  default: true,
  persist: true,
});
