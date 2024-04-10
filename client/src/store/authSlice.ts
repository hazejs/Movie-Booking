import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import api from '../services/axios';
import { toast } from 'react-toastify';
import { LOGIN_SUCCESS, REGISTER_SUCCESS } from '../utils/consts';
import { storeToken } from '../utils/functions';

interface AuthState {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  token: null,
};

export const loginUser = createAsyncThunk(
  '/auth/login',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await api.post('/auth/login', credentials);

      if (response.status !== 200) {
        throw new Error('Login failed');
      }
      storeToken(response.data.token);
      api.defaults.headers.common['authorization'] = response.data.token;
      toast(LOGIN_SUCCESS);

      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const registerUser = createAsyncThunk(
  '/auth/register',
  async (
    credentials: {
      email: string;
      username: string;
      password: string;
      isAdmin: boolean;
    },
    thunkAPI
  ) => {
    try {
      const response = await api.post('/auth/register', credentials);

      if (response.status !== 201) {
        throw new Error('Login failed');
      }

      toast(REGISTER_SUCCESS);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthState(state) {
      console.log('clearAuthState');
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
      delete api.defaults.headers.common['authorization'];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: any) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error =
          action.payload.error.response.data.message || 'Login failed';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: any) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload.error.message || 'Register failed';
      });
  },
});

export const { clearAuthState } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
