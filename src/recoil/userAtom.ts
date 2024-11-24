import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

interface User {
  username: string;
  email: string;
  department: string;
  avatar?: string;
}

const { persistAtom } = recoilPersist();

export const userAtom = atom<User | null>({
  key: "userAtom",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
