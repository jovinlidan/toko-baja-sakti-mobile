import storageKeyConstant from "@constants/storage-key.constant";
import { selector } from "recoil";
import { createAtom } from "./recoil";
import persistAtom from "./persist-atom";

export const meState = createAtom({
  key: storageKeyConstant.meKey,
  default: "ini data me",
  persist: true,
  effects: [],
});

export const meSelector = selector({
  key: storageKeyConstant.meSelectorKey,
  get: ({ get }) => {
    return get(meState);
  },
});
