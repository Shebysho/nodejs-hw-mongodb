import express from "express";
import { getContacts, addContact, updateContact } from "../controllers/contactsController.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import contactSchema from "../schemas/contactSchema.js";

const router = express.Router();

router.get("/", getContacts);
router.post("/contacts", validateBody(contactSchema), addContact);
router.patch("/:contactId", isValidId, validateBody(contactSchema), updateContact);

export default router;
