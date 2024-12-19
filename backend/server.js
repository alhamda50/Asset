import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import eventRouter from "./routes/eventroutes.js";
import userRouter from "./routes/userroutes.js";
import dotenv from 'dotenv'
import cartRouter from "./routes/Cartroutes.js";
import orderRouter from "./routes/Orderroutes.js";

dotenv.config();
//app config
const app=express();
const port=4000

//middleware
app.use(express.json());
app.use(cors());

//db connection
connectDB();

//api endpoints
app.use('/api/event',eventRouter);
app.use('/images',express.static('uploads'))
app.use('/api/user',userRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);

app.get('/',(req,res)=>{
  res.send('API is working')
});

app.listen(port,()=>{
    console.log(`Server is successfully running on the port ${port}`);
})
