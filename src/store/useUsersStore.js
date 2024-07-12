import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { addUser, fetchUsers } from "../services/api";

export const useUsersStore = create(
  immer((set) => ({
    users: [],
    userName: "",
    loading: false,
    error: null,
    getUsers: async () => {
      set((state) => {
        state.loading = true;
        state.error = null;
      });

      try {
        const data = await fetchUsers();
        set((state) => {
          state.users = data;
          state.loading = false;
        });
      } catch (error) {
        set((state) => {
          state.error = error.message;
          state.loading = false;
        });
      }
    },
    addUserName: async (userName) => {
      set((state) => {
        state.loading = true;
        state.error = null;
      });

      try {
        const { name } = await addUser(userName);
        set((state) => {
          state.userName = name;
          state.loading = false;
        });
      } catch (error) {
        set((state) => {
          state.error = error.message;
          state.loading = false;
        });
      }
    },
  }))
);
