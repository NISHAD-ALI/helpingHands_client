import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        communityName: '',
        contactNumber: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (!passwordPattern.test(formData.password)) {
                setError("Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number.");
                return;
            }

            if (formData.password !== formData.confirmPassword) {
                setError("Passwords do not match.");
                return;
            }

            const responseData = await registerCommunity(formData);
            if (responseData.success) {
                // Redirect to success page or login page
                navigate('/login');
            } else {
                setError(responseData.message);
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
                    <h1 className="text-3xl font-bold md:text-4xl">Let's create a community</h1>
                    <p className="text-base md:text-base flex">Join us; together, we'll make the world better.</p>
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
                            type="text"
                            placeholder="Community Name"
                            name="communityName"
                            value={formData.communityName}
                            onChange={handleChange}
                            className="rounded-lg bg-gray-100 cursor-text dark:bg-gray-800 w-full py-3 px-4 mb-4"
                        />
                        <input
                            type="text"
                            placeholder="Contact Number"
                            name="contactNumber"
                            value={formData.contactNumber}
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
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="rounded-lg bg-gray-100 cursor-text dark:bg-gray-800 w-full py-3 px-4 mb-4"
                        />
                        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                        <button type="submit" className="text-lg font-semibold bg-bluely w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
