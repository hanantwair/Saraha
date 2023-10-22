import userModel from '../../DB/Models/User.model.js';
import jwt from 'jsonwebtoken';

export const Auth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization?.startsWith(process.env.BEARERTOKEN)) {
        return next(new Error("Invalid Authorization!"));
    }
    const token = authorization.split(process.env.BEARERTOKEN)[1];
    if (!token) {
        return next(new Error("Invalid Authorization!"));
    }
    const decoded = jwt.verify(token, process.env.LOGIN_SECRET);
    const authUser = await userModel.findOne({ _id: decoded.id }).select('userName email');
    if (!authUser) {
        return next(new Error("not register account"));
    }
    req.user = authUser;
    next();
}