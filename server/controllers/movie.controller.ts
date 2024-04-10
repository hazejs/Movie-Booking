import { Request, Response } from 'express';
import Movie from '../models/movie.model';
import Showtime from '../models/showtime.model';

// Function to create a new movie
export const createMovie = async (req: Request, res: Response) => {
  try {
    const { title, description, duration, image, showtimes } = req.body;

    if (!title || !description || !duration || !showtimes) {
      return res
        .status(400)
        .json({ message: 'Missing required movie details' });
    }

    // Convert timestamps to valid Date objects
    const parsedShowtimes = showtimes.map(
      (timestamp: number) => new Date(timestamp)
    );

    // Calculate end times for requested showtimes
    const endTimes = parsedShowtimes.map(
      (startTime: Date) => new Date(startTime.getTime() + duration * 60000)
    );

    const conflictingShowtimes = await findConflictingShowtimes(
      parsedShowtimes,
      endTimes,
      duration
    );

    if (conflictingShowtimes.length > 0) {
      return res.status(400).json({
        message:
          'Movie creation failed. Another showtime already occupies this time slot.',
      });
    }

    const newMovie = new Movie({
      title,
      description,
      duration,
      image,
      showtimes: parsedShowtimes,
    });
    await newMovie.save();

    const showtimeDocs = parsedShowtimes.map((startTime: Date) => ({
      duration,
      movieId: newMovie._id,
      date: startTime,
    }));
    await Showtime.insertMany(showtimeDocs);

    return res.status(201).json(newMovie);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error creating movie' });
  }
};

async function findConflictingShowtimes(
  parsedShowtimes: Date[],
  endTimes: Date[],
  duration: number
) {
  const conflictingShowtimes = [];

  for (let i = 0; i < parsedShowtimes.length; i++) {
    const parsedShowtime = parsedShowtimes[i];
    const endTime = endTimes[i];

    // Check if any existing showtime overlaps with the new movie's showtime
    const conflict = await Showtime.findOne({
      movieId: { $ne: null },
      $or: [
        {
          date: {
            $gte: parsedShowtime,
            $lte: new Date(endTime.getTime() + duration * 60000),
          },
        },
        {
          date: {
            $lte: parsedShowtime,
            $gte: new Date(parsedShowtime.getTime() - duration * 60000),
          },
        },
      ],
    });

    if (conflict) {
      conflictingShowtimes.push(conflict);
    }
  }

  return conflictingShowtimes;
}

// Function to get all movies
export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const now = new Date();
    // Get all movies with showtimes
    const movies = await Movie.aggregate([
      {
        $lookup: {
          from: 'showtimes', // Assuming the name of the Showtime collection is 'showtimes'
          localField: '_id', // Field in Movie collection
          foreignField: 'movieId', // Field in Showtime collection
          as: 'showtimes', // Array of showtimes associated with each movie
        },
      },
      {
        $match: {
          'showtimes.date': { $gte: now }, // Filter movies with showtimes after current time
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          duration: 1,
          image: 1,
          showtimes: 1,
        },
      },
    ]);

    return res.status(200).json(movies);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error fetching movies' });
  }
};

// Function to get a single movie by ID
export const getMovieById = async (req: Request, res: Response) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    return res.status(200).json(movie);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error fetching movie' });
  }
};

// Function to update a movie by ID
export const updateMovie = async (req: Request, res: Response) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );
    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    return res.status(200).json(updatedMovie);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error updating movie' });
  }
};

// Function to delete a movie by ID
export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Delete showtimes related to the deleted movie
    await Showtime.deleteMany({ movieId: deletedMovie._id });
    return res.status(200).json({ deletedMovie });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error deleting movie' });
  }
};
