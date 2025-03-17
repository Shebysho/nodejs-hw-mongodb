const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const contactsRouter = require("./routes/api/contacts");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(logger("dev"));
app.use(cors());
app.use(express.json());

app.use("/contacts", contactsRouter);
app.use(errorHandler);

module.exports = app;
