import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';

// STYLES
import './cart.scss';

const Cart = () => {
  const [shoppingCartTotal, setShoppingCartTotal] = useState<number>(0);
  const cartProducts = useSelector((state: RootState) => state.cart.products);

  useEffect(() => {
    let totalCost = 0;
    cartProducts.map((product) => {
      totalCost += product.price;
    });
    setShoppingCartTotal(totalCost);
  }, [cartProducts]);

  return (
    <div className="cart-container">
      <div className="cart-container__elements">
        <div className="cart-container__elements__headers">
          <h3>Shopping Cart</h3>
          <h3>Total: ${shoppingCartTotal.toFixed(2)}</h3>
        </div>
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
