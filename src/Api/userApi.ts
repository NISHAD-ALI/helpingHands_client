import axiosInstance from "../Config/AxiosInstance";
import userEndpoints from "../Endpoints/userEndpoints";



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

export const editProfile = async (data: FormData) => {
    try {
        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        const response = await axiosInstance.patch(userEndpoints.editProfile, data, { headers });
        return response;
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}

export const googleAuth = async (name: string, email: string, password: string) => {
    try {
        const response = await axiosInstance.post(userEndpoints.googleAuth, { name, email, password })
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}
export const payment = async (amount: number, donationId: string) => {
    try {
        const response = await axiosInstance.post('/payment', { amount, donationId });
        return response.data;
    } catch (error: any) {
        console.error('Payment error:', error.response.data.message);
    }
};

export const createPost = async (formData: FormData) => {
    try {
        const headers = {
            'Content-Type': 'multipart/form-data'
        };

        const response = await axiosInstance.post('/createPost', formData, { headers });
        return response;
    } catch (error: any) {
        console.log(error.response?.data?.message || 'Error creating post');
    }
};
export const editPost = async (formData: FormData) => {
    try {
        const headers = {
            'Content-Type': 'multipart/form-data'
        };

        const response = await axiosInstance.patch('/editPost', formData, { headers });
        return response;
    } catch (error: any) {
        console.log(error.response?.data?.message || 'Error editing post');
    }
};

export const getPostsOne = async () => {
    try {
        let response = await axiosInstance.get('/getPostsOne')
        console.log(response + "in here")
        return response.data
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}
export const getAllPosts = async () => {
    try {
        let response = await axiosInstance.get('/getAllPosts')
        console.log(response)
        return response.data
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}
export const getUserById = async () => {
    try {
        let response = await axiosInstance.get('/getUserById')
        console.log(response)
        return response.data
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}
export const deletePost = async (id: string) => {
    try {
        let response = await axiosInstance.get(`/deletePost/${id}`);
        return response;
    } catch (error: any) {
        console.log(error.response.data.message);

    }
};
export const likePost = async (id: string) => {
    try {
        let response = await axiosInstance.post(`/likePost/${id}`);
        return response;
    } catch (error: any) {
        console.log(error.response.data.message);

    }
};

export const isLiked = async (id: string) => {
    try {
        console.log(id, "jj")
        let response = await axiosInstance.get(`/isLiked/${id}`);
        return response;
    } catch (error: any) {
        console.log(error.response.data.message);

    }
};
export const addComment = async (id: string, message: string) => {
    try {
        console.log(id, "jj")
        let response = await axiosInstance.post(`/addComment/${id}`, { message });
        return response;
    } catch (error: any) {
        console.log(error.response.data.message);

    }
};
export const getComments = async (id: string) => {
    try {
        let response = await axiosInstance.get(`/getComments/${id}`)
        console.log(response + "^^^")
        return response.data
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}
export const reportPost = async (postId: string, message: string) => {
    try {
        let response = await axiosInstance.post('/reportPost', { postId, message });
        return response;
    } catch (error: any) {
        console.log(error.response.data.message);

    }
};
export const savePost = async (post: any) => {
    try {
        let response = await axiosInstance.post('/savePost', { post });
        return response;
    } catch (error: any) {
        console.log(error.response.data.message);

    }
};
export const getSavedPosts = async () => {
    try {
        let response = await axiosInstance.get('/getSavedPosts');
        return response;
    } catch (error: any) {
        console.log(error.response.data.message);

    }
};