import { User } from "@api-hooks/auth/auth.model";
import storageKeyConstant from "@constants/storage-key.constant";
import { selector } from "recoil";
import { createAtom } from "./recoil";

export const meState = createAtom<User | null>({
  key: storageKeyConstant.meKey,
  default: null,
  persist: true,
});

export const meSelector = selector({
  key: storageKeyConstant.meSelectorKey,
  get: ({ get }) => {
    return get(meState);
  },
});
