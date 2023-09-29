import express from "express";
import * as messageController from './Messages.controller.js';
import { asyncHandler } from "../../middleware/errorHandling.js";
import { Auth } from '../../middleware/auth.js';
const app = express();

app.get('/', asyncHandler(Auth), messageController.getMessages);
app.post('/:receiverId', asyncHandler(messageController.sendMessages));

export default app;


