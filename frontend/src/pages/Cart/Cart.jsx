import React, { useContext, useEffect } from 'react';
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, event_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);

  // Scroll to the top when the cart page is loaded
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  // Check if the cart is empty (all quantities are 0 or no items)
  const isCartEmpty = event_list.every(item => !cartItems[item._id] || cartItems[item._id] === 0);

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
      </div>
      <br />
      <hr />

      {isCartEmpty ? (
        <p className="empty-cart-message">No items added</p>
      ) : (
        event_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id} className="cart-items-title">
                <img src={url + '/images/' + item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>Rs {item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>Rs {item.price * cartItems[item._id]}</p>
                <p onClick={() => removeFromCart(item._id)} className="remove-item">x</p>
              </div>
            );
          }
        })
      )}
      <div className="cart-bottom">
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
            <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
