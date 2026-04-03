import mongoose from "mongoose";
import { userSchema } from "../models/publicUserModel.js";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        mongoose.set('debug', true);

        mongoose.model('User', userSchema);
        console.log('Mongodb connected')
    } catch (error) {
        console.log('error', error)
    }
}

export default connectDb