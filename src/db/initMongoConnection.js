import mongoose from 'mongoose';

export const initMongoDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI; 

    if (!mongoURI) {
      throw new Error('MONGODB_URI не встановлено в змінних середовища!');
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.error('Error while setting up mongo connection', e);
    throw e; 
  }
};