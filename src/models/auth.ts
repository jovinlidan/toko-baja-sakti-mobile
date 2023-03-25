import storageKeyConstant from "@constants/storage-key.constant";
import { selector } from "recoil";
import { createAtom } from "./recoil";

export const meState = createAtom({
  key: storageKeyConstant.meKey,
  default: "ini data me",
  persist: true,
});

export const meSelector = selector({
  key: storageKeyConstant.meSelectorKey,
  get: ({ get }) => {
    return get(meState);
  },
});
