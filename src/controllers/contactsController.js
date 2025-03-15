import { Contact } from "../models/contact.js";
import createError from "http-errors";

export const getContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find({});
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
            throw createError(404, "Contact not found");
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
            throw createError(404, "Contact not found");
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
            throw createError(404, "Contact not found");
        }

        res.json({ message: "Contact deleted" });
    } catch (error) {
        next(error);
    }
};
