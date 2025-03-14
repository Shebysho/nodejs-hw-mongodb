import { Contact } from "../models/contact.js";

export const getContacts = async (req, res) => {
  const { page = 1, perPage = 10, sortBy = "name", sortOrder = "asc", isFavourite } = req.query;
  const filter = isFavourite ? { isFavourite: isFavourite === "true" } : {};
  const sortOptions = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

  const totalItems = await Contact.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / perPage);
  const contacts = await Contact.find(filter)
    .sort(sortOptions)
    .skip((page - 1) * perPage)
    .limit(Number(perPage));

  res.json({
    status: 200,
    message: "Successfully found contacts!",
    data: {
      contacts,
      page: Number(page),
      perPage: Number(perPage),
      totalItems,
      totalPages,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
    },
  });
};

export const addContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json({ status: 201, message: "Contact added!", data: newContact });
};

export const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!updatedContact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.json({ status: 200, message: "Contact updated!", data: updatedContact });
};
