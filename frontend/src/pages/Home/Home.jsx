import React, { useState, useRef } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import Exploremenu from '../../components/Exploremenu/Exploremenu';
import MedDisplay from '../../components/MedDisplay/MedDisplay';
import Appdownload from '../../components/Appdownload/Appdownload';

const Home = () => {
  const [category, setCategory] = useState('All');
  const eventDisplayRef = useRef(null);

  const scrollToDisplay = () => {
    const offset = -110; // Adjust this value for the offset (e.g., height of sticky header or spacing)
    const elementPosition = eventDisplayRef.current.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset + offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <Header />
      <Exploremenu category={category} setCategory={setCategory} scrollToDisplay={scrollToDisplay} />
      <MedDisplay ref={eventDisplayRef} category={category} />
      <Appdownload />
    </div>
  );
};

export default Home;
