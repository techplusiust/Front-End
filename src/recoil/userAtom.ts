import { atom } from "recoil";

interface User {
  username: string;
  email: string;
  department: string;
  avatar?: string;
}

export const userAtom = atom<User | null>({
  key: "userAtom",
  default: null,
});
