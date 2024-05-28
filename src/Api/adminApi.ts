import axiosInstance from "../Config/AxiosInstance";
import toast from "react-hot-toast";

axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response.data.message+"interceptor");
      toast.error(error.response.data.message);
      return Promise.reject(error);
    }
  );

export const loginAdmin = async (email: string, password: string) => {
    try {
        let response = await axiosInstance.post('/admin/login', { email, password })
        console.log(response + "<-response")
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}

export const getCommunities = async() =>{
    try {
        let response = await axiosInstance.get('/admin/getCommunities')
        return response
    } catch (error : any) {
        console.log(error.response.data.message);
    }
}
