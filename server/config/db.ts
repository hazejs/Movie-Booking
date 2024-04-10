import mongoose from 'mongoose';
const mongoUri: string =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/movie-booking';

export const runDB = async () => {
  try {
    mongoose.connect(mongoUri);
    const db = mongoose.connection;
    db.on('error', (error) => console.error(error));
    db.once('open', () => console.log('Connected to DB'));
  } catch (err) {
    process.exit(1);
  }
};
