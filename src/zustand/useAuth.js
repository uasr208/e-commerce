const env = import.meta.env;
import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

axios.defaults.baseURL = env.VITE_SERVER_URL;
export const useAuth = create(
  persist(
    (set) => ({
      user: null,
      login: async (values) => {
        try {
          const res = await axios.post("/auth/login", values);
          toast.success("welcome admin", { position: "top-center" });
          set({
            user: res.data,
          });
          setTimeout(() => {
            window.location.replace("/admin/dashboard");
          }, 2000);
          return;
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
