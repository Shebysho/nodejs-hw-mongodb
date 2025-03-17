import express from "express";
import { getAllContacts, getContactById, addContact, updateContact, deleteContact } from "../../controllers/contactsController.js";

const router = express.Router();

router.get("/", getAllContacts);
router.get("/:id", getContactById);
router.post("/", addContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;
