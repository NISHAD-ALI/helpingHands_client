import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import toast,{Toaster} from "react-hot-toast";
import { loginVolunteer } from "../../Api/volunteerApi";
import { setVolunteerData } from "../../Redux/Slices/Auth";


const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('n@gmail.com');
    const [password, setPassword] = useState<string>('Nishucp1!');

    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!emailPattern.test(email)) {
                const message = "Enter a valid email!";
                toast.error(message);
                return;
            } else if (password.trim().length < 5) {
                const message = "Password must contain at least 5 characters!";
                toast.error(message);
                return;
            }

            const response = await loginVolunteer(email, password);
            if (response && response.data && response.data.success) {
                dispatch(setVolunteerData(response.data.token));
                navigate('/volunteer/home');
                toast.success("Login successful!");
            } else {
                const message = response?.data.message;
                toast.error(message);
            }

        } catch (err: any) {
            console.error("Error:", err)
        }
    };
    return (
        <div className="flex min-h-screen">
            <div className="flex flex-col justify-center w-full max-w-md px-4 py-8 mx-auto sm:px-6 lg:px-8 lg:w-1/2">
                <div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Welcome Back <span role="img" aria-label="wave">👋</span>
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Today is a new day. It's your day. You shape it. Sign in to transfigure the world.
                    </p>
                </div>
                <div className="mt-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="mt-1">
                                <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full px-3 py-2 placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter your email" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="mt-1">
                                <input id="password" name="password" type="password" autoComplete="current-password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="w-full px-3 py-2 placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="At least 8 characters" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                        </div>
                        <div>
                            <button type="submit" className="w-full px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Sign in
                            </button>
                        </div>
                    </form>
                    <p className="mt-2 text-sm text-center text-gray-600 cursor-pointer">
                        Don't have an account?{" "}
                        <a onClick={() => navigate("/volunteer/signup")} className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</a>
                    </p>
                </div>
            </div>
            <div className="hidden lg:block lg:w-1/2 relative">
                <h1 className="absolute top-0 right-0 text-white text-3xl font-bold p-4">helpingHands</h1>
                <img className="object-cover w-full h-full" src="/public/josh-appel-0nkFvdcM-X4-unsplash.jpg" alt="Decorative" />
            </div>
            <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { width: '350px' } }} />
        </div>
    );
};

export default Login;