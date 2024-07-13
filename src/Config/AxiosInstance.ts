import axios, { AxiosInstance } from "axios";

const axiosInstance : AxiosInstance = axios.create({
    baseURL : "https://hisandhersfashion.shop",
    withCredentials : true
})

export default axiosInstance