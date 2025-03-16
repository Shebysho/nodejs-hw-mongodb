import contactsController from "../controllers/contactsController.js";
import express from "express";

const router = express.Router();

router.get("/", contactsController.getAllContacts);
router.get("/:id", contactsController.getContactById);
router.post("/", contactsController.addContact);
router.put("/:id", contactsController.updateContact);
router.delete("/:id", contactsController.deleteContact);

export default router;
