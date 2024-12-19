import dotenv from 'dotenv';
dotenv.config(); // Load environment variables
import orderModel from "../models/Ordermodel.js";
import userModel from '../models/UserModel.js';
import Stripe from "stripe";

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing order for frontend
const placeOrder = async (req, res) => {
    const frontendurl = `http://localhost:5175`;

    try {
        // Save the new order in the database
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Prepare the line items for Stripe payment session
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 80 // Assuming price is in INR and multiplied by 100 for Stripe
            },
            quantity: item.quantity
        }));

        // Add the delivery charge as a line item
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 80 // Delivery fee
            },
            quantity: 1
        });

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontendurl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontendurl}/verify?success=false&orderId=${newOrder._id}`
        });

        // Return the session URL to the frontend
        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error occurred while placing the order" });
    }
};

// Verifying the order payment
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "paid" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "not paid" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" });
    }
};

//user order for frontend
const userOrders=async(req,res)=>{
    try {
        const orders=await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }
}


//listiing orders for admin pannel

const listorders=async (req,res)=>{
   try {
    const orders=await orderModel.find({});
    res.json({success:true,data:orders})
   } catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
   }
}

//api for updating order status

const updateStatus=async(req,res)=>{
     try {
         await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
         res.json({success:true,message:"status updated"})
     } catch (error) {
        console.log(error);
         res.json({success:false,message:"error"})
     }
}

export { placeOrder, verifyOrder,userOrders,listorders,updateStatus };
