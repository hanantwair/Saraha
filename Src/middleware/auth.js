import userModel from '../../DB/Models/User.model.js';
import jwt from 'jsonwebtoken';

export const Auth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization?.startsWith(process.env.BEARERTOKEN)) {
        return res.status(401).json({ message: "Invalid Authorization!" });
    }
    const token = authorization.split(process.env.BEARERTOKEN)[1];
    if (!token) {
        return res.status(401).json({ message: "Invalid Authorization!" });
    }
    const decoded = jwt.verify(token, process.env.LOGIN_SECRET);
    const authUser = await userModel.findOne({ _id: decoded.id }).select('userName email');
    if (!authUser) {
        return res.status(403).json({ message: 'not register account' });
    }
    req.user = authUser;
    next();
}