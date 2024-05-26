import { Link } from 'react-router-dom';

const MainButtons = () => {
  return (
    <>
      <div
        className="max-w-md mx-auto py-10 gap-4 bottom-0 absolute right-40"
        dir="rtl"
      >
        <Link to={'/createbusiness'}>
          <button className="bg-gray-900 p-2  text-white rounded-lg w-full">
            צור עסק
          </button>
        </Link>

        <br />
        <button className="bg-gray-900 p-2  text-white rounded-lg w-full mt-2">
          עריכת עסק קיים
        </button>
      </div>
    </>
  );
};

export default MainButtons;
