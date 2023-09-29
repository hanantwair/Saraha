import mongoose from "mongoose";

const connectDB = async () => {
    return await mongoose.connect(process.env.DB_LOCAL)
        .then(() => {
            console.log('Connect to db');
        })
        .catch((err) => {
            console.log(`Error connecting to db: ${err.stck}`);
        })
}

export default connectDB;