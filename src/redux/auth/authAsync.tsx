import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios/api';
import { clearAuthError, authError } from '../errorSlice';
import { LOGIN_URL, SIGNUP_URL } from '../urls';
import { authMessage, signIn } from './authSlice';

interface ILogin {
  username: string;
  password: string;
}

export const signInAsync = createAsyncThunk(
  'login',
  async (payload: ILogin, { dispatch }) => {
    dispatch(clearAuthError);
    try {
      const response = await API.post(LOGIN_URL, payload);
      if (response) {
        dispatch(
          signIn({
            email: payload.username,
            token: response.data.token,
            profile: response.data.user,
          })
        );
      }
    } catch (error) {
      dispatch(authError(error.response.data));
    }
  }
);

export const signUpAsync = createAsyncThunk(
  'signup',
  async (payload: any, { dispatch }) => {
    try {
      dispatch(clearAuthError);
      const response = await API.post(SIGNUP_URL, payload);
      if (response) {
        dispatch(
          authMessage({
            email: payload.username,
            message: response.data.message,
          })
        );
      }
    } catch (error) {
      dispatch(authError(error.response.data));
    }
  }
);

export const logoutAsync = createAsyncThunk('/signout', (payload: any) => {
  return payload;
});
