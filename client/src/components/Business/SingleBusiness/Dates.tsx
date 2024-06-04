import { useState } from 'react';
import { Business } from '../../../Helpers/BusinessType';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import he from 'date-fns/locale/he';

interface BusinessData {
  business: Business;
  onDateSelect: (data: Date) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
}
// Register the Hebrew locale with react-datepicker
registerLocale('he', he);
const Dates: React.FC<BusinessData> = ({
  onNextStep,
  onPrevStep,
  onDateSelect,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: Date) => {
    onDateSelect(date);
    setSelectedDate(date);
  };

  return (
    <>
      <div
        className="card relative max-w-md p-8 bg-slate-100 rounded-lg w-full h-full mb-8 mt-5 mx-7"
        dir="rtl"
      >
        <div className="flex flex-col items-center mt-5">
          <label htmlFor="date-picker" className="mb-2 text-lg text-gray-700">
            בחר תאריך :
          </label>

          <DatePicker
            id="date-picker"
            selected={selectedDate}
            onChange={handleDateChange}
            minDate={new Date()}
            dateFormat="dd/MM/yyyy"
            className="p-2 border-none rounded-md w-full max-w-xs text-md"
            calendarClassName="border border-none rounded-md"
            showPopperArrow={false}
            locale="he" // Set the locale to Hebrew
            inline
          />
        </div>

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
