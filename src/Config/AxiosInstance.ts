import axios, { AxiosInstance } from "axios";

const axiosInstance : AxiosInstance = axios.create({
    baseURL : "http://localhost:3000",
    withCredentials : true
})

export default axiosInstance