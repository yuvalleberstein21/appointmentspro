import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { userLoginReducer, userRegisterReducer } from './Reducers/AuthReducer';
import {
  createBusinessReducer,
  getAllBusinessReducer,
  getSingleBusinessReducer,
} from './Reducers/BusinessReducer';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  getAllBusinesess: getAllBusinessReducer,
  getSingleBusiness: getSingleBusinessReducer,
  createBusiness: createBusinessReducer,
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
