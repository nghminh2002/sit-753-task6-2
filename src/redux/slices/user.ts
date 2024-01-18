import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { dispatch } from '../store';
import { UserState, UserType } from 'src/types/redux/user';
import { Response } from 'src/types/redux/response';
import toast from 'react-hot-toast';

type GetUserSuccessdAction = PayloadAction<UserType | null>;
type GetUserFailureAction = PayloadAction<string>;

const initialState: UserState = {
  loading: false,
  user: null,
  errorMessage: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserRequest: (state: UserState) => {
      state.loading = true;
    },
    getUserSuccess: (state: UserState, action: GetUserSuccessdAction) => {
      state.loading = false;
      state.user = action.payload;
    },
    getUserFailure: (state: UserState, action: GetUserFailureAction) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
  },
});

export const getUser = () => {
  return async () => {
    try {
      dispatch(userSlice.actions.getUserRequest());

      const result: AxiosResponse<Response<UserType>> = await axios.get('/user/');
      dispatch(userSlice.actions.getUserSuccess(result.data.data ? result.data.data : null));
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : 'Something went wrong';
      toast.error(errorMessage);
      dispatch(userSlice.actions.getUserFailure(errorMessage));
    }
  };
};

export default userSlice.reducer;
