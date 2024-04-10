import mongoose, { ObjectId } from 'mongoose';

export interface IMovie extends mongoose.Document {
  title: string;
  description: string;
  duration: number;
  image?: string;
  showtimes: Date[];
}

const movieSchema = new mongoose.Schema<IMovie>({
  title: { type: String, required: true },
  showtimes: { type: [Date], required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  image: { type: String }, // Optional path to movie poster image
});

export default mongoose.model<IMovie>('Movie', movieSchema);
