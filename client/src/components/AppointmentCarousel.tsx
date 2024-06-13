import { useSelector } from 'react-redux';
import Loading from '../Utils/Loading';
import { Link } from 'react-router-dom';
import { formatDate } from '../Utils/FormatDate';
import { AppointmentData } from '../Helpers/AppointmentType';

const AppointmentCarousel = () => {
  const userAppointment = useSelector((state: any) => state.userAppointment);
  const { loading, appointment } = userAppointment;

  return (
    <div
      className="mb-3 p-2 w-full"
      style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}
    >
      {loading ? (
        <Loading />
      ) : (
        appointment?.length > 0 &&
        appointment.map((appointment: AppointmentData) => (
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
