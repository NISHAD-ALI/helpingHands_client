
import axiosInstance from "../Config/AxiosInstance";
import toast from "react-hot-toast";

export const signupCommunity = async (name: string, email: string, password: string, mobile: number) => {
    try {
        const formData = await axiosInstance.post('/community/signup', { name, email, password, mobile })
        console.log(formData + "nhj")
        const token = formData.data.token
        localStorage.setItem('commuOTPtoken', token)
        return formData
    } catch (error: any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message)
    }
}

export const verifyOtpCommunity = async (otp: string) => {
    try {
        let token = localStorage.getItem('commuOTPtoken')
        let response = await axiosInstance.post('/community/verifyOtp', { otp }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.data.success) {
            localStorage.removeItem('commuOTPtoken')
            console.log("hi")
        }
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message)
    }
}

export const loginCommunity = async (email: string, password: string) => {
    try {
        let response = await axiosInstance.post('/community/login', { email, password })
        console.log(response + "ytfyu")
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message)
    }
}

export const logoutCommunity = async () => {
    try {
        const response = await axiosInstance.get('/community/logout')
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const resendOtpCommunity = async () => {
    try {
        let token = localStorage.getItem('commuOTPtoken')
        const response = await axiosInstance.post('/community/resendOtp', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.data.success) {
            localStorage.setItem('commuOTPtoken', response.data.newToken)
        }
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message)
    }
}

export const createEvents = async (data: FormData) => {
    try {
        console.log(data);
        data.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        const response = await axiosInstance.post('/community/createEvents', data, { headers });
        return response;
    } catch (error: any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message)
    }
}

export const getEvents = async () => {
    try {
        let response = await axiosInstance.get('/community/getEvents')
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message)
    }
}
export const getEventsById = async (id: string) => {
    try {
        let response = await axiosInstance.get(`/community/getEventsById/${id}`);
        return response;
    } catch (error: any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
    }
};
export const deleteEvent = async (id: string) => {
    try {
        let response = await axiosInstance.get(`/community/deleteEvent/${id}`);
        return response;
    } catch (error: any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
    }
};
export const editEvent = async (id: string, formData: FormData) => {
    try {
        console.log("-----api----")
        console.log(formData)
        console.log("-----api----")
        const response = await axiosInstance.patch('/community/editEvent', { id, formData });
        return response;
    } catch (error: any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
    }
};
export const getProfile = async () => {
    try {
        let response = await axiosInstance.get('/community/profile')
        console.log(response+"res")
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}

export const editProfile = async(data :FormData) => {
    try {
        console.log(data+"111111")
        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        const response = await axiosInstance.patch('/community/editProfile', data, { headers });
        return response;
    } catch (error : any) {
        console.log(error.response.data.message);
    }
}

export const updateVolunteerStatus = async(id:string , is_accepted:boolean)=> {
    try {
        const response = await axiosInstance.patch('/community/updateStatus', {id,is_accepted});
        return response;
    } catch (error : any) {
        console.log(error.response.data.message);
    }
}
export const getVolunteers = async () => {
    try {
        let response = await axiosInstance.get('/community/getVolunteers')
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message)
    }
}