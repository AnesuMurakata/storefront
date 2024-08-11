import React, { useEffect, useState } from 'react';

// STYLES
import './products.scss';

// PACKAGES
import axios from 'axios';

interface IProduct {
  title: string;
}

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    axios({ method: 'GET', url: 'https://fakestoreapi.com/products' }).then(
      (response) => {
        console.log(response.data);
        setProducts(response.data);
      },
    );
  }, []);

  return (
    <div className="products-container">
      {products.map((product, index) => {
        return (
          <div key={index} className="products-container__product-item">
            <p>{product.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
