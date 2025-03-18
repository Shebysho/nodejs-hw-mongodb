import Joi from "joi";

export const contactValidationSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required()
});

export const validateBody = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ status: "error", message: error.details.map((d) => d.message).join(", ") });
    }
    next();
};
