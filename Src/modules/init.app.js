import connectDB from '../../DB/connection.js';
import authRouter from './Auth/Auth.router.js';
import userRouter from './User/User.router.js';
import messageRouter from './Messages/Messages.router.js';
import cors from 'cors';

const initapp = (app, express) => {
    connectDB();
    app.use(cors());
    app.use(express.json());
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
    app.use('/message', messageRouter);

    app.use('*', (req, res) => {
        return res.json({ message: 'Page Not Found!' });
    })
}

export default initapp;
