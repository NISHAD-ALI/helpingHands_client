import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../Api/userApi';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../Redux/Slices/Auth';
import toast, { Toaster } from 'react-hot-toast';
import GoogleAuthentication from '../Common/GoogleAuthentication';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('n@gmail.com');
    const [password, setPassword] = useState<string>('Nishucp1!');
    const [error, setError] = useState<string>('');

    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
                const message = response.data.message;
                setError(message);
            }

        } catch (err: any) {
            const message = err.message || "An error occurred. Please try again.";
            console.error("Error:", err);
            setError(message);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="flex justify-center h-screen">
                <div className="flex items-center justify-between">
                    <h1 className="absolute top-10 left-10 font-bold text-white z-10">helpingHands</h1>
                    <div>
                        <span className="absolute top-10 right-20 text-gray-700 text-sm cursor-pointer" onClick={() => navigate('/community/login')}>Community Admin? Signin</span>
                        <span className="absolute top-5 right-20 text-gray-700 text-sm cursor-pointer" onClick={() => navigate('/volunteer/login')}>Volunteer? SignIn</span>
                    </div>
                </div>

                <div className="hidden lg:block lg:w-1/2" style={{ backgroundImage: "url(./public/shane-rounce-DNkoNXQti3c-unsplash.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}>
                    <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                        <div>
                            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-100 to-emerald-100 text-transparent bg-clip-text">"Connecting Communities, Empowering Lives."</h2>
                        </div>
                    </div>
                </div>

                <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                    <div className="flex-1">
                        <div className="mt-8">
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="email" className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600">
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Email"
                                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">Email</span>
                                    <span className="absolute start-0 top-full -translate-y-1 text-xs text-red-500">{error && !emailPattern.test(email) && error}</span>
                                </label>

                                <div className="mt-6">
                                    <label htmlFor="password" className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600">
                                        <input
                                            type="password"
                                            id="password"
                                            placeholder="Password"
                                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">Password</span>
                                        <span className="absolute start-0 top-full -translate-y-1 text-xs text-red-500">{error && password.trim().length < 5 && error}</span>
                                    </label>
                                </div>

                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:border-teal-500 focus:outline-none"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </form>
                            <div className="mt-6 flex items-center justify-center">
                                <GoogleAuthentication Login={true} />
                            </div>
                            <p className="mt-6 text-sm text-center text-gray-500">Forgot Password? <span className="text-gray-700 cursor-pointer" onClick={() => navigate('/forgetPassword')}>Click Here</span></p>
                            <p className="mt-2 text-sm text-center text-gray-500">Don't have an account yet? <span className="text-gray-700 cursor-pointer" onClick={() => navigate('/signup')}>Sign up</span></p>
                        </div>
                    </div>

                    </div>
            </div>
            <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { width: '350px' } }} />
        </div>
    );
};

export default Login;

