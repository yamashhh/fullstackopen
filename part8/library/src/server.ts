import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import mongoose from 'mongoose';
dotenv.config();

const MONGODB_URI = process.env['MONGODB_URI'];
if (!MONGODB_URI) {
  throw new Error('Failed to read MONGODB_URI.');
}

(async (): Promise<void> => {
  try {
    console.log('connecting to', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('connected to MongoDB');
  } catch (error) {
    console.error('failed to connect MongoDB');
    console.dir(error);
  }
})();

mongoose.set('debug', true);
