import axios from "../interceptors";
import { authHeader } from "../stores";

const baseUrl = import.meta.env.VITE_API_URL;

export const attendanceApi = {
  register: async (type, notes) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${baseUrl}/api/attendance`,
        headers: authHeader(),
        data: { type, notes },
      });
      return res.data;
    } catch (err) {
      return null;
    }
  },
  getToday: async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${baseUrl}/api/attendance/today`,
        headers: authHeader(),
      });
      return res.data;
    } catch (err) {
      return null;
    }
  },
};
