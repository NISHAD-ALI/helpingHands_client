import React, { useState } from 'react';
import { changePassword } from '../../Api/userApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ChangePasswordPage: React.FC = () => {
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const navigate = useNavigate();
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (!passwordPattern.test(newPassword)) {
                throw new Error("Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number.");
            }

            if (newPassword !== confirmPassword) {
                throw new Error("Passwords do not match.");
            }

            const responseData = await changePassword(newPassword);
            if (responseData.data.success) {
                toast.success("Password changed successfully!");
                navigate('/login');
            } else {
                throw new Error(responseData.data.message);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    return (
        <div className="bg-gray-100 flex flex-col items-center justify-center h-screen w-full dark:bg-gray-900">
            <h1 className="absolute text-2xl top-10 left-10 font-bold text-black z-10">helpingHands</h1>
            <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-md dark:bg-gray-950 dark:text-gray-200">
                <h1 className="text-2xl font-semibold text-center mb-6">Change Password</h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        className="rounded-lg bg-gray-100 cursor-text dark:bg-gray-800 w-full py-2 px-4 mb-4"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        className="rounded-lg bg-gray-100 cursor-text dark:bg-gray-800 w-full py-2 px-4 mb-4"
                    />
                    <button type='submit' className="text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default ChangePasswordPage;
