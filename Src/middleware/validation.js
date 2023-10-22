import joi from 'joi';
const dataMethods = ['body', 'query', 'params', 'headers', 'file'];

import { Types } from 'mongoose';

export const validationObjectId = (value, helper) => {
    if (Types.ObjectId.isValid(value)) {
        return true;
    }
    return helper.message();
}

export const generalFields = {
    id: joi.string().min(24).max(24).custom(validationObjectId).required(),
    email: joi.string().email().required().min(5).messages({
        'string.email': "plz enter a valid email",
        'string.empty': "email is required",
    }),
    password: joi.string().required().min(3).messages({
        'string.empty': "password is required",
    }),
    file: joi.object({
        size: joi.number().positive().required(),
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string().required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        dest: joi.string(),
    }),
}

const validation = (schema) => {
    return (req, res, next) => {
        const validationArray = [];
        dataMethods.forEach(key => {
            if (schema[key]) {
                const validationResult = schema[key].validate(req[key], { abortEarly: false });
                if (validationResult.error) {
                    validationArray.push(validationResult.error.details);
                }
            }
        })
        if (validationArray.length > 0) {
            return res.json({ message: 'validation error', validationArray });
        } else {
            return next();
        }
    }
}
export default validation;