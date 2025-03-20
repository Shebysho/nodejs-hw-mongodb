import Joi from "joi";

export const contactSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    favorite: Joi.boolean().optional(),
});
