import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login } from '../../Redux/Actions/AuthAction';
import { User } from '../../Helpers/AuthType';
import Loading from '../../Utils/Loading';
import GlobalToast from '../../Utils/Error';
import { toast } from 'react-toastify';

interface LoginFormProps {
  userInfo: User;
  loading: boolean;
  error: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ userInfo, loading, error }) => {
  const [showPassword, setShowPasword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(error);

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (userInfo) {
      const redirectTo = (location.state as any)?.from || '/home';
      navigate(redirectTo);
    }
  }, [userInfo, navigate, location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const action = login(phoneNumber, password);
      await dispatch(action);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto" dir="rtl">
      <GlobalToast />
      <div className="flex justify-center">
        <h1 className="text-2xl font-semibold mt-4">התחברות</h1>
      </div>
      {loading && <Loading />}

      <div className="divide-y divide-gray-200 p-6">
        <div className="py-8 text-base leading-6 space-y-5 text-gray-700 sm:text-lg sm:leading-7">
          <div className="relative">
            <label htmlFor="phoneNumber" className="text-sm">
              מספר פלאפון
            </label>
            <input
              autoComplete="off"
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              className="placeholder-transparent px-4 h-10 w-full border-b-2 rounded-md border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
              placeholder="Phone number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="text-sm">
              סיסמא
            </label>
            <input
              dir="ltr"
              autoComplete="off"
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              className="peer placeholder-transparent px-4 h-10 w-full border-b-2 rounded-md border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <i
              className={`fa-solid ${
                showPassword ? 'fa-eye-slash' : 'fa-eye'
              } absolute right-2 bottom-3 cursor-pointer`}
              onClick={() => setShowPasword(!showPassword)}
            ></i>
          </div>
          <span className="text-sm">
            עדיין אין לך משתמש?{' '}
            <Link to={'/auth/register'} className="text-blue-500">
              הרשמה
            </Link>
          </span>
          <div className="relative flex justify-center">
            <button
              className="bg-blue-500 justify-center items-center text-white rounded-md px-5 py-1"
              onClick={handleSubmit}
            >
              כניסה
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
