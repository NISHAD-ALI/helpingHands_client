import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginCommunity } from '../../Api/communityApi';
import { setCommunityData } from '../../Redux/Slices/Auth';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

const Login: React.FC = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                }, 1000); 
            } else {
                toast.error(responseData?.data.message || 'Login failed.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-full w-full">
            <div className="flex flex-col justify-center items-center md:w-1/2 bg-black bg-opacity-60 text-center p-6">
                <h1 className="text-4xl font-extrabold font-inter text-white mb-4 md:text-4xl">Sign in to your community</h1>
                <p className="text-base text-white mb-4">
                    Don't have an account? <span className="text-blue-400 cursor-pointer" onClick={() => navigate('/community/signup')}>Register</span>
                </p>
                <h1 className="absolute top-4 left-4 text-2xl font-bold text-white">helpingHands</h1>
            </div>
            <div className="flex justify-center items-center md:w-1/2 bg-black bg-opacity-60 p-6">
                <div className="w-full max-w-md text-gray-200 rounded-lg shadow-lg">
                    <form onSubmit={handleSubmit} className="p-8">
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-gray-700 text-white rounded-lg py-3 px-4 mb-4"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-gray-700 text-white rounded-lg py-3 px-4 mb-4"
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white rounded-lg py-3 px-4 hover:bg-blue-700 transition-colors"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
            <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { width: '350px' } }} />
        </div>
    );
};

export default Login;
