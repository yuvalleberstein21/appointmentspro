import { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
  const [showPassword, setShowPasword] = useState(false);
  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-center">
        <h1 className="text-2xl font-semibold">SIGN UP</h1>
      </div>
      <div className="divide-y divide-gray-200 p-6">
        <div className="py-8 text-base leading-6 space-y-5 text-gray-700 sm:text-lg sm:leading-7">
          <div className="relative">
            <label htmlFor="name" className="text-sm">
              Full Name
            </label>
            <input
              autoComplete="off"
              id="name"
              name="name"
              type="text"
              className="peer placeholder-transparent px-4 h-10 w-full border-b-2 rounded-md border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
              placeholder="Name"
            />
          </div>
          <div className="relative">
            <label htmlFor="phoneNumber" className="text-sm">
              Phone number
            </label>
            <input
              autoComplete="off"
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              className="peer placeholder-transparent px-4 h-10 w-full  border-b-2 rounded-md border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
              placeholder="Phone number"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              autoComplete="off"
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              className="peer placeholder-transparent px-4 h-10 w-full border-b-2 rounded-md border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
              placeholder="Password"
            />
            <i
              className={`fa-solid ${
                showPassword ? 'fa-eye-slash' : 'fa-eye'
              } absolute right-2 bottom-3 cursor-pointer`}
              onClick={() => setShowPasword(!showPassword)}
            ></i>
          </div>
          <span className="text-sm">
            have an account ?{' '}
            <Link to={'/'} className="text-blue-500">
              Login
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
  );
};

export default SignUpForm;
