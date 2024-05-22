import homePageImage from '../assets/traced-3999010.jpg';
import MainButtons from '../components/MainButtons';
import Search from '../components/Search';
const HomePage = () => {
  return (
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 p-4 ">
      <img src={homePageImage} alt="home page image" />
      <div className="p-4">
        <Search />
        <MainButtons />
      </div>
    </div>
  );
};

export default HomePage;
