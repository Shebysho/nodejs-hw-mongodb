import Contact from "../models/contact.js";
import { ctrlWrapper } from "../helpers/index.js";

const getAllContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.json(contact);
};

const addContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedContact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.json(updatedContact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const deletedContact = await Contact.findByIdAndDelete(id);
  if (!deletedContact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.json({ message: "Contact deleted" });
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
};
