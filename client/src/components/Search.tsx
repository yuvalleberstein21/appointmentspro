import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBusinesessAction } from '../Redux/Actions/BusinessAction';
import { User } from '../Helpers/AuthType';
import { Link } from 'react-router-dom';
import { Business } from '../Helpers/BusinessType';

interface componentData {
  userInfo: User;
}
const Search: React.FC<componentData> = ({ userInfo }) => {
  const [inputSearch, setInputSearch] = useState('');

  const getAllBusinesess = useSelector((state: any) => state.getAllBusinesess);
  const { businesses } = getAllBusinesess;

  const dispatch = useDispatch<any>();

  useEffect(() => {
    try {
      const action = getAllBusinesessAction();
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const filterBusinesess = businesses?.filter((b: any) =>
    b.name.toLowerCase().includes(inputSearch.toLowerCase())
  );

  return (
    <div
      className="card max-w-lg w-full mx-auto p-6 bg-slate-100 rounded-lg mt-10"
      dir="rtl"
    >
      <div className="card-title flex items-center">
        <h1>{userInfo?.name ? `שלום ${userInfo.name} 👋🏼` : 'שלום אורח'}</h1>
      </div>
      <div className="card-span flex items-center justify-center mt-2">
        <span className="text-gray-500 py-1">קביעת תורים לכל עסק קיים</span>
      </div>
      <form className="mt-5">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="חיפוש עסק קיים..."
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            חיפוש עסק
          </button>
        </div>
        <div className="max-h-[250px] overflow-y-auto">
          {inputSearch && filterBusinesess?.length > 0
            ? filterBusinesess.map((b: Business) => (
                <div
                  className="bg-white shadow-md rounded-md overflow-hidden max-w-lg mx-auto cursor-pointer mt-2"
                  key={b._id}
                >
                  <ul className="divide-y divide-gray-200">
                    <Link to={`/business/${b._id}`}>
                      <li className="flex items-center py-4 px-6">
                        <img
                          className="w-12 h-12 rounded-full object-cover mr-4"
                          src={b.images[0]}
                          alt={b.name}
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-800">
                            {b.name}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {b.city + ',' + b.address}
                          </p>
                        </div>
                      </li>
                    </Link>
                  </ul>
                </div>
              ))
            : null}
        </div>
      </form>
    </div>
  );
};

export default Search;
