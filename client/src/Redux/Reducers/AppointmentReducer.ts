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

export const createAppointmentReducer = (state = {}, action: any) => {
  switch (action.type) {
    case CREATE_APPOINTMENT_REQUEST:
      return { loading: true };
    case CREATE_APPOINTMENT_SUCCESS:
      return { loading: false, appointment: action.payload };
    case CREATE_APPOINTMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const businessAppointmentReducer = (state = {}, action: any) => {
  switch (action.type) {
    case GET_BUSINESS_APPOINTMENT_REQUEST:
      return { loading: true };
    case GET_BUSINESS_APPOINTMENT_SUCCESS:
      return { loading: false, appointment: action.payload };
    case GET_BUSINESS_APPOINTMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userAppointmentReducer = (state = {}, action: any) => {
  switch (action.type) {
    case GET_USER_APPOINTMENT_REQUEST:
      return { loading: true };
    case GET_USER_APPOINTMENT_SUCCESS:
      return { loading: false, appointment: action.payload };
    case GET_USER_APPOINTMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteAppointmentReducer = (state = {}, action: any) => {
  switch (action.type) {
    case DELETE_APPOINTMENT_REQUEST:
      return { loading: true };
    case DELETE_APPOINTMENT_SUCCESS:
      return { loading: false, success: true, appointment: {} };
    case DELETE_APPOINTMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
