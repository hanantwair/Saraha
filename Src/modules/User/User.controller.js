import userModel from '../../../DB/Models/User.model.js';
import cloudinary from '../../services/cloudinary.js'
import bcrypt from 'bcryptjs';

export const getUsers = async (req, res, next) => {
    const users = await userModel.find();

    if (!users) {
        return next(new Error("No Users"));
    }

    return res.json({ message: "success", users });
}

export const deleteUser = async (req, res, next) => {
    const id = req.user._id;
    const user = await userModel.findByIdAndDelete({ _id: id });
    if (!user) {
        return next(new Error("User not found"));
    }
    return res.status(200).json({ message: "success", user });
}

export const profile = async (req, res, next) => {
    if (!req.file) {
        return next(new Error('Please Provide a File'));
    }
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
        folder: `${process.env.APP_NAME}/user/${req.user._id}/profile`
    });
    const user = await userModel.findByIdAndUpdate(req.user._id,
        { profilepic: { secure_url, public_id } }, { new: false });

    if (user.profilepic) {
        await cloudinary.uploader.destroy(user.profilepic.public_id);
    }
    return res.status(200).json({ message: 'success', user });
}

export const coverPic = async (req, res, next) => {
    if (!req.files) {
        return next(new Error('Please Provide a File'));
    }
    const coverPic = [];
    for (const file of req.files) {
        coverPic.push(file.dest);
    }
    const user = await userModel.findByIdAndUpdate(req.user._id,
        { cover: coverPic }, { new: true });
    return res.status(200).json({ message: "success", user });
}

export const updatePassword = async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const user = await userModel.findById(req.user._id);
    const match = bcrypt.compareSync(oldPassword, user.password);

    if (!match) {
        return next(new Error('invalid old password'));
    }

    const hashedPassword = bcrypt.hashSync(newPassword, parseInt(process.env.SALTROUND));
    user.password = hashedPassword;
    user.save();
    return res.json(user);
}

export const shareProfile = async (req, res, next) => {
    const user = await userModel.findById(req.params.id).select('userName email');

    if (!user) {
        return next(new Error('user not found'));
    }

    return res.json({ message: "success", user });
};