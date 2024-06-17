import {
  CONFIRM_APPOINTMENT_FAIL,
  CONFIRM_APPOINTMENT_REQUEST,
  CONFIRM_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_FAIL,
  CREATE_APPOINTMENT_REQUEST,
  CREATE_APPOINTMENT_SUCCESS,
  DASHBOARD_APPOINTMENT_FAIL,
  DASHBOARD_APPOINTMENT_REQUEST,
  DASHBOARD_APPOINTMENT_RESET,
  DASHBOARD_APPOINTMENT_SUCCESS,
  DELETE_APPOINTMENT_FAIL,
  DELETE_APPOINTMENT_REQUEST,
  DELETE_APPOINTMENT_SUCCESS,
  GET_BUSINESS_APPOINTMENT_FAIL,
  GET_BUSINESS_APPOINTMENT_REQUEST,
  GET_BUSINESS_APPOINTMENT_SUCCESS,
  GET_USER_APPOINTMENT_FAIL,
  GET_USER_APPOINTMENT_REQUEST,
  GET_USER_APPOINTMENT_RESET,
  GET_USER_APPOINTMENT_SUCCESS,
  UPDATE_APPOINTMENT_FAIL,
  UPDATE_APPOINTMENT_REQUEST,
  UPDATE_APPOINTMENT_SUCCESS,
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
    case GET_USER_APPOINTMENT_RESET:
      return { appointment: {} };
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

export const dashboardAppointmentReducer = (state = [], action: any) => {
  switch (action.type) {
    case DASHBOARD_APPOINTMENT_REQUEST:
      return { loading: true };
    case DASHBOARD_APPOINTMENT_SUCCESS:
      return { loading: false, appointments: action.payload };
    case DASHBOARD_APPOINTMENT_FAIL:
      return { loading: false, error: action.payload };
    case DASHBOARD_APPOINTMENT_RESET:
      return { appointments: [] };
    default:
      return state;
  }
};

export const confirmAppointmentReducer = (state = {}, action: any) => {
  switch (action.type) {
    case CONFIRM_APPOINTMENT_REQUEST:
      return { loading: true };
    case CONFIRM_APPOINTMENT_SUCCESS:
      return { loading: false, appointments: action.payload };
    case CONFIRM_APPOINTMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateAppointmentReducer = (state = {}, action: any) => {
  switch (action.type) {
    case UPDATE_APPOINTMENT_REQUEST:
      return { loading: true };
    case UPDATE_APPOINTMENT_SUCCESS:
      return { loading: false, success: true, appointment: action.payload };
    case UPDATE_APPOINTMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
