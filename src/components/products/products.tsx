import React, { useEffect, useState } from 'react';

// STYLES
import './products.scss';

// PACKAGES
import axios from 'axios';

interface IProduct {
  title: string;
  image: string;
  category: string;
}

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
