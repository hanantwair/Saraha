import messageModel from '../../../DB/Models/Message.model.js';
import userModel from '../../../DB/Models/User.model.js';

export const getMessages = async (req, res,next) => {
    const Messages = await messageModel.find({ receiverId: req.user._id });
    if (!Messages) {
        return next(new Error("Messages not found"));
    }
    return res.status(201).json({ message: 'success', Messages });
}

export const sendMessages = async (req, res,next) => {
    const { receiverId } = req.params;
    const { message } = req.body;

    const user = await userModel.findById(receiverId);

    if (!user) {
        return next(new Error("user not found"));
    }

    const createMessage = await messageModel.create({ message, receiverId });
    return res.status(201).json({ createMessage });
}

