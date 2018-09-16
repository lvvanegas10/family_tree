/*
 *
 * Auth actions
 *
 */

import { SET_USER_DATA, LOADING_USER_DATA, USER_LOGOUT } from './constants';

export const authStart = () => ({
  type: LOADING_USER_DATA,
});

export const authSuccess = (token, userData) => ({
  type: SET_USER_DATA,
  payload: {
    token,
    userData,
  },
});

export const authFail = () => ({
  type: USER_LOGOUT,
});

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationTime');
  return {
    type: USER_LOGOUT,
  };
};

export const checkSession = () => dispatch => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logout());
  } else {
    const expirationTime = new Date(localStorage.getItem('expirationTime'));
    if (expirationTime > new Date()) {
      dispatch(authSuccess(token, expirationTime));
    } else {
      dispatch(logout());
    }
  }
};
