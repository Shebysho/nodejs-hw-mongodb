import express from "express";
import * as contactsController from "../controllers/contactsController.js";

const router = express.Router();

router.get("/", contactsController.getAllContacts);
router.get("/:contactId", contactsController.getContactById);
router.post("/", contactsController.addContact);
router.patch("/:contactId", contactsController.updateContact);
router.delete("/:contactId", contactsController.deleteContact);

export default router;
