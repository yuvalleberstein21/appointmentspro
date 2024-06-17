import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { userLoginReducer, userRegisterReducer } from './Reducers/AuthReducer';
import {
  createBusinessReducer,
  deleteBusinessReducer,
  editBusinessReducer,
  getAllBusinessReducer,
  getSingleBusinessReducer,
  userBusinessReducer,
} from './Reducers/BusinessReducer';
import {
  businessAppointmentReducer,
  confirmAppointmentReducer,
  createAppointmentReducer,
  dashboardAppointmentReducer,
  deleteAppointmentReducer,
  updateAppointmentReducer,
  userAppointmentReducer,
} from './Reducers/AppointmentReducer';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  getAllBusinesess: getAllBusinessReducer,
  getSingleBusiness: getSingleBusinessReducer,
  createBusiness: createBusinessReducer,
  editBusiness: editBusinessReducer,
  userBusiness: userBusinessReducer,
  deleteBusiness: deleteBusinessReducer,
  createAppointment: createAppointmentReducer,
  businessAppointment: businessAppointmentReducer,
  userAppointment: userAppointmentReducer,
  deleteAppointment: deleteAppointmentReducer,
  dashboardAppointments: dashboardAppointmentReducer,
  confirmAppointments: confirmAppointmentReducer,
  updateAppointment: updateAppointmentReducer,
});

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const store = configureStore({
  reducer,
  preloadedState: initialState,
});

export default store;
