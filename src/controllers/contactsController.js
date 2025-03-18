import Contact from "../models/Contact.js";
import HttpError from "../helpers/HttpError.js";
import { isValidObjectId } from "mongoose";

export const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        res.json({ status: "success", message: "Contacts retrieved", contacts });
    } catch (error) {
        next(error);
    }
};

export const getContactById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            throw new HttpError(400, "Invalid ID format");
        }
        const contact = await Contact.findById(id);
        if (!contact) {
            throw new HttpError(404, "Contact not found");
        }
        res.json({ status: "success", message: "Contact found", contact });
    } catch (error) {
        next(error);
    }
};

export const addContact = async (req, res, next) => {
    try {
        const newContact = await Contact.create(req.body);
        res.status(201).json({ status: "success", message: "Contact created", contact: newContact });
    } catch (error) {
        next(error);
    }
};

export const updateContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            throw new HttpError(400, "Invalid ID format");
        }
        const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedContact) {
            throw new HttpError(404, "Contact not found");
        }
        res.json({ status: "success", message: "Contact updated", contact: updatedContact });
    } catch (error) {
        next(error);
    }
};

export const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            throw new HttpError(400, "Invalid ID format");
        }
        const deletedContact = await Contact.findByIdAndDelete(id);
        if (!deletedContact) {
            throw new HttpError(404, "Contact not found");
        }
        res.status(204).send(); // No Content
    } catch (error) {
        next(error);
    }
};
