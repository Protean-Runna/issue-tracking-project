import axios, { AxiosInstance } from "axios";
import "dotenv/config"
const baseURL = process.env.BASE_URL ?? ""
const apiClient: AxiosInstance = axios.create({
    baseURL,
});

export default apiClient;