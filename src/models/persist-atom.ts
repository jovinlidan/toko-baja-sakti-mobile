import storage from "@common/repositories/storage";
import { AtomEffect, DefaultValue } from "recoil";

export default function persistAtom<T>(key: string): AtomEffect<T> {
  return ({ setSelf, onSet }) => {
    const value = storage.getString(key);
    setSelf(value ? JSON.parse(value) : new DefaultValue());

    // Subscribe to state changes and persist them to localForage
    onSet((newValue, _, isReset) => {
      isReset
        ? storage.delete(key)
        : storage.set(key, JSON.stringify(newValue));
    });
  };
}
