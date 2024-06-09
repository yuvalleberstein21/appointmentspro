import { HoursProps } from '../../../Helpers/ServiceType';

const Summary: React.FC<HoursProps> = ({
  selectedService,
  selectedDate,
  selectedHour,
  business,
  onPrevStep,
  onSubmit,
}) => {
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
      <div className="flex justify-between text-center gap-2">
        <button
          className="w-full mt-7 text-md bg-stone-900 text-white rounded-md p-2"
          onClick={onPrevStep}
        >
          חזור
        </button>
        <button
          className="w-full mt-7 text-md bg-stone-900 text-white rounded-md p-2"
          onClick={onSubmit}
        >
          קביעת תור
        </button>
      </div>
    </div>
  );
};

export default Summary;
