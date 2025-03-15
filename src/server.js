import express from "express";
import contactsRouter from "./routers/contacts.js";
import { initMongoConnection } from "./db/initMongoConnection.js";
export const app = express();
app.use(express.json());
app.use("/contacts", contactsRouter);

export const startServer = async () => {
  await initMongoConnection();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

export default app;
