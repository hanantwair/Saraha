import joi from 'joi';

export const signupSchema = ({
    userName: joi.string().alphanum().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    age: joi.number().integer().min(20).max(80).required(),
    gender: joi.string().required().valid('Male', 'Female'),
    cpassword: joi.string().valid(joi.ref('password')).required(),
});

export const signinSchema = joi.object({
    email: joi.string().email().required().min(5).messages({
        'string.email': "plz enter a valid email",
        'string.empty': "email is required",
    }),
    password: joi.string().required().min(3).messages({
        'string.empty': "password is required",
    }),
});