import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../Redux/Actions/AuthAction';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = (e: any) => {
    e.preventDefault;
    try {
      dispatch(logout());
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="bg-cyan-950 w-full z-20 top-0 left-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/logo.webp" className="h-8" alt="EasyMarkLogo" />
          <span className="self-center lg:text-xl md:text-md text-white font-semibold whitespace-nowrap sm:block">
            EasyMark.
          </span>
        </Link>
        <div className="flex md:order-2 md:space-x-0 rtl:space-x-reverse">
          <span
            className=" text-white text-md rounded md:bg-transparent md:p-1 mr-4 mt-2 lg:mt-0"
            aria-current="page"
            dir="rtl"
          >
            {userInfo ? `שלום ${userInfo.name}` : 'שלום אורח'}
          </span>
          {userInfo ? (
            <button
              type="button"
              className="text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 mr-1 text-center hidden sm:block"
              onClick={handleLogout}
            >
              התנתקות
            </button>
          ) : (
            <Link to={'/'}>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center hidden sm:block"
              >
                התחברות
              </button>
            </Link>
          )}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          dir="rtl"
          className={`w-full md:flex md:items-center md:justify-between md:w-auto md:order-1 ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
          id="navbar-sticky"
        >
          <ul className="flex lg:gap-5 md:gap-2 flex-col p-4 md:p-0 mt-2 font-medium rounded-lg bg-cyan-950 md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li>
              <Link
                to={'/home'}
                className="block py-2 px-3 text-white rounded md:bg-transparent hover:text-emerald-100 md:p-0"
                aria-current="page"
              >
                דף הבית
              </Link>
            </li>
            {userInfo?.role === 'manager' && (
              <li>
                <Link
                  to={'/appointmentDashboard'}
                  className="block py-2 px-3 text-white rounded md:hover:bg-transparent hover:text-emerald-100 md:p-0"
                >
                  ניהול תורים
                </Link>
              </li>
            )}
            {/* Elements for small screens */}

            {userInfo ? (
              <li className="block sm:hidden">
                <button
                  type="button"
                  className="text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                  onClick={handleLogout}
                >
                  התנתקות
                </button>
              </li>
            ) : (
              <li className="block sm:hidden">
                <Link to={'/'}>
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                  >
                    התחברות
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
