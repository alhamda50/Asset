import mongoose from "mongoose";

export const connectDB=async ()=>{
    await mongoose.connect('mongodb+srv://akashajay10:akash242810@cluster0.9ltch.mongodb.net/EventDB?retryWrites=true&w=majority&appName=Cluster0')
    .then(()=>console.log('DB Connected'));
 }
