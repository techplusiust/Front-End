import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

interface auth {
  isLoggedin: boolean;
  isAdmin: boolean;
  role?: "admin" | "user" | null;
}
const { persistAtom } = recoilPersist();

export const authAtom = atom<auth>({
  key: "authAtom",
  default: {
    isLoggedin: false,
    isAdmin: false,
    role: null ,
  },
  effects_UNSTABLE: [persistAtom],
});
