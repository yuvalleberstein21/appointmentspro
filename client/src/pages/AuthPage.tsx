import { useState } from 'react';
import { Link } from 'react-router-dom';

const AuthPage = () => {
  const [showPassword, setShowPasword] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 mx-auto min-h-screen">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10  bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="flex justify-center">
              <h1 className="text-2xl font-semibold">LOGIN</h1>
            </div>
            <div className="divide-y divide-gray-200 p-6">
              <div className="py-8 text-base leading-6 space-y-5 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    className="peer placeholder-transparent px-10 h-10 w-full  border-b-2 rounded-md border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Phone number"
                  />
                  <label
                    htmlFor="phoneNumber"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-4 peer-focus:text-gray-600 peer-focus:text-sm ml-2"
                  >
                    Phone number
                  </label>
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    className="peer placeholder-transparent px-10 h-10 w-full border-b-2 rounded-md border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Password"
                  />
                  <i
                    className={`fa-solid ${
                      showPassword ? 'fa-eye-slash' : 'fa-eye'
                    } absolute top-2.5 right-2 bottom-0 cursor-pointer`}
                    onClick={() => setShowPasword(!showPassword)}
                  ></i>

                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-4 peer-focus:text-gray-600 peer-focus:text-sm ml-2"
                  >
                    Password
                  </label>
                </div>
                <span className="text-sm">
                  Don't have an account ?{' '}
                  <Link to={'/auth/register'} className="text-blue-500">
                    Sign Up
                  </Link>
                </span>
                <div className="relative flex justify-center">
                  <button className="bg-blue-500 justify-center items-center text-white rounded-md px-5 py-1">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
