import { useEffect } from 'react';
import { HoursProps } from '../../../Helpers/ServiceType';
import { useDispatch, useSelector } from 'react-redux';
import { businessAppointmentAction } from '../../../Redux/Actions/AppointmentAction';

const Hours: React.FC<HoursProps> = ({
  business,
  selectedService,
  onNextStep,
  onPrevStep,
  selectedDate,
  onHourSelect,
  businessId,
}) => {
  const businessAppointment = useSelector(
    (state: any) => state.businessAppointment
  );
  const { appointment, loading } = businessAppointment;

  console.log(appointment);

  const dispatch = useDispatch<any>();

  const handleHourSelect = (hour: string) => {
    onHourSelect(hour);
    onNextStep();
  };

  const selectedDay = selectedDate
    .toLocaleDateString('en-US', { weekday: 'long' })
    .toLowerCase();

  const workDay = business.workingDays.find(
    (work: any) => work.day === selectedDay
  );

  useEffect(() => {
    try {
      dispatch(businessAppointmentAction(businessId));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const isHourActive = (hour: string) => {
    if (appointment) {
      const chosenDate = new Date(selectedDate);
      const appointmentsForDate = appointment.filter((appoint: any) => {
        const appointmentDate = new Date(appoint.date);
        return appointmentDate.toDateString() === chosenDate.toDateString();
      });

      return appointmentsForDate.some((appointment: any) => {
        return appointment.startTime === hour;
      });
    }
    return false;
  };

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
    const time = `${hourStr}:${minuteStr}`;

    // Check if the current time slot is already booked
    if (
      appointment &&
      appointment.appointmentDate === selectedDate.toISOString().slice(0, 10) && // Compare only the date part
      appointment.appointmentTime === time
    ) {
      // Skip this time slot if it's already booked
      currentMinute += serviceTime;
      if (currentMinute >= 60) {
        currentHour += Math.floor(currentMinute / 60);
        currentMinute = currentMinute % 60;
      }
      continue;
    }

    availableSlots.push(time);

    currentMinute += serviceTime;
    if (currentMinute >= 60) {
      currentHour += Math.floor(currentMinute / 60);
      currentMinute = currentMinute % 60;
    }
  }

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
                className={isHourActive(slot) ? 'active' : 'inactive'}
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
      </div>
    </div>
  );
};
export default Hours;
