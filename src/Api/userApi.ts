import axiosInstance from "../Config/AxiosInstance";
import toast from "react-hot-toast";

export const signup = async (name: string, email: string, password: string, phone: number) => {
    try {
        const formData = await axiosInstance.post('/signup', { name, email, password, phone })
        console.log(formData + "nhj")
        const token = formData.data.token
        localStorage.setItem('userTokenOtp', token)
        return formData
    } catch (error: any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message)
    }
}

export const verifyOtp = async (otp: string) => {
    try {
        let token = localStorage.getItem('userTokenOtp')
        let response = await axiosInstance.post('/verifyOtp', { otp }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.data.success) {
            localStorage.removeItem('userTokenOtp')
            console.log("hi")
        }
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message)
    }
}

export const login = async (email: string, password: string) => {
    try {
        let response = await axiosInstance.post('/login', { email, password })
        console.log(response + "<-response")
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message)
    }
}

export const logout = async () => {
    try {
        const response = await axiosInstance.get('/logout')
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const resendOtp = async () => {
    try {
        let token = localStorage.getItem('userTokenOtp')
        const response = await axiosInstance.post('/resendOtp', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.data.success) {
            localStorage.setItem('userTokenOtp', response.data.newToken)
        }
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message)
    }
}

export const forgotPassword = async (email: string) => {
    try {
        let response = await axiosInstance.post('/forgotPassword', { email })
        localStorage.setItem('userForgotPassword', response.data.token)
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message)
    }
}

export const verifyOtpForgotPassword = async (otp: string) => {
    try {
        let token = localStorage.getItem('userForgotPassword')
        let response = await axiosInstance.post('/forgotPassOtpVerify', { otp }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message)
    }
}
export const changePassword = async (password: string) => {
    try {
        let token = localStorage.getItem('userForgotPassword')
        const response = await axiosInstance.post('/changePassword', { password }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.data.success) {
            localStorage.removeItem('userForgotPassword');
        }
        return response;
    } catch (error: any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message)
    }
}

export const getProfile = async () => {
    try {
        let response = await axiosInstance.get('/profile')
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message)
    }
}

export const editProfile = async(data :FormData) => {
    try {
        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        const response = await axiosInstance.patch('/editProfile', data, { headers });
        return response;
    } catch (error : any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message)
    }
}

export const googleAuth = async(name:string,email:string,password:string) => {
    try {
        const response = await axiosInstance.post('/googleAuth',{name,email,password})
        return response
    } catch (error :any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message)
    }
}

