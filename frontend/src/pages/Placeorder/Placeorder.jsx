import React, { useContext, useEffect, useState } from 'react';
import './Placeorder.css';
import { StoreContext } from '../../Context/Storecontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Placeorder = () => {
  const { getTotalCartAmount, token, event_list, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
      window.scrollTo(0, 0); // Scroll to the top of the page
    }, []);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onchangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    
    let orderItems = [];
    event_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    
    let orderData = {
      userId: "USER_ID",  // Pass the actual userId here from context or props
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2  // Adding delivery fee
    };

    try {
      const response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token }
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);  // Redirect to Stripe payment
      } else {
        alert("Error: Unable to place order.");
      }
    } catch (error) {
      console.error("Error during order placement:", error);
      alert("There was an issue placing your order. Please try again.");
    }
  };


  useEffect(()=>{
       if(!token){
         navigate('/cart')
       }else if(getTotalCartAmount()===0){
        navigate('/cart')
       }
  },[token])

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p style={{ fontSize: '30px', fontWeight: '600', marginBottom: '20px' }}>
          Delivery Information
        </p>

        <div className="multi-fields">
          <input required type="text" name='firstName' onChange={onchangehandler} value={data.firstName} placeholder="First Name" />
          <input required type="text" name='lastName' onChange={onchangehandler} value={data.lastName} placeholder="Last Name" />
        </div>
        <input required type="email" name='email' onChange={onchangehandler} value={data.email} placeholder="Email address" />
        <input required type="text" name='street' onChange={onchangehandler} value={data.street} placeholder="Street" />
        <div className="multi-fields">
          <input required type="text" name='city' value={data.city} onChange={onchangehandler} placeholder="City" />
          <input required type="text" name='state' value={data.state} onChange={onchangehandler} placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required type="text" name='zipcode' value={data.zipcode} onChange={onchangehandler} placeholder="Zip Code" />
          <input required type="text" name='country' value={data.country} onChange={onchangehandler} placeholder="Country" />
          <input required type="text" name='phone' value={data.phone} onChange={onchangehandler} placeholder="Phone" />
        </div>
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p style={{ marginBottom: '10px' }}>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
            <button
              style={{ background: 'blue' }}
              type='submit'
            >
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
