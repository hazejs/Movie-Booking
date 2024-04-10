import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/axios';
import { toast } from 'react-toastify';

export const getMovies = createAsyncThunk('/movie/all', async (thunkAPI) => {
  try {
    const response = await api.get('/movie/all');

    if (response.status !== 200) {
      throw new Error('get Movie Failed');
    }

    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
    throw new Error('get Movie Failed');
  }
});

export const createNewMovie = createAsyncThunk(
  '/movie',
  async (
    credentials: {
      title: string;
      duration: number;
      description: string;
      showtimes: any;
    },
    thunkAPI
  ) => {
    const timestamps = credentials.showtimes.map((showtime: any) => {
      return showtime.valueOf();
    });

    credentials.showtimes = timestamps;

    try {
      const response = await api.post('/movie', credentials);

      if (response.status !== 201) {
        throw new Error('get Movie Failed');
      }
      toast.success('Created New Movie');
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw new Error('get Movie Failed');
    }
  }
);

export const getAllShowtimesByMovieId = createAsyncThunk(
  '/showtime',
  async (movieId: string, thunkAPI) => {
    try {
      const response = await api.get(`/showtime/${movieId}`);
      if (response.status !== 200) {
        throw new Error('get Movie Showtimes Failed');
      }

      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw new Error('get getAllShowtimesByMovieId Failed');
    }
  }
);

export const orderMovie = createAsyncThunk(
  '/order',
  async (
    credentials: {
      movieId: string;
      userId: string;
      seatRow: number;
      seatNumber: number;
      showtimeId: number;
    },
    thunkAPI
  ) => {
    try {
      const response = await api.post('/order', credentials);

      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Order failed');
      }

      toast.success('Booked Successfuly');
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const deleteMovieByID = createAsyncThunk(
  '/delete/movie',
  async (movieId: string) => {
    try {
      const response = await api.delete(`/movie/${movieId}`);

      if (response.status !== 200) {
        throw new Error('get Movie Showtimes Failed');
      }

      toast.success('Movie Deleted Successfully');
      return movieId;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw new Error('get getAllShowtimesByMovieId Failed');
    }
  }
);
