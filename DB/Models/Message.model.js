import mongoose, { Schema, model } from 'mongoose';

const messageSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

const messageModel = mongoose.model.Message || model('Message', messageSchema);

export default messageModel;