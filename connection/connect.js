import mongoose from "mongoose";

export const connect=async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/connect1');
        console.log('Connected');
        
    } catch (error) {
        console.log('Error while Connecting DB',error);   
    }
}