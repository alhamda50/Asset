import React, { useContext, useEffect, useState } from 'react';
import './Myorders.css';
import { StoreContext } from '../../Context/Storecontext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Myorders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]); // Initialize as an empty array

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
      }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(
                `${url}/api/order/userorders`,
                {},
                { headers: { token } }
            );
            setData(response.data.data); // Set the returned array of orders
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div>
            <div className="my-orders">
                <h2>My Orders</h2>
                <div className="container">
                    {data.length > 0 ? (
                        data.map((order, index) => (
                            <div key={index} className="my-orders-order">
                                <img src={assets.parcel_icon} alt="Parcel Icon" />
                                <p>
                                    {order.items.map((item, idx) =>
                                        idx === order.items.length - 1
                                            ? `${item.name} x ${item.quantity}`
                                            : `${item.name} x ${item.quantity}, `
                                    )}
                                </p>
                                <p>${order.amount.toFixed(2)}</p>
                                <p>Items: {order.items.length}</p>
                                <p><span>&#x25cf;</span><b>{order.status}</b></p>
                                <button onClick={fetchOrders}>Track order</button>
                            </div>
                        ))
                    ) : (
                        <p>No orders found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Myorders;
