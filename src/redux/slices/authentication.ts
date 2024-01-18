import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { dispatch } from '../store';
import {
  AuthenticationState,
  LoginRequestType,
  LoginResponseType,
  RegisterRequestType,
} from 'src/types/redux/authentication';
import { getUser } from './user';
import { localStorageConfig } from 'src/config';
import toast from 'react-hot-toast';

type RegisterFailureAction = PayloadAction<string>;
type LoginFailureAction = PayloadAction<string>;
type ForgotPasswordFailureAction = PayloadAction<string>;
type ResetPasswordFailureAction = PayloadAction<string>;

const initialState: AuthenticationState = {
  loading: false,
  isAuthenticated: false,
  errorMessage: '',
  forgotEmailSent: false,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    // REGISTER
    registerRequest: (state: AuthenticationState) => {
      state.loading = true;
    },
    registerSuccess: (state: AuthenticationState) => {
      state.loading = false;
    },
    registerFailure: (state: AuthenticationState, action: RegisterFailureAction) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    // LOGIN
    loginRequest: (state: AuthenticationState) => {
      state.loading = true;
    },
    loginSuccess: (state: AuthenticationState) => {
      state.loading = false;
      state.isAuthenticated = true;
    },
    loginFailure: (state: AuthenticationState, action: LoginFailureAction) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    // LOGOUT
    logout: (state: AuthenticationState) => {
      state.isAuthenticated = false;
    },
    // FORGOT PASSWORD
    forgotPasswordRequest: (state: AuthenticationState) => {
      state.forgotEmailSent = false;
      state.loading = true;
    },
    forgotPasswordSuccess: (state: AuthenticationState) => {
      state.forgotEmailSent = true;
      state.loading = false;
    },
    forgotPasswordFailure: (state: AuthenticationState, action: ForgotPasswordFailureAction) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    // RESET PASSWORD
    resetPasswordRequest: (state: AuthenticationState) => {
      state.loading = true;
    },
    resetPasswordSuccess: (state: AuthenticationState) => {
      state.loading = false;
    },
    resetPasswordFailure: (state: AuthenticationState, action: ResetPasswordFailureAction) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
  },
});

export const register = (registerData: RegisterRequestType) => {
  return async () => {
    try {
      dispatch(authenticationSlice.actions.registerRequest());
      await axios.post('/auth/signup', registerData);
      dispatch(authenticationSlice.actions.registerSuccess());
      toast.success('Registration saved! Please check your email for confirmation.');
    } catch (error) {
      const errorMessage: string = error.response
        ? error.response.data.message
        : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(authenticationSlice.actions.registerFailure(errorMessage));
    }
  };
};

export const login = (loginData: LoginRequestType) => {
  return async () => {
    try {
      dispatch(authenticationSlice.actions.loginRequest());
      const result: AxiosResponse<LoginResponseType> = await axios.post('/auth/login', loginData);
      const token: string | null = result.data ? result.data.accessToken : null;
      if (token) {
        const jwt = token;
        localStorage.setItem(localStorageConfig.accessToken, jwt);
      }

      dispatch(authenticationSlice.actions.loginSuccess());
      dispatch(getUser());
    } catch (error) {
      const errorMessage: string = error.response
        ? error.response.data.message
        : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(authenticationSlice.actions.loginFailure(errorMessage));
    }
  };
};

export const logout = () => {
  return () => {
    dispatch(authenticationSlice.actions.logout());
    localStorage.removeItem(localStorageConfig.accessToken);
  };
};

export const forgotPassword = (email: string) => {
  return async () => {
    try {
      dispatch(authenticationSlice.actions.forgotPasswordRequest());
      await axios.post(`/auth/reset/reset-password`, {
        email,
      });
      dispatch(authenticationSlice.actions.forgotPasswordSuccess());
      toast.success('Please check your email for reset password link!');
    } catch (error) {
      const errorMessage: string = error.response
        ? error.response.data.message
        : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(authenticationSlice.actions.forgotPasswordFailure(errorMessage));
    }
  };
};

export const resetPassword = (key: string, newPassword: string) => {
  return async () => {
    try {
      dispatch(authenticationSlice.actions.resetPasswordRequest());
      await axios.post(`/auth/reset/reset-password/${key}`, {
        password: newPassword,
      });
      dispatch(authenticationSlice.actions.resetPasswordSuccess());
      toast.success('Your password has been successfully updated!');
    } catch (error) {
      const errorMessage: string = error.response
        ? error.response.data.message
        : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(authenticationSlice.actions.resetPasswordFailure(errorMessage));
    }
  };
};

export default authenticationSlice.reducer;
