import express from 'express';
import { isAdmin } from '../middlware/admin.middleware';
import { getShowtimesByMovieId } from '../controllers/showtime.controller';
import { authenticateToken } from '../middlware/auth.middleware';

const router = express.Router();

router.get('/:movieId', authenticateToken, getShowtimesByMovieId);
// router.post('/', isAdmin, createMovie);
// router.get('/all', getAllMovies);
// router.get('/:id', getMovieById);
// router.put('/:id', updateMovie);
// router.delete('/:id', deleteMovie);

export default router;
