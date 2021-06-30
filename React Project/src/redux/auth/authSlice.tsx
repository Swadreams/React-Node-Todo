import { createSlice } from '@reduxjs/toolkit';
import {
  anyPendingAction,
  anyFulfilledAction,
  anyLoadAction,
} from '../common/asyncActions';
import { logoutAsync } from './authAsync';

const initialState = {
  email: null,
  isSignedIn: false,
  token: null,
  loading: false,
  message: null,
  profile: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action) => {
      return {
        ...state,
        ...action.payload,
        isSignedIn: true,
      };
    },
    signOut: (state, action) => {
      state.isSignedIn = false;
      state.email = null;
      state.token = null;
    },
    authMessage: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearAuthMessage: (state) => {
      state.message = null;
    },
    logOut: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    return builder
      .addCase(logoutAsync.fulfilled, (state, action) => {
        console.log('auth reducer logout');
        return { ...initialState };
      })
      .addMatcher(anyPendingAction, (state, action) => {
        state.loading = true;
      })
      .addMatcher(anyFulfilledAction, (state, action) => {
        state.loading = false;
      })
      .addMatcher(anyLoadAction, (state, action) => {
        return { ...initialState, loading: false };
      });
  },
});

export const { signIn, signOut, authMessage, clearAuthMessage, logOut } =
  authSlice.actions;

export default authSlice.reducer;
