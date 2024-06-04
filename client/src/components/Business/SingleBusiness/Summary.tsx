import { HoursProps } from '../../../Helpers/ServiceType';

const Summary: React.FC<HoursProps> = ({
  selectedService,
  selectedDate,
  selectedHour,
  business,
  onPrevStep,
}) => {
  console.log(`Summary selected service : ${selectedService.name}`);
  console.log(`Summary selected Date : ${selectedDate}`);
  console.log(`Summary selected Hour : ${selectedHour}`);
  console.log(`Business Data : ${business.name}`);

  return (
    <div
      className="card relative max-w-md p-8 bg-slate-100 rounded-lg w-full h-full mb-8 mt-5 mx-7"
      dir="rtl"
    >
      <span className="bg-lime-400 absolute top-2 w-10 p-1 rounded-lg"></span>
      <h1 className="text-2xl justify-center flex items-center">סיכום</h1>
      <div className="py-2">
        <h4 className="mb-3">תודה שבחרת {business.name}</h4>
        <span className="text-md text-gray-600 text-md">
          תור ל{selectedService.name} בתאריך {selectedDate.getDate()} בשעה{' '}
          {selectedHour}
        </span>
      </div>
      <button className="flex justify-center text-center w-full mt-7 text-md bg-stone-900 text-white rounded-md p-2">
        קביעת תור
      </button>
    </div>
  );
};

export default Summary;
