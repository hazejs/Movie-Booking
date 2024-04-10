import express from 'express';
import {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} from '../controllers/movie.controller';
import { isAdmin } from '../middlware/admin.middleware';

const router = express.Router();

router.post('/', isAdmin, createMovie);
router.get('/all', getAllMovies);
router.get('/:id', getMovieById);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

export default router;
