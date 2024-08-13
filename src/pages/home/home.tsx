import React from 'react';

// STYLES
import './home.scss';

// COMPONENTS
import Products from '../../components/products/products';

const Home = () => {
  return (
    <div className="home-container">
      <Products />
    </div>
  );
};

export default Home;
