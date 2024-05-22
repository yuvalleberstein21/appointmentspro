import { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../../Redux/Actions/AuthAction';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import GlobalToast from '../../Utils/Error';
import { User } from '../../Helpers/AuthType';
import Loading from '../../Utils/Loading';

interface RegisterFormProps {
  userInfo: User;
  loading: boolean;
  error: boolean;
}
const SignUpForm: React.FC<RegisterFormProps> = ({ userInfo, loading }) => {
  const [showPassword, setShowPasword] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<any>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const action = register(name, phoneNumber, password);
      await dispatch(action);
      if (userInfo) {
        toast.success('!ההרשמה בוצעה בהצלחה');
        // navigate('/homepage');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className="max-w-md mx-auto" dir="rtl">
      <GlobalToast />
      <div className="flex justify-center">
        <h1 className="text-2xl font-semibold">הרשמה</h1>
      </div>
      {loading && <Loading />}
      <div className="divide-y divide-gray-200 p-6">
        <div className="py-8 text-base leading-6 space-y-5 text-gray-700 sm:text-lg sm:leading-7">
          <div className="relative">
            <label htmlFor="name" className="text-sm">
              שם מלא
            </label>
            <input
              autoComplete="off"
              id="name"
              name="name"
              type="text"
              className="peer placeholder-transparent px-4 h-10 w-full border-b-2 rounded-md border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="relative">
            <label htmlFor="phoneNumber" className="text-sm">
              מספר פלאפון
            </label>
            <input
              autoComplete="off"
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              className="peer placeholder-transparent px-4 h-10 w-full  border-b-2 rounded-md border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
              placeholder="Phone number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="text-sm">
              סיסמא
            </label>
            <input
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
            יש לך כבר משתמש?{' '}
            <Link to={'/'} className="text-blue-500">
              התחברות
            </Link>
          </span>
          <div className="relative flex justify-center">
            <button
              className="bg-blue-500 justify-center items-center text-white rounded-md px-5 py-1"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
