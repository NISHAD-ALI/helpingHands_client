import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="h-screen bg-gray-200 py-20 p-4 md:p-20 lg:p-32 flex justify-center items-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Login</h1>
      <div className="w-2/4 bg-white rounded-lg overflow-hidden shadow-lg ml-12">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
          <p className="text-gray-700 mb-6">Please sign in to your account</p>
          <form>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign In
              </button>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
