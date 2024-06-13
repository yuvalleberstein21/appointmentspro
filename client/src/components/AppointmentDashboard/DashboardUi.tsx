import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AppointmentData } from '../../Helpers/AppointmentType';
import Loading from '../../Utils/Loading';
import axios from 'axios';
import {
  confirmAppointmentAction,
  dashboardAppointmentAction,
} from '../../Redux/Actions/AppointmentAction';
import { useDispatch } from 'react-redux';

const localizer = momentLocalizer(moment);
const DashboardUi: React.FC<AppointmentData> = ({
  loading,
  error,
  appointments,
}) => {
  const dispatch = useDispatch<any>();

  const handleConfirmAppointment = async (appointmentId: string) => {
    try {
      await dispatch(confirmAppointmentAction(appointmentId));
    } catch (error) {
      console.error('Error confirming appointment:', error);
    }
  };

  // Custom agenda event component with confirm button
  const AgendaEvent = ({ event }) => (
    <div
      style={{
        padding: '5px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div>{event.title}</div>
      {event.confirmed ? (
        <div className="bg-green-500 rounded-md p-1 text-white">התור מאושר</div>
      ) : (
        <button
          className="bg-red-500 rounded-md p-1 text-white"
          onClick={() => handleConfirmAppointment(event.id)}
        >
          אשר תור
        </button>
      )}
    </div>
  );

  const formattedAppointments =
    appointments?.length > 0 &&
    appointments.map((appointment) => {
      // Format appointmentTime to match "HH:mm" format
      const appointmentDateTime = moment(appointment.appointmentDate)
        .set('hour', parseInt(appointment.appointmentTime.split(':')[0]))
        .set('minute', parseInt(appointment.appointmentTime.split(':')[1]));

      return {
        id: appointment._id,
        title: `${appointment.user.name} - ${appointment.service.name}`,
        start: new Date(appointmentDateTime),
        end: moment(appointmentDateTime).add(1, 'hour').toDate(),
        confirmed: appointment.confirmed, // Assuming 1 hour duration
      };
    });

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <div>{error}</div> // Handle error message display in Hebrew
      ) : (
        <Calendar
          localizer={localizer}
          events={formattedAppointments || []} // Provide empty array if formattedAppointments is undefined
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          messages={{
            today: 'היום',
            previous: 'הקודם',
            next: 'הבא',
            month: 'חודש',
            week: 'שבוע',
            day: 'יום',
            showMore: (total) => `+ ${total} עוד`,
          }}
          views={['month', 'week', 'day', 'agenda']} // Specify views including agenda
          components={{
            agenda: {
              event: AgendaEvent, // Use custom event component for agenda view
            },
          }}
        />
      )}
    </div>
  );
};

export default DashboardUi;
