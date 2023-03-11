import { atom, RecoilState } from "recoil";
import type { AtomOptions } from "recoil";
import persistAtom from "./persist-atom";

interface DefaultOptions {
  persist?: boolean;
}

export function createAtom<T>(
  options: AtomOptions<T> & DefaultOptions
): RecoilState<T> {
  return atom({
    ...options,
    effects: [
      ...(options.effects as any[]),
      ...(options.persist ? [persistAtom(options.key)] : []),
    ],
  });
}
