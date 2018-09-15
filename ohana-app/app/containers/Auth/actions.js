/*
 *
 * Auth actions
 *
 */
import axios from 'axios';
import { SET_USER_DATA, LOADING_USER_DATA, USER_LOGOUT } from './constants';

export const loginUser = (email, password) => async dispatch => {
  dispatch({ type: LOADING_USER_DATA });
  try {
    const { data } = await axios.post(
      'https://back-p2.herokuapp.com/login',
      {
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
      },
    );
    console.log(data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
