import axios from "axios";
import { useAuthStore } from "../stores";

axios.interceptors.response.use(undefined, (err) => {
  if (err.response.status === 403 || err.response.status === 401) {
    const user = useAuthStore();
    user.logout();
  }
  return Promise.reject(err);
});

export default axios;
