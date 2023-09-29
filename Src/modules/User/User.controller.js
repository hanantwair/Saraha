import userModel from '../../../DB/Models/User.model.js';

export const getUsers = async (req, res) => {
    const users = await userModel.find();

    if (!users) {
        return res.json({ message: 'No Users' });
    }

    return res.json({ message: "success", users });
}

export const profile = async (req, res) => {
    return res.status(200).json({ message: req.user });
}

export const deleteUser = async (req, res) => {
    const id = req.user._id;
    const user = await userModel.findByIdAndDelete({ _id: id });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "success", user });
}