import  { useState } from 'react';

const Signup = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

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
                Already have an account? Log in  
              </div>
              <form className="mt-8">
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
                 
                  <div className="flex justify-start">
                    <label className="block text-gray-500 font-bold my-4 flex items-center">
                      <input className="leading-loose text-pink-600 top-0" type="checkbox" />
                      <span className="ml-2 text-sm py-2 text-gray-600 text-left">Accept the-
                        <a href="#" className="font-semibold text-black border-b-2 border-gray-200 hover:border-gray-500">
                          Terms and Conditions of the site
                        </a>and
                        <a href="#" className="font-semibold text-black border-b-2 border-gray-200 hover:border-gray-500">
                          the information data policy.
                        </a>
                      </span>
                    </label>
                  </div>
                  <button className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black">
                    Register
                  </button>
                </div>
              </form>

              <div className="text-sm font-semibold sm:hidden py-6 flex justify-center">
                <a href="#" className="text-black font-normal border-b-2 border-gray-200 hover:border-teal-500">You're already member?
                  <span className="text-black font-semibold">Login</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
