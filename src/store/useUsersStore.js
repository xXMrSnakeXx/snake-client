import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { addUser, fetchUsers } from "../services/api";
import { create } from "zustand";

export const useUsersStore = create(
  persist(
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
            state.error = "Please try again later!";
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
            state.error = "The name must be unique!";
            state.loading = false;
          });
        }
      },
      resetUserName: () => {
        set((state) => {
          state.userName = "";
          state.error = null;
        });
      },
    })),
    {
      name: "userName",
      partialize: (state) => ({ userName: state.userName }),
    }
  )
);
