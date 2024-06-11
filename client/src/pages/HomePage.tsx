import { useDispatch, useSelector } from 'react-redux';
import homePageImage from '../assets/traced-3999010.jpg';
import MainButtons from '../components/MainButtons';
import Search from '../components/Search';
import AppointmentCarousel from '../components/AppointmentCarousel';
import { useEffect } from 'react';
import { userAppointmentAction } from '../Redux/Actions/AppointmentAction';

const HomePage = () => {
  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const dispacth = useDispatch<any>();
  useEffect(() => {
    dispacth(userAppointmentAction());
  }, [dispacth]);

  return (
    <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      <img src={homePageImage} alt="home page image" />
      <div className="flex flex-col justify-between p-4">
        <Search userInfo={userInfo} />
        <div className="mt-4">
          <MainButtons />
        </div>
      </div>
      <div className="w-full p-4 mx-5">
        <AppointmentCarousel />
      </div>
    </div>
  );
};

export default HomePage;
