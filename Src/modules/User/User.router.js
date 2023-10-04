import express from "express";
import * as userController from './User.controller.js';
import { Auth } from './../../middleware/auth.js';
import { asyncHandler } from "../../middleware/errorHandling.js";
import fileUpload from '../../services/multer.js';
const app = express();

app.get('/', userController.getUsers);
app.get('/profile', fileUpload().single('image'), asyncHandler(Auth), userController.profile);
app.delete('/delete', asyncHandler(Auth), asyncHandler(userController.deleteUser));

export default app;


