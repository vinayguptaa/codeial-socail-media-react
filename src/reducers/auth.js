import {
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCESS,
} from '../actions/actionTypes';

const initialAuthState = {
  user: {}, //the user obj by server
  error: null, //error by server, if any
  isLoggedIn: false,
  inProgress: false, //flag for disabling the login button until the login is in progress
};

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        inProgress: true,
      };
    case LOGIN_SUCESS:
      return {
        ...state,
        user: action.user,
        error: null,
        isLoggedIn: true,
        inProgress: false,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        error: action.error,
        inProgress: false,
      };

    default:
      return state;
  }
}
