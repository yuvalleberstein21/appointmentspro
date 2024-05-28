import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const MainButtons = () => {
  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  const handleCreateBusinessClick = () => {
    if (userInfo) {
      navigate('/createbusiness');
    } else {
      navigate('/', { state: { from: '/createbusiness' } });
    }
  };
  return (
    <>
      <div className="max-w-md mx-auto py-10 gap-4 flex flex-col" dir="rtl">
        <button
          className="bg-gray-900 p-2 text-white rounded-lg w-full"
          onClick={handleCreateBusinessClick}
        >
          צור עסק
        </button>
        <button className="bg-gray-900 p-2 text-white rounded-lg w-full mt-2">
          עריכת עסק קיים
        </button>
      </div>
    </>
  );
};

export default MainButtons;
