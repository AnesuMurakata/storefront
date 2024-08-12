import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';

// STYLES
import './products.scss';

// PACKAGES
import axios from 'axios';
import { cartActions } from '../../redux/cartSlice';

interface IProduct {
  title: string;
  image: string;
  price: number;
  category: string;
}

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const dispatch = useDispatch();
  const cartProducts = useSelector((state: RootState) => state.cart.products);

  useEffect(() => {
    const tempList: string[] = ['All'];
    axios({ method: 'GET', url: 'https://fakestoreapi.com/products' }).then(
      (response) => {
        console.log(response.data);
        setProducts(response.data);

        response.data.map((product: IProduct) => {
          if (!tempList.includes(product.category)) {
            tempList.push(product.category);
          }
        });
        setCategories(tempList);
      },
    );
  }, []);

  const addToCart = (product: IProduct) => {
    const previousProducts = cartProducts;
    const temp = [...previousProducts, product];
    dispatch(cartActions.setProducts(temp));
  };

  return (
    <div className="products-container">
      <div className="products-container__products-filter">
        {categories.map((category: string, index: number) => {
          return (
            <div
              key={index}
              className="products-container__products-filter__category"
            >
              {category}
            </div>
          );
        })}
      </div>
      <div className="products-container__products-cards">
        {products.map((product, index) => {
          return (
            <div
              key={index}
              className="products-container__products-cards__product-item"
            >
              <div className="products-container__products-cards__product-item__image-container">
                <img src={product.image} alt="product" />
              </div>
              <p>{product.title}</p>
              <div className="products-container__products-cards__product-item__price-cart-row">
                <p>${product.price}</p>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
