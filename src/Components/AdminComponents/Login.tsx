import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAdmin } from '../../Api/adminApi';
import { setAdminData } from '../../Redux/Slices/Auth';
const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('nishadalichenadan@gmail.com');
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

      const response = await loginAdmin(email, password);
      if (response && response.data && response.data.success) {
        dispatch(setAdminData(response.data.token));
        navigate('/admin/dashboard');
        toast.success("Login successful!");
      } else {
        const message = response.data.message;
        toast.error(message);
      }

    } catch (err: any) {
      const message = err.message || "An error occurred. Please try again.";
      console.error("Error:", message)
            // toast.error(message);
        }
  };
  return (
    <div className="h-screen bg-gray-200 py-20 p-4 md:p-20 lg:p-32 flex justify-center items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Login</h1>
      <div className="w-2/4 bg-white rounded-lg overflow-hidden shadow-lg ml-12">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
          <p className="text-gray-700 mb-6">Please sign in to your account</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign In
              </button>

            </div>
          </form>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { width: '350px' } }} />
    </div>
  );
}

export default Login;
