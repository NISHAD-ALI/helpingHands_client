import { useState } from 'react';
import { signup } from '../../Api/userApi';
import { Navigate, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState<string>('nishad');
  const [email, setEmail] = useState<string>('nishadali267@gmail.com');
  const [password, setPassword] = useState<string>('May311!+');
  const [mobile, setMobile] = useState<number>(9876543211);
  const [passwordConfirm, setPasswordConfirm] = useState<string>('May311!+');
  const [error, setError] = useState<{ [key: string]: string }>({});
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const mobileNumberRegex = /^[0-9]{10}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newErrors: { [key: string]: string } = {};
      if (username.length < 3) {
        newErrors.username = "Name must contain at least 3 letters";
      }
      if (!emailRegex.test(email)) {
        newErrors.email = "Invalid email format";
      }
      if (!passwordRegex.test(password)) {
        newErrors.password = "Password must be 8 characters long and include at least one uppercase letter, one lowercase letter, one special character, and one number.";
      }
      if (password !== passwordConfirm) {
        newErrors.passwordConfirm = "Passwords do not match";
      }
      if (!mobileNumberRegex.test(mobile)) {
        newErrors.mobile = "Enter a valid mobile number!";
      }

      if (Object.keys(newErrors).length === 0) {
        const responseData = await signup(username, email, password, mobile);
        if (responseData?.data.success) {
          navigate('/verifyOtp');
        } else {
          setError({ ...newErrors, api: responseData?.data.message || "Signup failed" });
        }
      } else {
        setError(newErrors);
      }



    } catch (error : any) {
      console.log(error);
      setError({ api: error });
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
              <div className="text-center  text-sm font-base text-black">
                Already have an account?<p className='cursor-pointer text-red-600' onClick={() => navigate('/login')}>Log in</p>
              </div>

              <form className="mt-8" onSubmit={handleSubmit}>
                <div className="mx-auto max-w-lg ">
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
                    {error.username && <span className="text-red-500 text-sm">{error.username}</span>}
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
                    {error.email && <span className="text-red-500 text-sm">{error.email}</span>}
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
                    {error.password && <span className="text-red-500 text-sm">{error.password}</span>}
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
                    {error.passwordConfirm && <span className="text-red-500 text-sm">{error.passwordConfirm}</span>}
                  </div>
                  <div className="py-1">
                    <label htmlFor="mobile" className="block text-sm text-gray-600">Mobile Number</label>
                    <input
                      id="mobile"
                      placeholder=""
                      type="text"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="text-md block px-3 py-2 rounded-lg w-full bg-white border-1 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                    />
                    {error.mobile && <span className="text-red-500 text-sm">{error.mobile}</span>}
                  </div>
                  <div className="flex justify-start">
                    {/* <label className="block text-gray-500 font-bold my-4 flex items-center">
                      <input className="leading-loose text-pink-600 top-0" type="checkbox" />
                      <span className="ml-2 text-sm py-2 text-gray-600 text-left">Accept the-
                        <a href="#" className="font-semibold text-black border-b-2 border-gray-200 hover:border-gray-500">
                          Terms and Conditions of the site
                        </a>and
                        <a href="#" className="font-semibold text-black border-b-2 border-gray-200 hover:border-gray-500">
                          the information data policy.
                        </a>
                      </span>
                    </label> */}
                  </div>
                  {error.api && <p className="text-red-500 text-sm">{error.api}</p>}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
