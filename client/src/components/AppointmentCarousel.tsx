import { useSelector } from 'react-redux';
import Loading from '../Utils/Loading';
import { Link } from 'react-router-dom';
import { formatDate } from '../Utils/FormatDate';
import { AppointmentData } from '../Helpers/AppointmentType';
import { useEffect, useState } from 'react';
import { userAppointmentAction } from '../Redux/Actions/AppointmentAction';

const AppointmentCarousel = () => {
  const userAppointment = useSelector((state: any) => state.userAppointment);
  const { loading, appointment } = userAppointment;
  const [filteredAppointments, setFilteredAppointments] = useState<
    AppointmentData[]
  >([]);

  const checkAppointmentActive = () => {
    const dayNow = new Date();

    // Check if appointment is defined and is an array
    if (appointment && Array.isArray(appointment)) {
      const activeAppointments = appointment.filter((appointment) => {
        const appointmentDateTime = new Date(appointment.appointmentDate);
        const [hours, minutes] = appointment.appointmentTime.split(':');

        appointmentDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        return appointmentDateTime > dayNow;
      });

      setFilteredAppointments(activeAppointments);
    } else {
      // Handle case where appointment is undefined or not an array
      setFilteredAppointments([]); // or setFilteredAppointments(null) based on your requirement
    }
  };

  useEffect(() => {
    if (appointment) {
      checkAppointmentActive();
    }
  }, [appointment]);

  return (
    <div
      className="mb-3 p-2 w-full"
      style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}
    >
      {loading ? (
        <Loading />
      ) : (
        filteredAppointments?.length > 0 &&
        filteredAppointments.map((appointment: AppointmentData) => (
          <Link
            to={`/business/${appointment.business._id}`}
            key={appointment?._id}
            className="inline-block min-w-[300px] m-2"
          >
            <div className="bg-white rounded-lg overflow-hidden relative">
              <img
                src={appointment.business.images[0]}
                alt={appointment.business.name}
                className="w-full h-48 object-cover bg-cover opacity-90 z-0"
              />

              <div dir="rtl">
                <h2 className="text-lg bg-slate-300 bg-opacity-60 rounded-md p-1 mx-2 font-semibold absolute top-1 right-0 z-10 text-black">
                  {appointment.business.name}
                </h2>
                <p className="text-md bg-slate-300 bg-opacity-60 rounded-md p-1 mx-2 font-semibold absolute bottom-2 z-10 text-black">
                  בתאריך {formatDate(appointment.appointmentDate)} בשעה{' '}
                  {appointment.appointmentTime}
                </p>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default AppointmentCarousel;
