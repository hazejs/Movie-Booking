import { useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '../store/store';
import {
  getAllShowtimesByMovieId,
  getMovies,
} from '../store/actions/movie-actions';
import TableComponent from '../components/movies/Table';
import { useSelector } from 'react-redux';
import { Box, Modal } from '@mui/material';
import { modalStyle } from '../styles/material';
import MovieFormComponent from '../components/movies/MovieForm';
import { clearMoviesState } from '../store/movieSlice';

interface ComponentProps {}

const AdminPage: React.FC<ComponentProps> = ({}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { movies, selectedMovie } = useSelector(
    (state: RootState) => state.movies
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getAllMovies = async () => {
      await dispatch(getMovies());
    };
    getAllMovies();
  }, []);

  useEffect(() => {
    const getShowtimes = async () => {
      if (!!selectedMovie)
        await dispatch(getAllShowtimesByMovieId(selectedMovie._id));
    };

    getShowtimes();

    return () => {
      dispatch(clearMoviesState());
    };
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='home-page-container'>
      <div className='admin-upper-container'>
        <div className='admin-title-container'>
          <h1>Welcome {user.username} (Admin)</h1>
          <p>Create Some New Movies...</p>
          <p>Add, Delete, Edit & Enjoy</p>
        </div>
        <div className='add-movie-btn'>
          <button onClick={handleOpen}>Add Movie</button>
        </div>
      </div>

      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby='keep-mounted-modal-title'
        aria-describedby='keep-mounted-modal-description'
      >
        <Box sx={modalStyle}>
          <MovieFormComponent callback={handleClose} isAdd />
        </Box>
      </Modal>

      <TableComponent isAdminPage />
    </div>
  );
};

export default AdminPage;
