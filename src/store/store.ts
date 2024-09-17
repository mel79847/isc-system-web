import { create } from "zustand";
import { Seminar } from "../models/studentProcess";
import { Permission } from "../models/permissionInterface";

interface IProcessStore {
  process: Seminar | null;
  setProcess: (newProcess: Seminar) => void;
}

interface IUser {
  id: number;
  name?: string;
  email?: string;
  roles?: string[];
  token: string;
  roles_permissions?: {
    [role: string]: {
      permissions: Permission[];
    };
  };
}
interface IUserStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
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
