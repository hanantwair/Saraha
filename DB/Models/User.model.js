import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    confirmEmail: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        default: 'Male',
        enum: ['Male', 'Female'],
    },
    age: {
        type: Number,
        required: true,
        min: 20,
        max: 80
    },
    profilepic: {
        type: Object,
    },
    cover: {
        type: [String],
    }
}, {
    timestamps: true,

});

const userModel = mongoose.model.User || model('User', userSchema);

export default userModel;