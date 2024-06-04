import { useState } from 'react';

const Hours: React.FC<HoursProps> = ({
  business,
  selectedService,
  onNextStep,
  onPrevStep,
  selectedDate,
  onHourSelect,
}) => {
  const handleHourSelect = (hour: string) => {
    onHourSelect(hour);
    console.log(hour);
  };
  console.log(`selected service : ${selectedService.name}`);
  // console.log(`selected date : ${selectedDate}`);

  const selectedDay = selectedDate
    .toLocaleDateString('en-US', { weekday: 'long' })
    .toLowerCase();
  console.log(`selected day : ${selectedDay}`);

  const workDay = business.workingDays.find(
    (work: any) => work.day === selectedDay
  );

  if (!workDay) {
    return (
      <div
        className="card relative max-w-md p-8 bg-slate-100 rounded-lg w-full h-full mb-8 mt-5 mx-7"
        dir="rtl"
      >
        {/* title */}
        <span className="bg-lime-400 absolute top-2 w-10 p-1 rounded-lg"></span>
        <h1 className="text-2xl justify-center flex items-center">בחר שעה</h1>
        <div className="flex flex-col gap-3 mt-4" dir="rtl">
          {selectedService.name}
          <div>Business does not work on this day</div>
        </div>
        <div className="flex justify-between items-center mt-8 gap-1">
          <button
            className="text-md bg-stone-900 text-white rounded-md w-full p-2"
            onClick={onPrevStep}
          >
            חזור
          </button>
        </div>
      </div>
    );
  }
  const serviceTime = selectedService.serviceTime;
  const startHour = parseInt(workDay.startHour.split(':')[0], 10);
  const startMinute = parseInt(workDay.startHour.split(':')[1], 10);
  const endHour = parseInt(workDay.endHour.split(':')[0], 10);
  const endMinute = parseInt(workDay.endHour.split(':')[1], 10);

  const availableSlots = [];
  let currentHour = startHour;
  let currentMinute = startMinute;

  while (
    currentHour < endHour ||
    (currentHour === endHour && currentMinute + serviceTime <= endMinute)
  ) {
    const hourStr = currentHour.toString().padStart(2, '0');
    const minuteStr = currentMinute.toString().padStart(2, '0');
    availableSlots.push(`${hourStr}:${minuteStr}`);

    currentMinute += serviceTime;
    if (currentMinute >= 60) {
      currentHour += Math.floor(currentMinute / 60);
      currentMinute = currentMinute % 60;
    }
  }

  console.log(availableSlots);

  return (
    <div
      className="card relative max-w-md p-8 bg-slate-100 rounded-lg w-full h-full mb-8 mt-5 mx-7"
      dir="rtl"
    >
      <span className="bg-lime-400 absolute top-2 w-10 p-1 rounded-lg"></span>
      <h1 className="text-2xl justify-center flex items-center">בחר שעה</h1>
      <div className="flex flex-col gap-3 mt-4" dir="rtl">
        {selectedService.name}
        {availableSlots.length ? (
          <div className="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {availableSlots.map((slot, index) => (
              <button
                key={index}
                className="text-md bg-blue-500 text-white rounded-md p-2"
                onClick={() => {
                  handleHourSelect(slot);
                }}
              >
                {slot}
              </button>
            ))}
          </div>
        ) : (
          <div>No available slots</div>
        )}
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
  );
};

// return (
//   <div
//     className="card relative max-w-md p-8 bg-slate-100 rounded-lg w-full h-full mb-8 mt-5 mx-7"
//     dir="rtl"
//   >
//     {/* title */}
//     <span className="bg-lime-400 absolute top-2 w-10 p-1 rounded-lg"></span>
//     <h1 className="text-2xl justify-center flex items-center">בחר שעה</h1>
//     {/* services options */}
//     <div className="flex flex-col gap-3 mt-4" dir="rtl">
//       {selectedService.name}
//       {business?.workingDays.map((work: any) => (
//         <div key={work._id}>
//           <div>{work.day}</div>
//         </div>
//       ))}
//     </div>
//     <div className="flex justify-between items-center mt-8 gap-1">
//       <button
//         className="text-md bg-stone-900 text-white rounded-md w-full p-2"
//         onClick={onNextStep}
//       >
//         המשך
//       </button>
//       <button
//         className="text-md bg-stone-900 text-white rounded-md w-full p-2"
//         onClick={onPrevStep}
//       >
//         חזור
//       </button>
//     </div>
//   </div>
// );

export default Hours;
