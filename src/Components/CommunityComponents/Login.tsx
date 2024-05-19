import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginCommunity } from '../../Api/communityApi';
import { setCommunityData } from '../../Redux/Slices/Auth';
import { useDispatch } from 'react-redux';

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string>('');
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
        const {email,password} = formData
        try {
          const responseData = await loginCommunity(email,password)
          if (responseData && responseData.data && responseData.data.success) {
            dispatch(setCommunityData(responseData.data.token));
              navigate('/community/');
        } else {
            setError(responseData.data.message);
        }
        } catch (error) {
            console.log(error);
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* Left Side */}
            <div className="flex justify-center items-center md:w-1/2 bg-white dark:bg-gray-900 flex-grow">
                <div className="text-center">
                    <h1 className="text-3xl font-poppins font-semibold md:text-4xl">Sign in to your community</h1>
                    <p className="text-base font-poppins font-medium m-3 md:text-base flex">Register Your Community here <span className="text-blue-500 ml-3 cursor-pointer" onClick={() => navigate('/community/signup')}>Register</span></p>

                </div>
                <h1 className="absolute text-2xl top-10 left-10 font-bold text-black z-10">helpingHands</h1>
            </div>
            {/* Right Side */}
            <div className="flex justify-center items-center md:w-1/2 bg-white">
                <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-md dark:bg-gray-950 dark:text-gray-200">
                    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="rounded-lg bg-gray-100 cursor-text dark:bg-gray-800 w-full py-3 px-4 mb-4"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="rounded-lg bg-gray-100 cursor-text dark:bg-gray-800 w-full py-3 px-4 mb-4"
                        />
                        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                        <button type="submit" className="text-lg font-semibold bg-bluely w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
