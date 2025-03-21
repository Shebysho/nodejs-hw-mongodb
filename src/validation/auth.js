import Joi from 'joi';
import { isValidObjectId } from 'mongoose';
import { EMAIL_REGEXP } from '../constants/index.js';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().pattern(EMAIL_REGEXP).required(),
  password: Joi.string().required(),
  userId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('User id should be a valid mongo id');
    }
    return true;
  }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().pattern(EMAIL_REGEXP).required(),
  password: Joi.string().required(),
});