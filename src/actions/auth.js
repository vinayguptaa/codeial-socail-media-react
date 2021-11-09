import { APIUrls } from '../helpers/urls';
import { getFormBody } from '../helpers/utils';
import { LOGIN_START } from './actionTypes';

export function loginStart() {
  return {
    type: LOGIN_START,
  };
}

export function login(email, password) {
    return (dispatch) => {
        const url = APIUrls.login();
        fetch(url, {
            method: POST,
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            body: getFormBody({email, password})// for like .../email=a@a.com&password=123
        })
    }
}