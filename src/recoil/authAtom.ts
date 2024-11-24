import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

interface auth {
  isLoggedin: boolean;
}
const { persistAtom } = recoilPersist();

export const authAtom = atom<auth>({
  key: "authAtom",
  default: {
    isLoggedin: false,
  },
  effects_UNSTABLE: [persistAtom],
});
