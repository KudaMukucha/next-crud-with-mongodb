import mongoose from "mongoose";
export default async function mongoDbConnect(){
    try {
       await mongoose.connect(process.env.MONGODB_URL)
       console.log('Database connection successful..');
    } catch (error) {
        console.log(error);
    }
}