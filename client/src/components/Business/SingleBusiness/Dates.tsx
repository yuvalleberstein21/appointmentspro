import { useState } from 'react';
import { Business } from '../../../Helpers/BusinessType';

interface BusinessData {
  business: Business;
  onDateSelect: (data: BusinessData) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
}
const Dates: React.FC<BusinessData> = ({
  business,
  onNextStep,
  onPrevStep,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDateClick = (date: any) => {
    onDateSelect(date);
  };
  console.log(business);
  return (
    <>
      <div
        className="card relative max-w-md p-8 bg-slate-100 rounded-lg w-full h-full mb-8 mt-5 mx-7"
        dir="rtl"
      >
        {/* title */}
        <span className="bg-lime-400 absolute top-2 w-10 p-1 rounded-lg"></span>
        <h1 className="text-2xl justify-center flex items-center">בחר תאריך</h1>
        {/* services options */}

        <button
          type="button"
          onClick={toggleModal}
          className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
        >
          <svg
            className="w4 h-4 me-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fillRule="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
              clipRule="evenodd"
            />
          </svg>
          Schedule appointment
        </button>

        {isModalOpen && (
          <div
            id="timepicker-modal"
            aria-hidden="true"
            className="justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative p-4 w-full max-w-[23rem] max-h-full">
              <div className="relative bg-slate-100 rounded-lg shadow dark:bg-gray-800">
                <div className="p-4 pt-0">
                  <div
                    inline-datepicker="true"
                    datepicker-autoselect-today="true"
                    className="mx-auto sm:mx-0 flex justify-center my-5 [&>div>div]:shadow-none [&>div>div]:bg-gray-50 [&_div>button]:bg-gray-50"
                  ></div>
                  <label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">
                    Pick your time
                  </label>
                  <ul
                    id="timetable"
                    className="grid w-full grid-cols-3 gap-2 mb-5"
                  >
                    <li>
                      <input
                        type="radio"
                        id="10-am"
                        value="10:00 AM"
                        className="hidden peer"
                        name="timetable"
                      />
                      <label
                        htmlFor="10-am"
                        className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-blue-500 peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900"
                      >
                        10:00 AM
                      </label>
                    </li>
                  </ul>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={toggleModal}
                      className="py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      Discard
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-8 gap-1">
          <button
            className="text-md bg-stone-900 text-white rounded-md w-full p-2"
            onClick={onPrevStep}
          >
            חזור
          </button>
          <button
            className="text-md bg-stone-900 text-white rounded-md w-full p-2"
            onClick={onNextStep}
          >
            המשך
          </button>
        </div>
      </div>
    </>
  );
};

export default Dates;
