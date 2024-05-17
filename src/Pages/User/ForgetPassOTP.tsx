import React, { useEffect, useState } from 'react';
import { verifyOtpForgotPassword, resendOtp } from '../../Api/userApi';
import { useNavigate } from 'react-router-dom';

const ForgetPassOtp: React.FC = () => {
    const [otp, setOtp] = useState({
        digitOne: "",
        digitTwo: "",
        digitThree: "",
        digitFour: "",
        digitFive: ""
    });

    const [error, setError] = useState<string>('');
    const [timer, setTimer] = useState(60);
    const [isTimerRunning, setIsTimerRunning] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (isTimerRunning && timer > 0) {
            const timerId = setTimeout(() => setTimer(prevTimer => prevTimer - 1), 1000);
            return () => clearTimeout(timerId);
        } else if (timer === 0) {
            setIsTimerRunning(false);
        }
    }, [isTimerRunning, timer]);

    const handleResendOtp = async () => {
        await resendOtp();
        setTimer(60);
        setIsTimerRunning(true);
        setError('');
    };

    const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
        try {
            event.preventDefault();
            let compOtp = Object.values(otp).join("");
            let responseData = await verifyOtpForgotPassword(compOtp);
            if (responseData.data) {
                navigate('/changePassword');
            } else {
                setError(responseData.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (/^\d*$/.test(value) && value.length <= 1) {
            setOtp(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    return (
        <div className="bg-gray-100 flex flex-col items-center justify-center h-screen w-full dark:bg-gray-900">
            <h1 className="absolute text-2xl top-10 left-10 font-bold  text-black z-10">helpingHands</h1>
            <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-md dark:bg-gray-950 dark:text-gray-200">
                <h1 className="text-2xl font-semibold text-center mb-6">Enter OTP</h1>
                <p className="text-gray-600 text-center mb-4">Please check your Inbox for OTP</p>
                <p className="text-center m-2">Resend OTP in {timer} seconds</p>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <div className="grid grid-cols-5 gap-x-4 my-2">
                    {Object.keys(otp).map((key, index) => (
                        <input
                            key={index}
                            type="text"
                            name={key}
                            value={otp[key as keyof typeof otp]}
                            onChange={handleChange}
                            maxLength={1}
                            className="rounded-lg bg-gray-100 cursor-text dark:bg-gray-800 w-14 aspect-square flex items-center justify-center text-center"
                        />
                    ))}
                </div>
                {timer === 0 ? (
                    <button type='button' onClick={handleResendOtp} className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black">Resend OTP</button>
                ) : (
                    <button type='button' onClick={handleSubmit} className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black">Verify</button>
                )}
            </div>
        </div>
    );
}

export default ForgetPassOtp;
