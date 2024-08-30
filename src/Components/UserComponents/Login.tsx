import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../Api/userApi';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../Redux/Slices/Auth';
import toast, { Toaster } from 'react-hot-toast';
import GoogleAuthentication from '../Common/GoogleAuthentication';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        try {
            if (!emailPattern.test(email)) {
                const message = "Enter a valid email!";
                setError(message);
                toast.error(message);
                return;
            } else if (password.trim().length < 5) {
                const message = "Password must contain at least 5 characters!";
                setError(message);
                toast.error(message);
                return;
            }

            const response = await login(email, password);
            if (response && response.data && response.data.success) {
                dispatch(setUserData(response.data.token));
                navigate('/');
                toast.success("Login successful!");
            } else {
                const message = response?.data.message;
                setError(message);
            }

        } catch (err: any) {
            const message = err.message || "An error occurred. Please try again.";
            console.error("Error:", err);
            setError(message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-300 dark:bg-gray-900">
            <div className="flex flex-col lg:flex-row w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
                <div
                    className="hidden lg:block lg:w-1/2 bg-cover bg-center"
                    style={{ backgroundImage: "url(../shane-rounce-DNkoNXQti3c-unsplash.jpg)" }}
                >
                    <div className="flex items-center justify-center h-full bg-gray-900 bg-opacity-50">
                        <h2 className="text-3xl font-bold text-white px-8 text-center">
                            "Connecting Communities, Empowering Lives."
                        </h2>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 p-8 bg-white dark:bg-gray-800">
                    <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200 text-center mb-6">helpingHands</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <label htmlFor="email" className="text-gray-700 dark:text-gray-200">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:border-blue-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {error && !emailPattern.test(email) && (
                                <span className="text-xs text-red-500 absolute mt-1">{error}</span>
                            )}
                        </div>

                        <div className="relative">
                            <label htmlFor="password" className="text-gray-700 dark:text-gray-200">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:border-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {error && password.trim().length < 5 && (
                                <span className="text-xs text-red-500 absolute mt-1">{error}</span>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 mt-4 bg-gray-800 text-white rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="mt-6 flex items-center justify-center">
                        <GoogleAuthentication Login={true} />
                    </div>

                    <div className="mt-4 text-center space-y-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Forgot your password?{' '}
                            <span
                                className="text-blue-500 hover:underline cursor-pointer"
                                onClick={() => navigate('/forgetPassword')}
                            >
                                Click here
                            </span>
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Don't have an account?{' '}
                            <span
                                className="text-blue-500 hover:underline cursor-pointer"
                                onClick={() => navigate('/signup')}
                            >
                                Sign up
                            </span>
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Community Admin?{' '}
                            <span
                                className="text-blue-500 hover:underline cursor-pointer"
                                onClick={() => navigate('/community/login')}
                            >
                                Sign in
                            </span>
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Volunteer?{' '}
                            <span
                                className="text-blue-500 hover:underline cursor-pointer"
                                onClick={() => navigate('/volunteer/login')}
                            >
                                Sign in
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { width: '350px' } }} />
        </div>
    );
};

export default Login;
