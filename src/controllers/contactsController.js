import * as contactsService from "../services/contacts.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import createError from "http-errors";

export const getAllContacts = ctrlWrapper(async (req, res) => {
  const contacts = await contactsService.getAllContacts();
  res.status(200).json({
    status: 200,
    message: "Successfully found contacts!",
    data: contacts,
  });
});

export const getContactById = ctrlWrapper(async (req, res) => {
  const contact = await contactsService.getContactById(req.params.contactId);
  if (!contact) {
    throw createError(404, "Contact not found");
  }
  res.status(200).json({
    status: 200,
    message: "Successfully found contact!",
    data: contact,
  });
});

export const addContact = ctrlWrapper(async (req, res) => {
  const newContact = await contactsService.addContact(req.body);
  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data: newContact,
  });
});

export const updateContact = ctrlWrapper(async (req, res) => {
  const updatedContact = await contactsService.updateContact(req.params.contactId, req.body);
  if (!updatedContact) {
    throw createError(404, "Contact not found");
  }
  res.status(200).json({
    status: 200,
    message: "Successfully updated contact!",
    data: updatedContact,
  });
});

export const deleteContact = ctrlWrapper(async (req, res) => {
  const deletedContact = await contactsService.deleteContact(req.params.contactId);
  if (!deletedContact) {
    throw createError(404, "Contact not found");
  }
  res.status(204).send();
});
