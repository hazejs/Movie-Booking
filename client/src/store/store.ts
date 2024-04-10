import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import movieSlice from './movieSlice';
import authReducer from './authSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};
const persistMovieConfig = {
  key: 'movie',
  version: 1,
  storage,
};

//Create persist reducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedMovieReducer = persistReducer(persistMovieConfig, movieSlice);

// Create the Redux store
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    movies: persistedMovieReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const persistor = persistStore(store);
export default store;
