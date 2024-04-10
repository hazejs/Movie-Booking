import mongoose, { ObjectId } from 'mongoose';

export interface IShowtime extends mongoose.Document {
  movieId: ObjectId;
  duration: number;
  date: Date;
  seats: {
    row: number;
    seat: number;
    isBooked: boolean;
    isAvailable: boolean;
  }[][];
}

const showtimeSchema = new mongoose.Schema<IShowtime>({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  duration: { type: Number, required: true }, // in minutes
  date: { type: Date }, // timestamp for scheduled showing
  seats: {
    type: [[]], // Use a nested array for 2D structure
    default: (): {
      row: number;
      seat: number;
      isBooked: boolean;
      isAvailable: boolean;
    }[][] => {
      const rows = 10;
      const seatsPerRow = 10;
      return Array(rows)
        .fill(null)
        .map((_, rowIndex) =>
          Array(seatsPerRow)
            .fill(null)
            .map((_, seatIndex) => ({
              row: rowIndex + 1,
              seat: seatIndex + 1,
              isBooked: false,
              isAvailable: true,
            }))
        );
    },
  },
});

export default mongoose.model<IShowtime>('Showtime', showtimeSchema);
