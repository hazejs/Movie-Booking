import { Request, Response } from 'express';
import Showtime from '../models/showtime.model';

export const createShowtime = async (req: Request, res: Response) => {
  try {
    const { showtime } = req.body;
    if (!showtime) {
      return res
        .status(400)
        .json({ message: 'Missing required showtime details' });
    }

    // Validate showtime format (e.g., using a library like `date-fns`)

    const newShowtime = new Showtime({ showtime });
    await newShowtime.save();
    return res.status(201).json(newShowtime);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error creating showtime' });
  }
};

export const getAllShowtimes = async (req: Request, res: Response) => {
  try {
    const showtimes = await Showtime.find().populate('movie'); // Include associated movie details
    return res.status(200).json(showtimes);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error fetching showtimes' });
  }
};

export const getShowtimeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const showtime = await Showtime.findById(id).populate('movie');
    if (!showtime) {
      return res.status(404).json({ message: 'Showtime not found' });
    }
    return res.status(200).json(showtime);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error fetching showtime' });
  }
};

export const getShowtimesByMovieId = async (req: Request, res: Response) => {
  try {
    const { movieId } = req.params;
    const showtimes = await Showtime.find({ movieId }).populate('movieId');
    if (!showtimes) {
      return res.status(404).json({ message: 'Showtime not found' });
    }
    return res.status(200).json(showtimes);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error fetching showtime' });
  }
};

export const deleteShowtime = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedShowtime = await Showtime.findByIdAndDelete(id);
    if (!deletedShowtime) {
      return res.status(404).json({ message: 'Showtime not found' });
    }
    return res.status(200).json({ message: 'Showtime deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error deleting showtime' });
  }
};
