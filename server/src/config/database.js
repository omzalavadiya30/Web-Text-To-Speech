import mongoose from'mongoose';
import { MONGODB_URI } from './env.js';

export const connectDB= async() => {
    try {
        if(!MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined");
        }

        const connection = await mongoose.connect(MONGODB_URI);
        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch(err) {
        console.error("MongoDB connection failed:");
        console.error(err.message);
        process.exit(1);
    }
}