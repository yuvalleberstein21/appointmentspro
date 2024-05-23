import { useSelector } from 'react-redux';
import SignUpForm from '../components/Auth/SignUpForm';

const AuthPageSignUp = () => {
  const userLogin = useSelector((state: any) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  return (
    <div className="flex flex-col items-center justify-center rounded-lg px-4 mt-5 py-5 mx-auto">
      <div className="relative sm:max-w-xl sm:mx-auto ">
        <div className="absolute inset-0 bg-gradient-to-r rounded-lg from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative rounded-lg px-4 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <SignUpForm error={error} loading={loading} userInfo={userInfo} />
        </div>
      </div>
    </div>
  );
};

export default AuthPageSignUp;
