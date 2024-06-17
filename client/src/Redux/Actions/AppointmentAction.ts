import axios from 'axios';
import {
  CONFIRM_APPOINTMENT_FAIL,
  CONFIRM_APPOINTMENT_REQUEST,
  CONFIRM_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_FAIL,
  CREATE_APPOINTMENT_REQUEST,
  CREATE_APPOINTMENT_SUCCESS,
  DASHBOARD_APPOINTMENT_FAIL,
  DASHBOARD_APPOINTMENT_REQUEST,
  DASHBOARD_APPOINTMENT_SUCCESS,
  DELETE_APPOINTMENT_FAIL,
  DELETE_APPOINTMENT_REQUEST,
  DELETE_APPOINTMENT_SUCCESS,
  GET_BUSINESS_APPOINTMENT_FAIL,
  GET_BUSINESS_APPOINTMENT_REQUEST,
  GET_BUSINESS_APPOINTMENT_SUCCESS,
  GET_USER_APPOINTMENT_FAIL,
  GET_USER_APPOINTMENT_REQUEST,
  GET_USER_APPOINTMENT_SUCCESS,
  UPDATE_APPOINTMENT_FAIL,
  UPDATE_APPOINTMENT_REQUEST,
  UPDATE_APPOINTMENT_SUCCESS,
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

export const dashboardAppointmentAction =
  (businessId: string | undefined) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: DASHBOARD_APPOINTMENT_REQUEST });

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

      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/appointment/dashboardAppointments/${businessId}`,
        config
      );

      dispatch({
        type: DASHBOARD_APPOINTMENT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: DASHBOARD_APPOINTMENT_FAIL,
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

export const confirmAppointmentAction =
  (appointmentId: string | undefined) =>
  async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: CONFIRM_APPOINTMENT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      if (!userInfo || !userInfo.token) {
        throw new Error('User not authenticated');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/appointment/confirmAppointment/${appointmentId}`,
        {}, // This is the body of the request, empty in this case
        config
      );

      dispatch({
        type: CONFIRM_APPOINTMENT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: CONFIRM_APPOINTMENT_FAIL,
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

export const updateAppointmentAction =
  (appointmentId: string | undefined, date: Date, time: string) =>
  async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: UPDATE_APPOINTMENT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      if (!userInfo || !userInfo.token) {
        throw new Error('User not authenticated');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/appointment/updateAppointment/${appointmentId}`,
        { date, time }, // This is the body of the request, empty in this case
        config
      );

      dispatch({
        type: UPDATE_APPOINTMENT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: UPDATE_APPOINTMENT_FAIL,
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
