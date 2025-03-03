import express from 'express';
import cors from 'cors';
import pino from 'pino';
import dotenv from 'dotenv';
import { getAllContactsController, getContactByIdController } from './controllers/contactsController.js';
dotenv.config();

const logger = pino();

export const setupServer = () => {
  const app = express();


  app.use(cors());
  app.use(express.json());

  app.use((req, res, next) => {
    logger.info({
      method: req.method,
      url: req.url,
      queryParams: req.query,
      body: req.body,
    });
    next();
  });
  app.get('/contacts', getAllContactsController);
  app.get('/contacts/:contactId', getContactByIdController);
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.use((err, req, res, next) => {
    logger.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });

  return app;
};