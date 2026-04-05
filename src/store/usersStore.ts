import { create } from 'zustand';
import type { User } from '../types/user';

interface UsersState {
  users: User[];
  archivedIds: Set<number>;
  hiddenIds: Set<number>;

  setUsers: (users: User[]) => void;
  updateUser: (user: User) => void;
  archiveUser: (id: number) => void;
  activateUser: (id: number) => void;
  hideUser: (id: number) => void;
}

export const useUsersStore = create<UsersState>((set) => ({
  users: [],
  archivedIds: new Set(),
  hiddenIds: new Set(),

  setUsers: (users) => set({ users }),

  updateUser: (user) =>
    set((state) => ({
      users: state.users.map((existingUser) =>
        existingUser.id === user.id ? user : existingUser,
      ),
    })),

  archiveUser: (id) =>
    set((state) => {
      const next = new Set(state.archivedIds);
      next.add(id);
      return { archivedIds: next };
    }),

  activateUser: (id) =>
    set((state) => {
      const next = new Set(state.archivedIds);
      next.delete(id);
      return { archivedIds: next };
    }),

  hideUser: (id) =>
    set((state) => {
      const next = new Set(state.hiddenIds);
      next.add(id);
      return { hiddenIds: next };
    }),
}));
