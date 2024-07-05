import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupCommunity } from '../../Api/communityApi';
import toast, { Toaster } from 'react-hot-toast';

const SignupPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: 'nishadalichenadan@gmail.com',
        communityName: 'Green corps',
        contactNumber: 8157055699,
        password: 'Nishucp1!',
        confirmPassword: 'Nishucp1!'
    });
    const navigate = useNavigate();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { email, communityName, contactNumber, password, confirmPassword } = formData;

        if (!email || !communityName || !contactNumber || !password || !confirmPassword) {
            toast.error("All fields are required.");
            return;
        }

        if (!emailPattern.test(email)) {
            toast.error("Invalid email format.");
            return;
        }

        if (!passwordPattern.test(password)) {
            toast.error("Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, and one number.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        if (!/^\d+$/.test(contactNumber.toString())) {
            toast.error("Contact number must contain only digits.");
            return;
        }

        try {
            const responseData = await signupCommunity(communityName, email, password, contactNumber);
            if (responseData?.data.success) {
                toast.success("Registration successful! Please check your email for the OTP.");
                setTimeout(() => {
                    navigate('/community/otp');
                  }, 2000);
                
            } else {
                toast.error(responseData?.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="flex justify-center items-center md:w-1/2 bg-white dark:bg-gray-900 flex-grow">
                <div className="text-center">
                    <h1 className="text-3xl font-bold md:text-4xl">Let's create a community</h1>
                    <p className="text-base md:text-base flex">Join us; together, we'll make the world better.</p>
                </div>
                <h1 className="absolute text-2xl top-10 left-10 font-bold text-black z-10">helpingHands</h1>
            </div>

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
                        <button type="submit" className="text-lg font-semibold bg-bluely w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black">Register</button>
                    </form>
                </div>
            </div>
            <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { width: '350px' } }} />
        </div>
    );
}

export default SignupPage;
