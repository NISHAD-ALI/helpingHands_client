import axiosInstance from "../Config/AxiosInstance";
import toast from "react-hot-toast";
import userEndpoints from "../Endpoints/userEndpoints";
import { useNavigate } from "react-router-dom";

export const useCustomAxiosInterceptors = () => {
  const navigate = useNavigate();

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('userToken');
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
      console.log(error.response.data.message + "interceptor");
      toast.error(error.response.data.message);
      navigate('/error'); 
      return Promise.reject(error);
    }
  );
};


export const signup = async (name: string, email: string, password: string, phone: number) => {
    try {
        const formData = await axiosInstance.post(userEndpoints.signup, { name, email, password, phone })
        console.log(formData + "nhj")
        const token = formData.data.token
        localStorage.setItem('userTokenOtp', token)
        return formData
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}

export const verifyOtp = async (otp: string) => {
    try {
        let token = localStorage.getItem('userTokenOtp')
        let response = await axiosInstance.post(userEndpoints.verifyOtp, { otp }, {
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
    }
}

export const login = async (email: string, password: string) => {
    try {
        let response = await axiosInstance.post(userEndpoints.login, { email, password })
        console.log(response + "<-response")
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}

export const logout = async () => {
    try {
        const response = await axiosInstance.get(userEndpoints.logout)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const resendOtp = async () => {
    try {
        let token = localStorage.getItem('userTokenOtp')
        const response = await axiosInstance.post(userEndpoints.resendOtp, {}, {
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
    }
}

export const forgotPassword = async (email: string) => {
    try {
        let response = await axiosInstance.post(userEndpoints.forgotPassword, { email })
        localStorage.setItem('userForgotPassword', response.data.token)
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}

export const verifyOtpForgotPassword = async (otp: string) => {
    try {
        let token = localStorage.getItem('userForgotPassword')
        let response = await axiosInstance.post(userEndpoints.verifyForgotPassword, { otp }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}
export const changePassword = async (password: string) => {
    try {
        let token = localStorage.getItem('userForgotPassword')
        const response = await axiosInstance.post(userEndpoints.changePassword, { password }, {
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

export const getProfile = async () => {
    try {
        let response = await axiosInstance.get(userEndpoints.profile)
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}

export const editProfile = async(data :FormData) => {
    try {
        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        const response = await axiosInstance.patch(userEndpoints.editProfile, data, { headers });
        return response;
    } catch (error : any) {
        console.log(error.response.data.message);
    }
}

export const googleAuth = async(name:string,email:string,password:string) => {
    try {
        const response = await axiosInstance.post(userEndpoints.googleAuth,{name,email,password})
        return response
    } catch (error :any) {
        console.log(error.response.data.message);
    }
}

