import axiosInstance from "../Config/AxiosInstance";

export const signupCommunity = async (name: string, email: string, password: string, mobile: number) => {
    try {
        const formData = await axiosInstance.post('/community/signup', { name, email, password, mobile })
        console.log(formData + "nhj")
        const token = formData.data.token
        localStorage.setItem('commuOTPtoken', token)
        return formData
    } catch (error: any) {
        console.log(error.response.data.message);
        throw error.response.data.message;
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
        throw error.response.data.message;
    }
}

export const loginCommunity = async (email: string, password: string) => {
    try {
        let response = await axiosInstance.post('/community/login', { email, password })
        console.log(response + "ytfyu")
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
        throw error.response.data.message;
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
        throw error.response.data.message;
    }
}