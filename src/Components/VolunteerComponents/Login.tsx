import React from "react";

const Login: React.FC = () => {
    return (
        <div className="h-screen flex">
            <div className="relative flex w-1/2 justify-around items-center bg-cover bg-center bg-no-repeat " style={{ backgroundImage: "url(/josh-appel-0nkFvdcM-X4-unsplash.jpg)" }}>
                <div className="absolute inset-0 bg-black opacity-25"></div>
                <div className="absolute top-0 left-0 p-8">
                    <h1 className="text-white font-bold text-3xl font-sans">helpingHands</h1>

                </div>
            </div>
            <div className="flex w-1/2 justify-center items-center bg-custom">
                <form className="bg-custom">
                    <h1 className="text-white font-bold text-2xl mb-1">Hello Again!</h1>
                    <p className="text-sm font-normal text-white mb-7">Welcome Back</p>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <input className="pl-2 outline-none border-none bg-custom text-white" type="email" name="" id="" placeholder="Email Address" />
                    </div>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <input className="pl-2 outline-none border-none bg-custom text-white" type="password" name="" id="" placeholder="Password" />
                    </div>
                    <button type="submit" className="block w-full bg-pinky mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Login</button>
                    <span className="text-sm ml-2 text-white">Forgot Password ?</span>
                    <span className="text-sm font-semibold ml-14 text-pinky">Register </span>
                </form>

            </div>
        </div>
    );
};

export default Login;
