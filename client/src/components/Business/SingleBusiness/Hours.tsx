const Hours: React.FC<HoursProps> = ({
  business,
  selectedService,
  onNextStep,
  onPrevStep,
}) => {
  console.log(business);
  return (
    <div
      className="card relative max-w-md p-8 bg-slate-100 rounded-lg w-full h-full mb-8 mt-5 mx-7"
      dir="rtl"
    >
      {/* title */}
      <span className="bg-lime-400 absolute top-2 w-10 p-1 rounded-lg"></span>
      <h1 className="text-2xl justify-center flex items-center">בחר שעה</h1>
      {/* services options */}
      <div className="flex flex-col gap-3 mt-4" dir="rtl">
        {selectedService.name}
        {business?.workingDays.map((work: any) => (
          <div key={work._id}>
            <div>{work.day}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-8 gap-1">
        <button
          className="text-md bg-stone-900 text-white rounded-md w-full p-2"
          onClick={onNextStep}
        >
          המשך
        </button>
        <button
          className="text-md bg-stone-900 text-white rounded-md w-full p-2"
          onClick={onPrevStep}
        >
          חזור
        </button>
      </div>
    </div>
  );
};

export default Hours;
