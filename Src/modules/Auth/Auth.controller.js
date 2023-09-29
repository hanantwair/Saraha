import userModel from '../../../DB/Models/User.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendEmail from '../../services/sendEmail.js';

export const signup = async (req, res) => {
    const { userName, email, password, gender, age } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
        return res.status(409).json({ message: 'Email Exists!' });
    }
    const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALTROUND));
    user = await userModel.create({ userName, email, password: hashedPassword, gender, age });
    const token = jwt.sign({ email }, process.env.SIGNUP_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ email }, process.env.SIGNUP_SECRET, { expiresIn: 60 * 60 * 24 });
    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`;
    const refreshLink = `${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${refreshToken}`;
    const html = `<a href=${link}> Verify Email </a> <br/> <br/> or
     <a href=${refreshLink}>Request New Email to Verify Your Email</a>`;

    sendEmail(email, 'Confirm Email ^_^', html);
    return res.status(201).json({ message: 'success', user: user._id, token });
}

export const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'Invaild Data' });
    }
    if (!user.confirmEmail) {
        return res.status(400).json({ message: 'plz confirm your email' });
    }
    const match = bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(404).json({ message: "Invalid Data" });
    }
    const token = jwt.sign({ id: user._id }, process.env.LOGIN_SECRET);
    return res.status(200).json({ message: "success", user, token });
}


export const confirmEmail = async (req, res, next) => {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.SIGNUP_SECRET);

    const user = await userModel.findOneAndUpdate({ email: decoded.email, confirmEmail: false }, { confirmEmail: true });
    if (!user) {
        return res.status(400).json({ message: "Your Email is Verified!" });
    }
    else {
        return res.redirect(process.env.FRONTEND_LOGIN);
    }
}
export const newConfirmEmail = async (req, res, next) => {
    const { refreshToken } = req.params;
    const decoded = jwt.verify(refreshToken, process.env.SIGNUP_SECRET);
    const token = jwt.sign({ email: decoded.email }, process.env.SIGNUP_SECRET, { expiresIn: '1h' });
    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`;
    const html = `<a href=${link}> Verify Email </a>`;

    sendEmail(decoded.email, 'Confirm Email ^_^', html);
    return res.status(201).json({ message: 'New Email is Sent Successfully!' });
}