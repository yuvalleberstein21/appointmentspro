import { useSelector } from 'react-redux';
import SignUpForm from '../components/Auth/SignUpForm';

const AuthPageSignUp = () => {
  const userLogin = useSelector((state: any) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 mx-auto min-h-screen">
      <div className="relative py-1 mt-4 sm:max-w-xl sm:mx-auto ">
        <div className="absolute mt-10 inset-0 bg-gradient-to-r  from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 mt-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <SignUpForm error={error} loading={loading} userInfo={userInfo} />
        </div>
      </div>
    </div>
  );
};

export default AuthPageSignUp;
