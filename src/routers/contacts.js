import express from "express";
import {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
} from "../controllers/contactsController.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import contactSchema from "../schemas/contactSchema.js";

const router = express.Router();

router.get("/", getContacts); 
router.get("/:contactId", isValidId, getContactById); 
router.post("/", validateBody(contactSchema), addContact); 
router.patch("/:contactId", isValidId, validateBody(contactSchema), updateContact); 
router.delete("/:contactId", isValidId, deleteContact);

export default router;

