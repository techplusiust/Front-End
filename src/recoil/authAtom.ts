import { atom } from "recoil";

interface auth {
  isLoggedin: boolean;
}

export const authAtom = atom<auth>({
  key: "authAtom",
  default: {
    isLoggedin: false,
  },
});
