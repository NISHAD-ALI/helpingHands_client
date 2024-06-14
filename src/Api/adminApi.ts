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
export const getUsers = async() =>{
    try {
        let response = await axiosInstance.get('/admin/getUsers')
        return response
    } catch (error : any) {
        console.log(error.response.data.message);
    }
}
export const blockUser = async (id: string) => {
    try {
        let res = await axiosInstance.post(`/admin/blockUser/${id}`);
        return res;
    } catch (error : any) {
        console.log(error.response.data.message);
    }
}
export const logoutAdmin = async () => {
    try {
        const response = await axiosInstance.get('/admin/logout')
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}
export const createDonation = async (data: FormData) => {
    try {
        console.log(data);
        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        const response = await axiosInstance.post('/admin/createDonation', data, { headers });
        return response;
    } catch (error: any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message)
    }
}
export const getDonations = async() =>{
    try {
        let response = await axiosInstance.get('/admin/getDonations')
        return response
    } catch (error : any) {
        console.log(error.response.data.message);
    }
}