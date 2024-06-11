import axios from 'axios';
import {
  CREATE_APPOINTMENT_FAIL,
  CREATE_APPOINTMENT_REQUEST,
  CREATE_APPOINTMENT_SUCCESS,
  DELETE_APPOINTMENT_FAIL,
  DELETE_APPOINTMENT_REQUEST,
  DELETE_APPOINTMENT_SUCCESS,
  GET_BUSINESS_APPOINTMENT_FAIL,
  GET_BUSINESS_APPOINTMENT_REQUEST,
  GET_BUSINESS_APPOINTMENT_SUCCESS,
  GET_USER_APPOINTMENT_FAIL,
  GET_USER_APPOINTMENT_REQUEST,
  GET_USER_APPOINTMENT_SUCCESS,
} from '../Constants/AppointmentConstant';

export const createAppointmentAction =
  (
    business: string | undefined,
    service: string | null,
    appointmentDate: Date | null,
    appointmentTime: string | null
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
        { business, service, appointmentDate, appointmentTime },
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

export const businessAppointmentAction =
  (businessId: string) => async (dispatch: any) => {
    try {
      dispatch({ type: GET_BUSINESS_APPOINTMENT_REQUEST });

      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/appointment/businessAppointment/${businessId}`
      );
      dispatch({
        type: GET_BUSINESS_APPOINTMENT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GET_BUSINESS_APPOINTMENT_FAIL,
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

export const userAppointmentAction =
  (businessId: string | undefined) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: GET_USER_APPOINTMENT_REQUEST });

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
      let url = `${
        import.meta.env.VITE_API_BASE_URL
      }/appointment/userAppointment`;
      if (businessId) {
        url += `?businessId=${businessId}`;
      }
      const { data } = await axios.get(url, config);

      dispatch({
        type: GET_USER_APPOINTMENT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GET_USER_APPOINTMENT_FAIL,
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

export const deleteAppointmentAction =
  (appointmentId: string | undefined) =>
  async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: DELETE_APPOINTMENT_REQUEST });

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

      const { data } = await axios.delete(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/appointment/userAppointment/${appointmentId}`,
        config
      );

      dispatch({
        type: DELETE_APPOINTMENT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: DELETE_APPOINTMENT_FAIL,
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
