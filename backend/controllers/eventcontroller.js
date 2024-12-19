import eventModel from "../models/Eventmodels.js";
import fs from 'fs'
import path from 'path';

//add event item

const addevent=async (req,res)=>{
    let image_filename=`${req.file.filename}`;
    const event=new eventModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try {
        await event.save();
        res.json({success:true,message:"Item Successfully Added"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

    
}

//add event list
const listevent=async (req,res)=>{
    try {
      const events=await eventModel.find({});
      res.json({success:true,data:events})
    } catch (error) {
      console.log(error);
      res.json({success:false,message:'Error'})
    }
}

//remove event item

const removeevent=async (req,res)=>{
    try {
        const event=await eventModel.findById(req.body.id);
        fs.unlink(`uploads/${event.image}`,()=>{});

        await eventModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:'event removed'});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'error'});
    }
}



export {addevent,listevent,removeevent};