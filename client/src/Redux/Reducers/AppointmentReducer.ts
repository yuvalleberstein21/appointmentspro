import {
  CREATE_APPOINTMENT_FAIL,
  CREATE_APPOINTMENT_REQUEST,
  CREATE_APPOINTMENT_SUCCESS,
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
