import express, { Request, Response } from 'express';
import { runDB } from './config/db';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import movieRoutes from './routes/movie.routes';
import orderRoutes from './routes/order.routes';
import showtimeRoutes from './routes/showtime.routes';

dotenv.config();

const port = 5000;

type App = express.Application;
const app: App = express();
app.use(express.json());

runDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movie', movieRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/showtime', showtimeRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
