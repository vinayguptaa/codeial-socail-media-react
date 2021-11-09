import {
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCESS,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  AUTHENTICATE_USER,
  LOG_OUT,
  CLEAR_AUTH_STATE,
} from '../actions/actionTypes';

const initialAuthState = {
  user: {}, //the user obj by server
  error: null, //error by server, if any
  isLoggedIn: false,
  inProgress: false, //flag for disabling the login button until the login is in progress
};

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case CLEAR_AUTH_STATE:
      return {
        ...state,
        error: null,
      };
    case LOGIN_START:
    case SIGNUP_START:
      return {
        ...state,
        inProgress: true,
      };
    case LOGIN_SUCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.user,
        error: null,
        isLoggedIn: true,
        inProgress: false,
      };
    case LOGIN_FAILED:
    case SIGNUP_FAILED:
      return {
        ...state,
        error: action.error,
        inProgress: false,
      };
    case AUTHENTICATE_USER:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
      };
    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        user: {},
      };
    default:
      return state;
  }
}
