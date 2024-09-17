import { create } from "zustand";
import { Seminar } from "../models/studentProcess";
import { UserResponse } from "../services/models/LoginResponse";

interface IProcessStore {
  process: Seminar | null;
  setProcess: (newProcess: Seminar) => void;
}

interface IUserStore {
  user: UserResponse | null;
  setUser: (user: UserResponse | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export const useProcessStore = create<IProcessStore>((set) => ({
  process: null,
  setProcess: (newProcess: Seminar) => set({ process: newProcess }),
}));
