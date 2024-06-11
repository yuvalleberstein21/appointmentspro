import { AppointmentData } from '../../Helpers/AppointmentType';
import { formatDate } from '../../Utils/FormatDate';
import { motion } from 'framer-motion';
import Loading from '../../Utils/Loading';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAppointmentAction,
  userAppointmentAction,
} from '../../Redux/Actions/AppointmentAction';

import { useParams } from 'react-router-dom';

const AppointmentList: React.FC<AppointmentData> = ({
  appointments,
  loading,
}) => {
  const dispatch = useDispatch<any>();
  const businessId = useParams();

  const handleDelete = async (appointmentId: string) => {
    try {
      await dispatch(deleteAppointmentAction(appointmentId));
      dispatch(userAppointmentAction(businessId.id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          {appointments?.length > 0 &&
            appointments.map((appointment: AppointmentData) => (
              <div
                className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5"
                key={appointment._id}
              >
                <div className="p-6 flex">
                  <div className="pr-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {formatDate(appointment.appointmentDate)}
                    </p>
                    <p>{appointment.appointmentTime}</p>
                  </div>
                  <div>
                    <div className="uppercase tracking-wide text-sm text-lime-500 font-semibold">
                      {appointment.business.name}
                    </div>
                    <p className="mt-2 text-gray-500">
                      {' '}
                      {appointment.service.name}
                    </p>
                    <button
                      className="mt-2 bg-red-500 text-white p-1 rounded-md w-full"
                      onClick={() => handleDelete(appointment._id)}
                    >
                      ביטול
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </motion.div>
      )}
    </>
  );
};

export default AppointmentList;
