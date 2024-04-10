import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

import {
  getMovies,
  createNewMovie,
  getAllShowtimesByMovieId,
  orderMovie,
  deleteMovieByID,
} from '../store/actions/movie-actions';

interface Movie {
  title: string;
  description: string;
  duration: number;
  image?: string;
  showtimes: Date[];
}

interface IShowtime {
  movieId: string;
  duration: number;
  date: Date;
  seats: {
    row: number;
    seat: number;
    isBooked: boolean;
    isAvailable: boolean;
  }[][];
}

interface MoviesState {
  movies: Movie[];
  showtimes: IShowtime[];
  selectedMovie: any;
  selectedShowtime: any;
  loading: boolean;
  error: string | null;
  bookedSuccess: boolean;
}

const initialState: MoviesState = {
  movies: [],
  showtimes: [],
  selectedMovie: null,
  selectedShowtime: null,
  loading: false,
  error: null,
  bookedSuccess: false,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearMoviesState(state) {
      state.movies = [];
      state.showtimes = [];
      state.error = null;
      state.loading = false;
      state.selectedShowtime = null;
      state.selectedMovie = null;
      state.bookedSuccess = false;
    },
    setSelectedMovie(state, data) {
      state.error = null;
      state.loading = false;
      state.selectedMovie = data.payload;
    },
    setSelectedShowtime(state, data) {
      state.error = null;
      state.loading = false;
      state.selectedShowtime = data.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMovies.fulfilled, (state, action: any) => {
        state.loading = false;
        state.movies = action.payload;
        state.error = null;
      })
      .addCase(getMovies.rejected, (state, action: any) => {
        state.loading = false;
        // state.error =
        //   action.payload.error.response.data.message || 'Login failed';
      })

      .addCase(orderMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderMovie.fulfilled, (state, action: any) => {
        state.loading = false;
        state.error = null;
        state.bookedSuccess = true;
      })
      .addCase(orderMovie.rejected, (state, action: any) => {
        state.loading = false;
        state.bookedSuccess = false;
        state.error =
          action.payload.error.response.data.message || 'Fetch Movies failed';
      })

      .addCase(createNewMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewMovie.fulfilled, (state, action: any) => {
        state.loading = false;
        state.error = null;
        state.movies = [...state.movies, action.payload];
      })
      .addCase(createNewMovie.rejected, (state, action: any) => {
        state.loading = false;
        state.error =
          action.payload.error.response.data.message || 'Create Movie failed';
      })

      .addCase(getAllShowtimesByMovieId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllShowtimesByMovieId.fulfilled, (state, action: any) => {
        state.loading = false;
        state.error = null;
        state.showtimes = action.payload;
      })
      .addCase(getAllShowtimesByMovieId.rejected, (state, action: any) => {
        state.loading = false;
        // state.error =
        // action.payload.error.response.data.message || 'Create Movie failed';
      })

      .addCase(deleteMovieByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMovieByID.fulfilled, (state, action: any) => {
        state.movies = state.movies.filter(
          (movie: any) => movie._id !== action.payload
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteMovieByID.rejected, (state, action: any) => {
        state.loading = false;
        state.error =
          action.error.message ||
          action.payload.error.response.data.message ||
          'Delete Movie failed';
      });
  },
});

export const { clearMoviesState, setSelectedMovie, setSelectedShowtime } =
  movieSlice.actions;
export const selectMovies = (state: RootState) => state.movies;
export default movieSlice.reducer;
