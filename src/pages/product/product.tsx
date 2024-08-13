import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';

// COMPONENTS
import { cartActions } from '../../redux/cartSlice';

// STYLES
import './product.scss';

// ASSETS
import star from '../../assets/pages/product/star.png';

// PACKAGES
import axios from 'axios';

interface IRating {
  rate: number;
  count: number;
}

interface IProduct {
  id: number;
  rating: IRating;
  title: string;
  image: string;
  price: number;
  category: string;
  description: string;
}

const Product = () => {
  const [product, setProduct] = useState<IProduct>();
  const [fetchingData, setFetchingData] = useState<boolean>(true);

  const dispatch = useDispatch();
  const cartProducts = useSelector((state: RootState) => state.cart.products);

  useEffect(() => {
    const path = window.location.pathname;
    const pathArray = path.split('/');
    const id = pathArray[pathArray.length - 1];

    axios({
      method: 'GET',
      url: 'https://fakestoreapi.com/products/' + id,
    }).then((response) => {
      setProduct(response.data);
      setFetchingData(false);
    });
  }, []);

  const addToCart = (product: IProduct) => {
    const previousProducts = cartProducts;
    const temporary = [...previousProducts, product];
    dispatch(cartActions.setProducts(temporary));
  };

  return (
    <div className="product-page-container">
      {fetchingData ? (
        <div className="product-page-container__elements skeleton skeleton__card"></div>
      ) : (
        <div className="product-page-container__elements">
          <div className="product-page-container__elements__product-image">
            <img src={product?.image} alt="photo" />
          </div>
          <div className="product-page-container__elements__product-details">
            <h3>{product?.title}</h3>
            <p className="product-page-container__elements__product-details__description">
              {product?.description}
            </p>
            <div className="product-page-container__elements__product-details__rating-row">
              <img src={star} alt="rating" />
              <p>{product?.rating?.rate}</p>
              <p className="product-page-container__elements__product-details__rating-row__reviews">
                {product?.rating?.count} Reviews
              </p>
            </div>
            <div className="product-page-container__elements__product-details__bottom-row">
              <p>${product?.price}</p>
              <button onClick={() => addToCart(product!)}>Add to Cart</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
