import mongoose, { ObjectId } from 'mongoose';

export interface IOrder extends mongoose.Document {
  movieId: ObjectId;
  userId: ObjectId;
  seatRow: number;
  seatNumber: number;
  date: Date;
}

const orderSchema = new mongoose.Schema<IOrder>({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seatRow: { type: Number, required: true, min: 1, max: 10 },
  seatNumber: { type: Number, required: true, min: 1, max: 10 },
  date: { type: Date, required: true },
});

export default mongoose.model<IOrder>('Order', orderSchema);
