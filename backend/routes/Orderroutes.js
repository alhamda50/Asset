import express from 'express';
import {authmiddleware} from '../middleware/auth.js';
import { listorders, placeOrder, updateStatus, userOrders, verifyOrder } from '../controllers/Ordercontroller.js';

const orderRouter=express.Router();

orderRouter.post('/place',authmiddleware,placeOrder);
orderRouter.post('/verify',verifyOrder);
orderRouter.post('/userorders',authmiddleware,userOrders);
orderRouter.get('/list',listorders);
orderRouter.post("/status",updateStatus);
                                      

export default orderRouter;