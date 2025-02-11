import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';

// COMPONENTS
import { cartActions } from '../../redux/cartSlice';

// STYLES
import './products.scss';

// PACKAGES
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface IProduct {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
}

const fetchingDataGridItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productsToDisplay, setProductsToDisplay] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [fetchingData, setFetchingData] = useState<boolean>(true);

  const dispatch = useDispatch();
  const cartProducts = useSelector((state: RootState) => state.cart.products);
  const cachedProducts = useSelector(
    (state: RootState) => state.product.products,
  );

  useEffect(() => {
    const temporaryList: string[] = ['All'];

    // Check if redux store has data
    if (cachedProducts.length > 0) {
      setProducts(cachedProducts);
      setProductsToDisplay(cachedProducts);

      cachedProducts.map((product: IProduct) => {
        if (!temporaryList.includes(product.category)) {
          temporaryList.push(product.category);
        }
      });
      setCategories(temporaryList);
      setFetchingData(false);
    } else {
      // Only fetch products if redux store was empty
      axios({ method: 'GET', url: 'https://fakestoreapi.com/products' }).then(
        (response) => {
          setProducts(response.data);
          setProductsToDisplay(response.data);

          response.data.map((product: IProduct) => {
            if (!temporaryList.includes(product.category)) {
              temporaryList.push(product.category);
            }
          });
          setCategories(temporaryList);
          setFetchingData(false);
        },
      );
    }
  }, []);

  const addToCart = (product: IProduct) => {
    const previousProducts = cartProducts;
    const temporary = [...previousProducts, product];
    dispatch(cartActions.setProducts(temporary));
  };

  const filterCategory = (category: string) => {
    if (category === 'All') {
      setProductsToDisplay(products);
    } else {
      const filteredProducts = products.filter(
        (product) => product.category === category,
      );
      setProductsToDisplay(filteredProducts);
    }
    setActiveCategory(category);
  };

  return (
    <div className="products-container">
      {fetchingData ? (
        <>
          <div className="products-container__products-filter skeleton skeleton__categories"></div>
          <div className="products-container__products-cards skeleton__grid">
            {fetchingDataGridItems.map((item, index) => {
              return (
                <div
                  key={index}
                  className="products-container__products-cards skeleton skeleton__grid__grid-item"
                ></div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="products-container__products-filter">
            {categories.map((category: string, index: number) => {
              return (
                <div
                  key={index}
                  className={[
                    'products-container__products-filter__category',
                    activeCategory == category
                      ? 'products-container__products-filter__category--active'
                      : '',
                  ].join(' ')}
                  onClick={() => filterCategory(category)}
                >
                  {category}
                </div>
              );
            })}
          </div>
          <div className="products-container__products-cards">
            {productsToDisplay.map((product, index) => {
              return (
                <div
                  key={index}
                  className="products-container__products-cards__product-item"
                >
                  <div
                    className="products-container__products-cards__product-item__image-container"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <img src={product.image} alt="product" />
                  </div>
                  <p className="products-container__products-cards__product-item__title">
                    {product.title}
                  </p>
                  <div className="products-container__products-cards__product-item__price-cart-row">
                    <p>${product.price}</p>
                    <button onClick={() => addToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
