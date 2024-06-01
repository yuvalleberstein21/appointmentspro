import {
  CREATE_BUSINESS_FAIL,
  CREATE_BUSINESS_REQUEST,
  CREATE_BUSINESS_SUCCESS,
  DELETE_BUSINESS_FAIL,
  DELETE_BUSINESS_REQUEST,
  DELETE_BUSINESS_SUCCESS,
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

export const getAllBusinessReducer = (
  state = { businesses: [] },
  action: any
) => {
  switch (action.type) {
    case GET_ALL_BUSINESS_REQUEST:
      return { loading: true, businesses: [] };
    case GET_ALL_BUSINESS_SUCCESS:
      return { loading: false, businesses: action.payload };
    case GET_ALL_BUSINESS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSingleBusinessReducer = (state = {}, action: any) => {
  switch (action.type) {
    case GET_SINGLE_BUSINESS_REQUEST:
      return { loading: true };
    case GET_SINGLE_BUSINESS_SUCCESS:
      return { loading: false, business: action.payload };
    case GET_SINGLE_BUSINESS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createBusinessReducer = (state = {}, action: any) => {
  switch (action.type) {
    case CREATE_BUSINESS_REQUEST:
      return { loading: true };
    case CREATE_BUSINESS_SUCCESS:
      return { loading: false, business: action.payload };
    case CREATE_BUSINESS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const editBusinessReducer = (state = {}, action: any) => {
  switch (action.type) {
    case EDIT_BUSINESS_REQUEST:
      return { loading: true };
    case EDIT_BUSINESS_SUCCESS:
      return { loading: false, business: action.payload };
    case EDIT_BUSINESS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userBusinessReducer = (state = {}, action: any) => {
  switch (action.type) {
    case GET_USER_BUSINESS_REQUEST:
      return { loading: true };
    case GET_USER_BUSINESS_SUCCESS:
      return { loading: false, business: action.payload };
    case GET_USER_BUSINESS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteBusinessReducer = (state = {}, action: any) => {
  switch (action.type) {
    case DELETE_BUSINESS_REQUEST:
      return { loading: true };
    case DELETE_BUSINESS_SUCCESS:
      return { loading: false, success: true };
    case DELETE_BUSINESS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
