import userModel from '../../../DB/Models/User.model.js';
import cloudinary from '../../services/cloudinary.js'

export const getUsers = async (req, res) => {
    const users = await userModel.find();

    if (!users) {
        return res.json({ message: 'No Users' });
    }

    return res.json({ message: "success", users });
}

export const profile = async (req, res) => {
    // const imgurl = req.file.destination + '/' + req.file.filename;

    const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
        folder: `${process.env.APP_NAME}/user/${req.user._id}/profile`
    });
    const user = await userModel.findByIdAndUpdate(req.user._id, { profilepic: secure_url }, { new: true });

    return res.status(200).json({ message: user });

}


export const deleteUser = async (req, res) => {
    const id = req.user._id;
    const user = await userModel.findByIdAndDelete({ _id: id });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "success", user });
}