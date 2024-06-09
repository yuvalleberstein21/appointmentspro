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
  business,
  onNextStep,
  onPrevStep,
  onDateSelect,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: Date) => {
    onDateSelect(date);
    setSelectedDate(date);
    onNextStep();
  };

  console.log(business);

  const workingDays = business.workingDays.map((work: any) => work.day);

  const isWorkingDay = (date: Date) => {
    const day = date
      .toLocaleDateString('en-US', { weekday: 'long' })
      .toLowerCase();
    return workingDays.includes(day);
  };

  const getDayClassName = (date: Date) => {
    return isWorkingDay(date) ? 'working-day' : 'non-working-day';
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
            dayClassName={getDayClassName}
            locale="he" // Set the locale to Hebrew
            inline
          />
        </div>

        <div className="mt-8">
          <button
            className="text-md bg-stone-900 text-white rounded-md w-full p-2"
            onClick={onPrevStep}
          >
            חזור
          </button>
        </div>
      </div>
    </>
  );
};

export default Dates;
