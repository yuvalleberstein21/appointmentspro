import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AppointmentData } from '../../Helpers/AppointmentType';
import Loading from '../../Utils/Loading';
import {
  confirmAppointmentAction,
  updateAppointmentAction,
} from '../../Redux/Actions/AppointmentAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import EditAppointmentModal from './EditAppointmentModal';
import { toast } from 'react-toastify';
import GlobalToast from '../../Utils/Error';

const localizer = momentLocalizer(moment);
const DashboardUi: React.FC<AppointmentData> = ({
  loading,
  error,
  appointments,
}) => {
  const [confirmAppointment, setConfirmAppointment] = useState(false);
  const updateAppointment = useSelector(
    (state: any) => state.updateAppointment
  );
  const {
    loading: loadingUpdate,
    success,
    appointment,
    error: errorUpdate,
  } = updateAppointment;

  const dispatch = useDispatch<any>();

  const [openModal, setOpenModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleConfirmAppointment = async (appointmentId: string) => {
    try {
      await dispatch(confirmAppointmentAction(appointmentId));
      setConfirmAppointment(true);
    } catch (error) {
      console.error('Error confirming appointment:', error);
    }
  };

  const openEditAppointmentModal = (appointment: any) => {
    setSelectedAppointment(appointment);
    setOpenModal(true);
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
      {event.confirmed || confirmAppointment ? (
        <div className="bg-blue-500 rounded-md p-1 text-white">התור מאושר</div>
      ) : (
        <button
          className="bg-red-500 rounded-md p-1 text-white"
          onClick={() => handleConfirmAppointment(event.id)}
        >
          אשר תור
        </button>
      )}
      <button
        className="bg-green-500 rounded-md p-1 text-white"
        onClick={() => openEditAppointmentModal(event)}
      >
        ערוך תור
      </button>
    </div>
  );

  const handleSaveAppointment = async (updatedAppointment: any) => {
    const appointmentId = updatedAppointment.id;
    const date = new Date(updatedAppointment.start);
    const time = updatedAppointment.time;
    try {
      await dispatch(updateAppointmentAction(appointmentId, date, time));
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  useEffect(() => {
    if (success) {
      toast.success('Appointment updated successfully');
      setOpenModal(false);
      setSelectedAppointment(null);
    }
  }, [success]);

  const formattedAppointments =
    appointments?.length > 0 &&
    appointments.map((appointment) => {
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
      <GlobalToast />
      {loading ? (
        <Loading />
      ) : error || errorUpdate ? (
        <div>{error}</div>
      ) : (
        <Calendar
          localizer={localizer}
          events={formattedAppointments || []}
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
          views={['month', 'week', 'day', 'agenda']}
          components={{
            agenda: {
              event: AgendaEvent,
            },
          }}
        />
      )}

      <EditAppointmentModal
        openModal={openModal}
        appointment={selectedAppointment}
        onSave={handleSaveAppointment}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default DashboardUi;
