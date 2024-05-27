import axiosInstance from "../Config/AxiosInstance";
import toast from "react-hot-toast";

axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('volunteerOtpToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
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


export const signupVolunteer = async (name: string, email: string, password: string, phone: number) => {
    try {
        const formData = await axiosInstance.post('/volunteer/signup', { name, email, password, phone })
        console.log(formData)
        const token = formData.data.token
        localStorage.setItem('volunteerOtpToken', token)
        return formData
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}

export const verifyOtpVolunteer = async (otp: string) => {
    try {
        let token = localStorage.getItem('volunteerOtpToken')
        let response = await axiosInstance.post('/volunteer/verifyOtp', { otp }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.data.success) {
            localStorage.removeItem('volunteerOtpToken')
            console.log("hi")
        }
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}

export const loginVolunteer = async (email: string, password: string) => {
    try {
        let response = await axiosInstance.post('/volunteer/login', { email, password })
        console.log(response + "<-response")
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}

export const logoutVolunteer = async () => {
    try {
        const response = await axiosInstance.get('/volunteer/logout')
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const resendOtpVolunteer = async () => {
    try {
        let token = localStorage.getItem('volunteerOtpToken')
        const response = await axiosInstance.post('/volunteer/resendOtp', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.data.success) {
            localStorage.setItem('volunteerOtpToken', response.data.newToken)
        }
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}

export const forgotPasswordVolunteer = async (email: string) => {
    try {
        let response = await axiosInstance.post('/volunteer/forgotPassword', { email })
        localStorage.setItem('userForgotPassword', response.data.token)
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}

export const verifyOtpForgotPasswordVolunteer = async (otp: string) => {
    try {
        let token = localStorage.getItem('userForgotPassword')
        let response = await axiosInstance.post('/volunteer/forgotPassOtpVerify', { otp }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}
export const changePasswordVolunteer = async (password: string) => {
    try {
        let token = localStorage.getItem('userForgotPassword')
        const response = await axiosInstance.post('/volunteer/changePassword', { password }, {
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
    }
}

export const getProfileVolunteer = async () => {
    try {
        let response = await axiosInstance.get('/volunteer/profile')
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}

export const editProfileVolunteer = async(data :FormData) => {
    try {
        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        const response = await axiosInstance.patch('/volunteer/editProfile', data, { headers });
        return response;
    } catch (error : any) {
        console.log(error.response.data.message);
    }
}

