import axios from 'axios';
import {
  CREATE_APPOINTMENT_FAIL,
  CREATE_APPOINTMENT_REQUEST,
  CREATE_APPOINTMENT_SUCCESS,
} from '../Constants/AppointmentConstant';

export const createAppointmentAction =
  (
    businessId: string,
    serviceId: string,
    appointmentDate: Date,
    appointmentTime: string
  ) =>
  async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: CREATE_APPOINTMENT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      if (!userInfo || !userInfo.token) {
        throw new Error('User not authenticated');
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/appointment/createappointment`,
        { businessId, serviceId, appointmentDate, appointmentTime },
        config
      );
      dispatch({
        type: CREATE_APPOINTMENT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: CREATE_APPOINTMENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      throw new Error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };
