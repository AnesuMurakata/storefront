import React from 'react';
import NavBar from '../../components/navBar/navBar';

// STYLES
import './home.scss';

// COMPONENTS
import Products from '../../components/products/products';

const Home = () => {
  return (
    <div className="home-container">
      <NavBar />
      <Products />
    </div>
  );
};

export default Home;
