import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuth = create(
  persist(
    (set) => ({
      user: null,
      login: async (values) => {
        try {
          const res = await axios.post(
            "http://localhost:8080/auth/login",
            values,
          );
          toast.success("welcome admin", { position: "top-center" });
          return set({
            user: res.data,
          });
        } catch (err) {
          console.log(err);
          toast.error(err.response.data.message, { position: "top-center" });
          return set({ user: null });
        }
      },
      logout: () => {
        toast.success("Logout sucessfully", { position: "top-center" });
        return set({
          user: null,
        });
      },
    }),
    { name: "auth" },
  ),
);
