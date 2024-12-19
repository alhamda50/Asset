import mongoose from "mongoose";

const eventSchema= new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true}

});

const eventModel=mongoose.model.event || mongoose.model("event",eventSchema);

export default eventModel;