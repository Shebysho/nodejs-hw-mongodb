const { Contact } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");
const mongoose = require("mongoose");

const getAll = async (req, res) => {
  const { page = 1, perPage = 10, sortBy = "name", sortOrder = "asc" } = req.query;
  const skip = (page - 1) * perPage;

  const contacts = await Contact.find({})
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 });

  const totalItems = await Contact.countDocuments();
  const totalPages = Math.ceil(totalItems / perPage);

  res.json({
    status: 200,
    message: "Successfully found contacts!",
    data: {
      data: contacts,
      page: Number(page),
      perPage: Number(perPage),
      totalItems,
      totalPages,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
    },
  });
};

const getById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw HttpError(400, "Invalid ID format");
  }

  const contact = await Contact.findById(id);
  if (!contact) {
    throw HttpError(404, "Contact not found");
  }

  res.json({ status: 200, message: "Contact found!", data: contact });
};

const add = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json({ status: 201, message: "Contact added!", data: contact });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw HttpError(400, "Invalid ID format");
  }

  const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!contact) {
    throw HttpError(404, "Contact not found");
  }

  res.json({ status: 200, message: "Contact updated!", data: contact });
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw HttpError(400, "Invalid ID format");
  }

  const contact = await Contact.findByIdAndDelete(id);
  if (!contact) {
    throw HttpError(404, "Contact not found");
  }

  res.status(204).send();
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
