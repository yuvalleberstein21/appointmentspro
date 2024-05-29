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

  const handleEditBusinessClick = () => {
    if (userInfo) {
      navigate('/editbusiness');
    } else {
      navigate('/', { state: { from: '/editbusiness' } });
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
          <i className="fa-solid fa-plus m-2"></i>
        </button>
        <button
          className="bg-gray-900 p-2 text-white rounded-lg w-full mt-2"
          onClick={handleEditBusinessClick}
        >
          עריכת עסק קיים
          <i className="fa-solid fa-pen-to-square m-2"></i>
        </button>
      </div>
    </>
  );
};

export default MainButtons;
