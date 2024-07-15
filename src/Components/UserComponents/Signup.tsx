import { useState } from 'react';
import { signup } from '../../Api/userApi';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import GoogleAuthentication from '../Common/GoogleAuthentication';

const Signup = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const phoneNumberRegex = /^[0-9]{10}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newErrors: { [key: string]: string } = {};
      if (username.length < 3) {
        newErrors.username = "Name must contain at least 3 letters";
        toast.error(newErrors.username);
      }
      if (!emailRegex.test(email)) {
        newErrors.email = "Invalid email format";
        toast.error(newErrors.email);
      }
      if (!passwordRegex.test(password)) {
        newErrors.password = "Password must be 8 characters long and include at least one uppercase letter, one lowercase letter, one special character, and one number.";
        toast.error(newErrors.password);
      }
      if (password !== passwordConfirm) {
        newErrors.passwordConfirm = "Passwords do not match";
        toast.error(newErrors.passwordConfirm);
      }
      if (!phoneNumberRegex.test(phone)) {
        newErrors.phone = "Enter a valid phone number!";
        toast.error(newErrors.phone);
      }
      if (Object.keys(newErrors).length === 0) {
        let phoned = parseInt(phone);
        const responseData = await signup(username, email, password, phoned);
        if (responseData?.data.success) {
          toast.success('Registration successful!'); 
          setTimeout(() => {
            navigate('/verifyOtp');
          }, 2000);
        } else {
          toast.error(responseData?.data.message || "Signup failed");
        }
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="container max-w-full mx-auto md:py-12 px-6">
      <div className="max-w-sm mx-auto px-6">
        <div className="relative flex flex-wrap">
          <div className="w-full relative">
            <div className="md:mt-4">
              <div className="text-center text-3xl font-semibold text-black">
                Create an account
              </div>
              <div className="text-center text-sm font-base text-black">
                Already have an account?<p className="cursor-pointer text-red-600" onClick={() => navigate('/login')}>Log in</p>
              </div>

              <form className="mt-8" onSubmit={handleSubmit}>
                <div className="mx-auto max-w-lg">
                  <div className="py-1">
                    <label htmlFor="username" className="block text-sm text-gray-600">What should we call you?</label>
                    <input
                      id="username"
                      placeholder=""
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="text-md block px-3 py-2 rounded-lg w-full bg-white border-1 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    />
                  </div>
                  <div className="py-1">
                    <label htmlFor="email" className="block text-sm text-gray-600">What’s your email?</label>
                    <input
                      id="email"
                      placeholder=""
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-md block px-3 py-2 rounded-lg w-full bg-white border-1 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    />
                  </div>
                  <div className="py-1">
                    <label htmlFor="password" className="block text-sm text-gray-600">Create a password</label>
                    <input
                      id="password"
                      placeholder=""
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="text-md block px-3 py-2 rounded-lg w-full bg-white border-1 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    />
                  </div>
                  <div className="py-1">
                    <label htmlFor="passwordConfirm" className="block text-sm text-gray-600">Confirm Password</label>
                    <input
                      id="passwordConfirm"
                      placeholder=""
                      type="password"
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      className="text-md block px-3 py-2 rounded-lg w-full bg-white border-1 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    />
                  </div>
                  <div className="py-1">
                    <label htmlFor="phone" className="block text-sm text-gray-600">Phone Number</label>
                    <input
                      id="phone"
                      placeholder=""
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="text-md block px-3 py-2 rounded-lg w-full bg-white border-1 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    />
                  </div>
                  <button className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black">
                    Register
                  </button>
                </div>
              </form>
              <div className="text-sm font-semibold sm:hidden py-6 flex justify-center">
                <button
                  className="text-black font-normal border-b-2 border-gray-200 hover:border-teal-500"
                  onClick={handleLoginClick}
                >
                  Login
                </button>
              </div>
              <GoogleAuthentication Login={false} />
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { width: '350px' } }} />
    </div>
  );
}

export default Signup;
