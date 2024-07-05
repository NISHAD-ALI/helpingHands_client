import React, { useEffect, useState } from 'react';
import { verifyOtp, resendOtp } from '../../Api/userApi';
import { useDispatch } from 'react-redux';
import { setCommunityData, setUserData, setVolunteerData } from '../../Redux/Slices/Auth';
import { useNavigate } from 'react-router-dom';
import Ioperator from '../../Interface/Ioperator';
import { verifyOtpCommunity } from '../../Api/communityApi';
import toast, { Toaster } from 'react-hot-toast';
import { verifyOtpVolunteer } from '../../Api/volunteerApi';

const OtpPage: React.FC<Ioperator> = ({ operator }) => {
    const [otp, setOtp] = useState({
        digitOne: "",
        digitTwo: "",
        digitThree: "",
        digitFour: "",
        digitFive: ""
    });

    const [timer, setTimer] = useState(60);
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const dispatch = useDispatch();
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
        try {
            await resendOtp();
            setTimer(60);
            setIsTimerRunning(true);
            toast.success("OTP Resent Successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to resend OTP. Please try again.");
        }
    };

    const handleSubmit = async () => {
        const compOtp = Object.values(otp).join("");
        if (compOtp.length !== 5) {
            toast.error("Please enter a complete 5-digit OTP.");
            return;
        }
        try {
            let responseData;
            if (operator === 'user') {
                responseData = await verifyOtp(compOtp);
            } else if (operator === 'community') {
                responseData = await verifyOtpCommunity(compOtp);
            }else{
                responseData = await verifyOtpVolunteer(compOtp);
            }

            if (responseData && responseData.data) {
                if (operator === 'user') {
                    dispatch(setUserData(responseData.data.token));
                    toast.success("OTP Verified Successfully!");
                    setTimeout(() => {
                        navigate('/');
                      }, 2000);
                } else if (operator === 'community') {
                    dispatch(setCommunityData(responseData.data.token));
                    toast.success("OTP Verified Successfully!");
                    setTimeout(() => {
                        navigate('/community/home');
                      }, 2000);
                }else{
                    dispatch(setVolunteerData(responseData.data.token));
                    toast.success("OTP Verified Successfully!");
                    setTimeout(() => {
                        navigate('/volunteer/home');
                      }, 2000);

                }
                
                
            } else {
                toast.error("Failed to verify OTP. Please try again.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again.");
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
            <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { width: '350px' } }} />
        </div>
    );
}

export default OtpPage;
