import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Mongodb connected");
    } catch(err)
{
    console.log("Mongodb connection error", err);
}}

export default connectDB;