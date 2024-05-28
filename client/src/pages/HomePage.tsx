import { useSelector } from 'react-redux';
import homePageImage from '../assets/traced-3999010.jpg';
import MainButtons from '../components/MainButtons';
import Search from '../components/Search';
const HomePage = () => {
  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      <img src={homePageImage} alt="home page image" />
      <div className="flex flex-col justify-between p-4">
        <Search userInfo={userInfo} />
        <div className="mt-4">
          <MainButtons />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
