import React, { useContext, useState } from 'react'
import './MedItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';

const MedItem = ({ id, name, price, description, image, }) => {
  // const [itemCount, setItemCount] = useState(0);

  const {cartItems,addToCart,removeFromCart,url}=useContext(StoreContext);



  return (
    <div className="event-item">
      <div className="event-item-img-container">
      <img className="event-item-image" src={`${url}/images/${image}`} alt="" />

        {
          !cartItems[id] ? (
            <img className='add'
              onClick={() =>addToCart(id)}
              src={assets.add_icon_white}
              alt="Add Icon"
            />
          ) : (
            <div className="event-item-counter">
                <img 
                  onClick={() => removeFromCart(id)} 
                  src={assets.remove_icon_red} 
                  alt="Remove Icon" 
                />
                <p>{cartItems[id]}</p>
                <img 
                  onClick={() => addToCart(id)} 
                  src={assets.add_icon_green} 
                  alt="Add Icon" 
                />
              </div>
          )
        }
      </div>
      <div className="event-item-info">
        <div className="event-item-name-rating">
          <p>{name}</p>
        </div>
        <p className="event-item-desc">{description}</p>
        <p className="event-item-price">Rs {price}</p>
      </div>
    </div>
  );
};

export default MedItem;
