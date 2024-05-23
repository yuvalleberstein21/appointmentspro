import { useSelector } from 'react-redux';
import LoginForm from '../components/Auth/LoginForm';

const AuthPage = () => {
  const userLogin = useSelector((state: any) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  return (
    <div className="flex flex-col items-center justify-center px-4 mt-8 py-10 mx-auto">
      <div className="relative sm:max-w-xl sm:mx-auto">
        <div className="absolute rounded-lg inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative rounded-lg px-4 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <LoginForm loading={loading} error={error} userInfo={userInfo} />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
