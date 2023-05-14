import { getMe } from "@api-hooks/auth/auth.query";
import { meState } from "@models/auth";
import produce from "immer";
import { useRecoilState } from "recoil";

export default function useMe() {
  const [, setMe] = useRecoilState(meState);

  return {
    reset: () => {
      try {
        setMe(null);
      } catch {}
    },
    refetch: async () => {
      try {
        const result = await getMe();
        setMe(result);
      } catch {}
    },
  };
}
