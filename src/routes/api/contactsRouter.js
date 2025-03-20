import express from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { contactSchema } from "../schemas/contactSchema.js";
import * as contactsController from "../controllers/contactsController.js";

const router = express.Router();

router.get("/", contactsController.getAllContacts);
router.get("/:id", contactsController.getContactById);
router.post("/", validateBody(contactSchema), contactsController.addContact);
router.patch("/:id", validateBody(contactSchema), contactsController.updateContact);
router.delete("/:id", contactsController.deleteContact);
export default router;

