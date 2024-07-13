import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import {  signupVolunteer } from '../../Api/volunteerApi';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: 0,
    password: '',
    confirmPassword: ''
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

    const { email, name, phone, password, confirmPassword } = formData;

    if (!email || !name || !phone || !password || !confirmPassword) {
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

    if (!/^\d+$/.test(phone as any)) {
      toast.error("Contact number must contain only digits.");
      return;
    }

    try {
      const responseData = await signupVolunteer(name, email, password, phone);
      if (responseData?.data.success) {
        toast.success("Registration successful! Please check your email for the OTP.");
        console.log("success");
        navigate('/volunteer/verifyOtp');
      } else {
        toast.error(responseData?.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col justify-center w-full max-w-md px-4 py-8 mx-auto sm:px-6 lg:px-8 lg:w-1/2">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join us to start managing your projects.
          </p>
        </div>
        <div className="mt-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={handleChange}
                  value={formData.name}
                  className="w-full px-3 py-2 placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Name"
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Contact Number</label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  onChange={handleChange}
                  value={formData.phone}
                  className="w-full px-3 py-2 placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Contact Number"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  value={formData.email}
                  autoComplete="email"
                  className="w-full px-3 py-2 placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Example@email.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={formData.password}
                  autoComplete="new-password"
                  className="w-full px-3 py-2 placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="At least 8 characters"
                />
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  onChange={handleChange}
                  value={formData.confirmPassword}
                  className="w-full px-3 py-2 placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Confirm your password"
                />
              </div>
            </div>
            <div>
              <button type="submit" className="w-full px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign up
              </button>
            </div>
          </form>
         
          <p className="mt-2 text-sm text-center text-gray-600">
            Already have an account? <span onClick={() => navigate('/volunteer/login')} className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">Sign in</span>
          </p>
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2">
        <img className="object-cover w-full h-full" src="../josh-appel-0nkFvdcM-X4-unsplash.jpg" alt="Decorative" />
      </div>
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { width: '350px' } }} />
    </div>
  );
};

export default Signup;
