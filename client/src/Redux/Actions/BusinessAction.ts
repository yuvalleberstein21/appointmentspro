import axios from 'axios';
import {
  CREATE_BUSINESS_FAIL,
  CREATE_BUSINESS_REQUEST,
  CREATE_BUSINESS_SUCCESS,
  EDIT_BUSINESS_FAIL,
  EDIT_BUSINESS_REQUEST,
  EDIT_BUSINESS_SUCCESS,
  GET_ALL_BUSINESS_FAIL,
  GET_ALL_BUSINESS_REQUEST,
  GET_ALL_BUSINESS_SUCCESS,
  GET_SINGLE_BUSINESS_FAIL,
  GET_SINGLE_BUSINESS_REQUEST,
  GET_SINGLE_BUSINESS_SUCCESS,
  GET_USER_BUSINESS_FAIL,
  GET_USER_BUSINESS_REQUEST,
  GET_USER_BUSINESS_SUCCESS,
} from '../Constants/BusinessConstant';
import { Business } from '../../Helpers/BusinessType';

export const getAllBusinesessAction = () => async (dispatch: any) => {
  try {
    dispatch({ type: GET_ALL_BUSINESS_REQUEST });

    const { data } = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/business`
    );
    dispatch({
      type: GET_ALL_BUSINESS_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: GET_ALL_BUSINESS_FAIL,
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

export const getSingleBusinesessAction =
  (id: string | undefined) => async (dispatch: any) => {
    try {
      dispatch({ type: GET_SINGLE_BUSINESS_REQUEST });

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/business/${id}`
      );
      dispatch({
        type: GET_SINGLE_BUSINESS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GET_SINGLE_BUSINESS_FAIL,
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

export const createBusinesessAction =
  (business: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: CREATE_BUSINESS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/business/createbusiness`,
        business,
        config
      );
      dispatch({
        type: CREATE_BUSINESS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: CREATE_BUSINESS_FAIL,
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

export const userBusinesessAction =
  () => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: GET_USER_BUSINESS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/business/mybusiness`,
        config
      );
      dispatch({
        type: GET_USER_BUSINESS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GET_USER_BUSINESS_FAIL,
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

export const editBusinesessAction =
  (id: string, business: Business) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: EDIT_BUSINESS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/business/updatebusiness/${id}`,
        business,
        config
      );
      dispatch({
        type: EDIT_BUSINESS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: EDIT_BUSINESS_FAIL,
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
