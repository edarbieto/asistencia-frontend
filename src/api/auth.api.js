import axios from "../interceptors";
import { authHeader } from "../stores";

const baseUrl = import.meta.env.VITE_API_URL;

export const authApi = {
  signin: async (username, password) => {
    try {
      const res = await axios.post(`${baseUrl}/api/auth/signin`, {
        username,
        password,
      });
      return res.data;
    } catch (err) {
      return null;
    }
  },
  signup: async (user) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${baseUrl}/api/auth/signup`,
        headers: authHeader(),
        data: user,
      });
      return res.data;
    } catch (err) {
      return null;
    }
  },
};
