import { create } from "zustand";
import { IUser } from "@/interfaces/user.interface";

interface IUserStore {
  users: IUser[];
  selectedUser: IUser | null;
  setUsers: (users: IUser[]) => void;
  setSelectedUser: (user: IUser | null) => void;
}

const useUserStore = create<IUserStore>((set) => ({
  users: [],
  selectedUser: null,
  setUsers: (users) => set({ users }),
  setSelectedUser: (user) => set({ selectedUser: user }),
}));

export default useUserStore;
