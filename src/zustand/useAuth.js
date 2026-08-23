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
      signup: async (values) => {
        try {
          const { data } = await axios.post("/auth/signup", values);
          set({ user: data });
          toast.success("Account created start your shopping now");
          setTimeout(() => {
            window.location.replace("/");
          }, 2000);
        } catch (err) {
          toast.error(err.response?.data?.message || "Signup failed");
        }
      },
      login: async (values) => {
        try {
          const res = await axios.post("/auth/login", values);
          toast.success("welcome admin", { position: "top-center" });
          set({
            user: res.data,
          });
          setTimeout(() => {
            if (res.data.role === "admin")
              window.location.replace("/admin/dashboard");
            else window.location.replace("/");
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
