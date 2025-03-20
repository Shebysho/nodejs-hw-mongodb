import Contact from "../models/contact.js";
import mongoose from "mongoose";
import { HttpError } from "../utils/HttpError.js";

export const getAllContacts = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, sortBy = "name", order = "asc" } = req.query;
        const skip = (page - 1) * limit;
        const sortOrder = order === "desc" ? -1 : 1;

        const contacts = await Contact.find()
            .skip(skip)
            .limit(Number(limit))
            .sort({ [sortBy]: sortOrder });

        const total = await Contact.countDocuments();

        res.json({
            status: "success",
            message: "Contacts retrieved",
            data: { contacts, total, page: Number(page), totalPages: Math.ceil(total / limit) },
        });
    } catch (error) {
        next(error);
    }
};

export const getContactById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new HttpError(400, "Invalid contact ID format");
        }

        const contact = await Contact.findById(id);
        if (!contact) {
            throw new HttpError(404, "Contact not found");
        }

        res.json({ status: "success", message: "Contact found", data: contact });
    } catch (error) {
        next(error);
    }
};

export const addContact = async (req, res, next) => {
    try {
        const contact = await Contact.create(req.body);
        res.status(201).json({ status: "success", message: "Contact added", data: contact });
    } catch (error) {
        next(error);
    }
};

export const updateContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new HttpError(400, "Invalid contact ID format");
        }

        const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedContact) {
            throw new HttpError(404, "Contact not found");
        }

        res.json({ status: "success", message: "Contact updated", data: updatedContact });
    } catch (error) {
        next(error);
    }
};

export const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new HttpError(400, "Invalid contact ID format");
        }

        const deletedContact = await Contact.findByIdAndDelete(id);
        if (!deletedContact) {
            throw new HttpError(404, "Contact not found");
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
