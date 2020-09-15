import {
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN_FAIL,
  REGISTER_FAIL,
} from './types';
import axios from 'axios';
import { setAlert } from '../actions/alert';
import setAuthToken from '../utils/setAuthToken';

// Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.getItem('token'));
  }

  try {
    const res = await axios.get('/api/auth/');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register user
export const register = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const res = await axios.post('/api/users', formData, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      dispatch({
        type: REGISTER_FAIL,
      });
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Login user
export const login = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const res = await axios.post('/api/auth/', formData, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      dispatch({
        type: LOGIN_FAIL,
      });
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Logout
export const logout = (formData) => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
