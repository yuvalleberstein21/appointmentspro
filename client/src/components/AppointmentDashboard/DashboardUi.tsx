import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AppointmentData } from '../../Helpers/AppointmentType';
import Loading from '../../Utils/Loading';
import axios from 'axios';

const localizer = momentLocalizer(moment);
const DashboardUi: React.FC<AppointmentData> = ({
  loading,
  error,
  appointments,
}) => {
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
        end: moment(appointmentDateTime).add(1, 'hour').toDate(), // Assuming 1 hour duration
      };
    });

  const handleConfirmAppointment = async (appointmentId: string) => {
    setLoadingConfirm(true);
    try {
      const response = await axios.put(
        `/api/appointments/${appointmentId}/confirm`
      );
      // Optionally update local state or fetch updated appointments
      // fetchAppointments();
    } catch (error) {
      setErrorConfirm('Failed to confirm appointment');
      console.error('Error confirming appointment:', error);
    } finally {
      setLoadingConfirm(false);
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
      {!event.confirmed && (
        <button onClick={() => handleConfirmAppointment(event.id)}>
          Confirm
        </button>
      )}
    </div>
  );

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
