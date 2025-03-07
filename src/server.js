import express from "express";
import cors from "cors";
import contactsRouter from "./routers/contacts.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || "Something went wrong",
  });
});

export default app;
