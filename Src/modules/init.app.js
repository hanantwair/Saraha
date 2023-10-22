import connectDB from '../../DB/connection.js';
import authRouter from './Auth/Auth.router.js';
import userRouter from './User/User.router.js';
import messageRouter from './Messages/Messages.router.js';
import cors from 'cors';
import { globalErrorHandler } from '../middleware/errorHandling.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const initapp = (app, express) => {
    const fullPath = path.join(__dirname, '../../uploads');
    connectDB();
    app.use(cors());
    app.use('/uploads', express.static(fullPath));
    app.use(express.json());
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
    app.use('/message', messageRouter);

    app.use('*', (req, res) => {
        return res.json({ message: 'Page Not Found!' });
    })

    app.use(globalErrorHandler);
}

export default initapp;
