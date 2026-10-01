import axios from "axios";

const axiosInstance = axios.create({
  // የlocal Express server-ህ አድራሻ (መጨረሻው ላይ slash `/` አለመኖሩን አረጋግጥ)
  baseURL: "http://localhost:3000",
});

export default axiosInstance;