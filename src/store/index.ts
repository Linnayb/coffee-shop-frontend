import { User } from "@/queries/users";
import { create } from "zustand";

type Store = {
  session: User | null;
  setAuthUser: (user: User) => void;
};

export const useStore = create<Store>((set) => ({
  session: null,
  setAuthUser: (user) => set({ session: user }),
}));
