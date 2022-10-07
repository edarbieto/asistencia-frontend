import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import AdminView from "../views/AdminView.vue";
import { useAuthStore } from "../stores";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminView,
    },
  ],
});

router.beforeEach((to) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();
  const isAdmin = auth.user ? auth.user.roles.includes("admin") : false;

  if (to.path === "/login" && auth.user) {
    return isAdmin ? "/admin" : "/";
  }

  if (to.path === "/admin" && auth.user && !isAdmin) {
    return "/";
  }

  if (authRequired && !auth.user) {
    return "/login";
  }
});

export default router;
