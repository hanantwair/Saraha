import joi from 'joi';
import { generalFields } from '../../middleware/validation.js';
export const signupSchema = {
    body: joi.object({
        userName: joi.string().alphanum().required(),
        email: generalFields.email,
        password: generalFields.password,
        age: joi.number().integer().min(20).max(80).required(),
        gender: joi.string().required().valid('Male', 'Female'),
        cpassword: joi.string().valid(joi.ref('password')).required(),
    }),
};

export const signinSchema = {
    body: joi.object({
        email: generalFields.email,
        password: generalFields.password,
    }),
};