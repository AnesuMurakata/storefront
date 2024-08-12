import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';

// STYLES
import './cart.scss';

// COMPONENTS
import NavBar from '../../components/navBar/navBar';

const Cart = () => {
  const cartProducts = useSelector((state: RootState) => state.cart.products);

  return (
    <div className="cart-container">
      <NavBar />
      <div className="cart-container__elements">
        <h3>Shopping Cart</h3>
        <div className="cart-container__cart-items-container">
          {cartProducts.map((product, index) => {
            return (
              <div
                key={index}
                className="cart-container__cart-items-container__cart-item"
              >
                <p>{product.title}</p>
                <p>{product.price}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Cart;
