import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { userLoginReducer, userRegisterReducer } from './Reducers/AuthReducer';
import { getAllBusinessReducer } from './Reducers/BusinessReducer';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  getAllBusinesess: getAllBusinessReducer,
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
