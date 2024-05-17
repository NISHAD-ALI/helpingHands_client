import React, { useState } from 'react';
import { forgotPassword } from '../../Api/userApi';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {

            event.preventDefault();
            if (!emailPattern.test(email)) {
                setError("Enter a valid email!");
                return
              }
            let responseData = await forgotPassword(email);
            if (responseData.data.success) {
                console.log("kk")
                navigate('/forgetPassOtp')
            } else {
                setError(responseData.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    return (
        <div className="bg-gray-100 flex flex-col items-center justify-center h-screen w-full dark:bg-gray-900">
            <h1 className="absolute text-2xl top-10 left-10 font-bold text-black z-10">helpingHands</h1>
            <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-md dark:bg-gray-950 dark:text-gray-200">
                <h1 className="text-2xl font-semibold text-center mb-6">Forgot Password</h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleChange}
                        className="rounded-lg bg-gray-100 cursor-text dark:bg-gray-800 w-full py-2 px-4 mb-4"
                    />
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <button type='submit' className="text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;
