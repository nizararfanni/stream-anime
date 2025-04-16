import axios from "axios";

const baseAPi = import.meta.env.VITE_API_URL;
const AxiosConfig = axios.create({
  baseURL: baseAPi,
  timeout: 3000,
});

export default AxiosConfig;
