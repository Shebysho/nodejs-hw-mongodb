import Contact from "../models/contact.js";
import { HttpError } from "../helpers/index.js";

export const getContacts = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, sortBy = "name", sortOrder = "asc" } = req.query;
    const skip = (page - 1) * perPage;
    const sort = { [sortBy]: sortOrder === "desc" ? -1 : 1 };

    const contacts = await Contact.find().skip(skip).limit(Number(perPage)).sort(sort);
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      throw HttpError(404, "Contact not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export const addContact = async (req, res, next) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedContact) {
      throw HttpError(404, "Contact not found");
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      throw HttpError(404, "Contact not found");
    }
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    next(error);
  }
};
