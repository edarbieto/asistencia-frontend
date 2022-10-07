import { defineStore } from "pinia";
import { authApi } from "../api/auth.api";
import router from "../router";

export const authHeader = () => {
  const { user } = useAuthStore();
  const isLoggedIn = user.token ? true : false;
  if (isLoggedIn) return { token: user.token };
  else return {};
};

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
  }),
  actions: {
    async login(username, password) {
      const user = await authApi.signin(username, password);
      if (!user) {
        return false;
      }
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
      const returnUrl = user.roles.includes("admin") ? "/admin" : "/";
      router.push(returnUrl);
      return true;
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      router.push("/login");
      return;
    },
  },
});
