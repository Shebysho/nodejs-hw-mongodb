import mongoose from 'mongoose';
import pino from 'pino';
await mongoose.connect(mongodbUri, { ... });
const logger = pino();

const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_URL,
  MONGODB_DB,
} = process.env;

const mongodbUri = `mongodb+srv://<span class="math-inline">\{MONGODB\_USER\}\:</span>{MONGODB_PASSWORD}@<span class="math-inline">\{MONGODB\_URL\}/</span>{MONGODB_DB}?retryWrites=true&w=majority`;

export const initMongoConnection = async () => {
  try {
    await mongoose.connect(mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Mongo connection successfully established!');
  } catch (error) {
    logger.error('Error connecting to MongoDB: ', error);
    process.exit(1);
  }
};