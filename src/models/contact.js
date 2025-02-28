import mongoose from 'mongoose';
import { Contact } from '../models/contact.js';
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  isFavourite: {
    type: Boolean,
    default: false,
  },
  contactType: {
    type: String,
    enum: ['work', 'home', 'personal'],
    default: 'personal',
  },
}, { timestamps: true, versionKey: false }); 

export const Contact = mongoose.model('Contact', contactSchema, 'contacts');

export const getContactByIdService = async (contactId) => {
    try {
      const contact = await Contact.findById(contactId);
      return contact;
    } catch (error) {
      throw error;
    }
  };