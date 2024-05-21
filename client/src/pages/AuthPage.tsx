import { useSelector } from 'react-redux';
import LoginForm from '../components/Auth/LoginForm';

const AuthPage = () => {
  const userLogin = useSelector((state: any) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 mx-auto min-h-screen">
      <div className="relative py-3 mt-10  sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 mt-2  bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <LoginForm loading={loading} error={error} userInfo={userInfo} />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
