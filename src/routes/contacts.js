const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const validateBody = require("../../middlewares/validateBody");
const { contactSchema } = require("../../schemas/contactSchema");

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);
router.post("/", validateBody(contactSchema), ctrl.add);
router.patch("/:id", validateBody(contactSchema), ctrl.updateById);
router.delete("/:id", ctrl.deleteById);

module.exports = router;
