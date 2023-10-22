import express from "express";
import * as userController from './User.controller.js';
import { Auth } from './../../middleware/auth.js';
import { asyncHandler } from "../../middleware/errorHandling.js";
import fileUpload, { fileValidation } from '../../services/multerCloudinary.js';
import * as validators from './User.validation.js';
import validation from '../../middleware/validation.js';
const app = express();

app.get('/', userController.getUsers);
app.delete('/delete', asyncHandler(Auth), asyncHandler(userController.deleteUser));

app.get('/profile', fileUpload(fileValidation.image).single('image'), asyncHandler(Auth),
    validation(validators.profile), asyncHandler(userController.profile));

app.patch('/cover', fileUpload(fileValidation.image).array('image', 5),
    asyncHandler(Auth), asyncHandler(userController.coverPic));

app.patch('/updatePassword', asyncHandler(Auth), validation(validators.updatePassword),
    asyncHandler(userController.updatePassword));

app.get('/:id/profile', validation(validators.shareProfile), asyncHandler(userController.shareProfile));

export default app;


