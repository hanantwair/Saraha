import express from "express";
import * as authController from './Auth.controller.js';
import { asyncHandler } from "../../middleware/errorHandling.js";
import validation from "../../middleware/validation.js";
import { signinSchema, signupSchema } from "./Auth.validation.js";

const app = express();

app.post('/signup', validation(signupSchema), asyncHandler(authController.signup));
app.post('/signin', validation(signinSchema), asyncHandler(authController.signin));
app.get('/confirmEmail', asyncHandler(authController.confirmEmail));
app.get('/newConfirmEmail', asyncHandler(authController.newConfirmEmail));

export default app;
