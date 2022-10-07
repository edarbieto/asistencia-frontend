import axios from "../interceptors";
import { authHeader } from "../stores";

const baseUrl = import.meta.env.VITE_API_URL;

export const userApi = {
  getUsers: async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${baseUrl}/api/user/listusers`,
        headers: authHeader(),
      });
      return res.data.users;
    } catch (err) {
      return [];
    }
  },
  deleteUser: async (userId) => {
    try {
      const res = await axios({
        method: "DELETE",
        url: `${baseUrl}/api/user`,
        headers: authHeader(),
        data: { userId: userId },
      });
      return res.data;
    } catch (err) {
      return null;
    }
  },
  updateRoles: async (userId, roles) => {
    try {
      const res = await axios({
        method: "PATCH",
        url: `${baseUrl}/api/user/roles`,
        headers: authHeader(),
        data: { userId, roles },
      });
      return res.data;
    } catch (err) {
      return null;
    }
  },
  updatePassword: async (userId, password) => {
    try {
      const res = await axios({
        method: "PATCH",
        url: `${baseUrl}/api/user/password`,
        headers: authHeader(),
        data: { userId, password },
      });
      return res.data;
    } catch (err) {
      return null;
    }
  },
  updateSelfPassword: async (password) => {
    try {
      const res = await axios({
        method: "PATCH",
        url: `${baseUrl}/api/user/password`,
        headers: authHeader(),
        data: { password },
      });
      return res.data;
    } catch (err) {
      return null;
    }
  },
};
