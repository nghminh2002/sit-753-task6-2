import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { dispatch } from '../store';

const initialState = {
  loading: false,
  isAuthenticated: false,
  errorMessage: '',
};

export type AuthenticationState = Readonly<typeof initialState>;

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state) => {
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload.response
        ? action.payload.response.data.message
        : 'Something went wrong';
    },
  },
});

export const login = () => {
  return async () => {
    try {
      dispatch(authenticationSlice.actions.loginRequest());

      const result = await axios.post('/auth/login', {
        email: 'milly.nguyen@starack.net',
        password: 'starack123',
      });
      const token = result.data.accessToken;
      if (token) {
        const jwt = token;
        localStorage.setItem('jwt-access-token', jwt);
      }

      dispatch(authenticationSlice.actions.loginSuccess());
    } catch (error) {
      dispatch(authenticationSlice.actions.loginFailure(error));
    }
  };
};

export default authenticationSlice.reducer;
