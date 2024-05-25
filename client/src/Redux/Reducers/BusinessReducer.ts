import {
  GET_ALL_BUSINESS_FAIL,
  GET_ALL_BUSINESS_REQUEST,
  GET_ALL_BUSINESS_SUCCESS,
  GET_SINGLE_BUSINESS_FAIL,
  GET_SINGLE_BUSINESS_REQUEST,
  GET_SINGLE_BUSINESS_SUCCESS,
} from '../Constants/BusinessConstant';

export const getAllBusinessReducer = (state = {}, action: any) => {
  switch (action.type) {
    case GET_ALL_BUSINESS_REQUEST:
      return { loading: true };
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
