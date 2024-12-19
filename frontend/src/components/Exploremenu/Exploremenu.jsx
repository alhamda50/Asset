import React from 'react';
import './Exploremenu.css';
import { menu_list } from '../../assets/assets';

const Exploremenu = ({ category, setCategory, scrollToDisplay }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Events</h1>
      <p className="explore-menu-text">
        Discover a diverse range of events tailored to create unforgettable experiences and moments for every occasion.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() => {
                setCategory((prev) => (prev === item.menu_name ? 'All' : item.menu_name));
                scrollToDisplay(); // Scroll to EventDisplay when clicked
              }}
              key={index}
              className="explore-menu-list-item"
            >
              <video
                style={{ width: '300px', height: '300px' }}
                className={category === item.menu_name ? 'active' : ''}
                src={item.menu_image}
                autoPlay
                muted
                loop
                preload="auto"
                playsInline
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default Exploremenu;
