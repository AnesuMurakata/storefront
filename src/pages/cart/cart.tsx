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
        <div className="cart-container__elements__cart-items-container">
          {cartProducts.map((product, index) => {
            return (
              <div
                key={index}
                className="cart-container__elements__cart-items-container__cart-item"
              >
                <div className="cart-container__elements__cart-items-container__cart-item__image-container">
                  <img src={product.image} alt="product" />
                </div>
                <div>
                  <p className="cart-container__elements__cart-items-container__cart-item__title">
                    {product.title}
                  </p>
                  <p className="cart-container__elements__cart-items-container__cart-item__price">
                    ${product.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Cart;
