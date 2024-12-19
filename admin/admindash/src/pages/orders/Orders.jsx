import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../../../../frontend/src/assets/assets';
import './Orders.css'; // Ensure you have styles for the classes
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

const Orders = ({ url }) => {
  const [orders, setorder] = useState([]);

  const fetchallorders = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/order/list");
      if (response.data.success) {
        setorder(response.data.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Error fetching orders: " + error.message);
    }
  };

  const statushandler=async(event,orderId)=>{
        const  response=await axios.post("http://localhost:4000/api/order/status",
          {
            orderId,
            status:event.target.value
          }
        )
        if(response.data.success){
          await fetchallorders();
        }
  }

  useEffect(() => {
    fetchallorders();
  }, [url]);

  return (
    <div>
    <Navbar/>
    <hr />
      <div className="app-content">
        <Sidebar/>
      <div className="order add">
        <h3>Order Page</h3>
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items &&
                    order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return item.name + " x " + item.quantity;
                      } else {
                        return item.name + " x " + item.quantity + " , ";
                      }
                    })}
                </p>
                <p className='order-item-name'>{order.address.firstName+" "+order.address.lastName}</p>
                 <p>{order.address.street+","}</p>
                 <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>

              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
              <p>Item: {order.items.length}</p>
              <p>Rs{order.amount}</p>
              <select onChange={(event)=>statushandler(event,order._id)} value={order.status}>
                <option value="your request is checking">your request is checking</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Call to +91-xxxxx">Call to +91-xxxxx</option>
              </select>
            </div>
            
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Orders;
