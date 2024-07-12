import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginCommunity } from '../../Api/communityApi';
import { setCommunityData } from '../../Redux/Slices/Auth';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password } = formData;
        try {
            const responseData = await loginCommunity(email, password);
            if (responseData && responseData.data && responseData.data.success) {
                dispatch(setCommunityData(responseData.data.token));
                toast.success('Successfully logged in!');
                setTimeout(() => {
                    navigate('/community/home');
                }, 10000);
            } else {
                console.error(responseData?.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">

            <div className="flex justify-center items-center md:w-1/2 bg-black bg-opacity-60 dark:bg-gray-900 flex-grow">
                <div className="text-center">
                    <h1 className="text-3xl font-poppins text-white font-semibold md:text-4xl">Sign in to your community</h1>
                    <p className="text-base font-poppins text-white font-medium m-3 md:text-base flex">
                        Register Your Community here
                        <span className="text-blue-800 font-medium ml-3 cursor-pointer" onClick={() => navigate('/community/signup')}>Register</span>
                    </p>
                </div>
                <h1 className="absolute text-2xl top-10 left-10 font-bold text-white z-10">helpingHands</h1>
            </div>
 
            <div className="flex justify-center items-center md:w-1/2 bg-black bg-opacity-60">
                <div className="w-full max-w-md px-8 py-10 bg-transparent rounded-lg shadow-md dark:bg-gray-950 dark:text-gray-200">
                    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="rounded-lg bg-white bg-opacity-50 cursor-text dark:bg-gray-800 w-full py-3 px-4 mb-4"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="rounded-lg bg-white bg-opacity-50 cursor-text dark:bg-gray-800 w-full py-3 px-4 mb-4"
                        />
                        <button type="submit" className="text-lg font-semibold bg-blue-600 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black">
                            Login
                        </button>
                    </form>
                </div>
            </div>
            <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { width: '350px' } }} />
        </div>
    );
}

export default Login;
