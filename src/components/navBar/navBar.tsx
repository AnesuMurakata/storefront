import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';

// STYLES
import './navBar.scss';

// PACKAGES
import axios from 'axios';

// ASSETS
import search from '../../assets/components/navBar/search.png';
import cart from '../../assets/components/navBar/shopping-bag.png';
import { productActions } from '../../redux/productSlice';

interface IProduct {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  description: string;
}

const NavBar = () => {
  const navigate = useNavigate();

  const [displayResultsBar, setDisplayResultsBar] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchProducts, setSearchProducts] = useState<IProduct[]>([]);

  const dispatch = useDispatch();
  const cartProducts = useSelector((state: RootState) => state.cart.products);

  useEffect(() => {
    axios({ method: 'GET', url: 'https://fakestoreapi.com/products' }).then(
      (response) => {
        setSearchProducts(response.data);
        dispatch(productActions.setProducts(response.data));
      },
    );
  }, []);

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.length > 0) {
      setSearchTerm(searchTerm);
      const results = searchProducts.filter((product) => {
        if (
          product.title.includes(searchTerm) ||
          product.description.includes(searchTerm)
        ) {
          return product;
        }
      });
      setSearchResults(results);
    } else {
      setSearchTerm(searchTerm);
      // reset results if search term is empty string
      setSearchResults([]);
    }
  };

  return (
    <div className="nav-bar-container">
      <h1 onClick={() => navigate(`/`)}>Click n&#39; Pay</h1>
      <div className="nav-bar-container__search-bar">
        <div className="nav-bar-container__search-bar__elements">
          <img className="h-7" src={search} alt="search" />
          <input
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            onBlur={() => setDisplayResultsBar((prev) => !prev)}
            onFocus={() => setDisplayResultsBar((prev) => !prev)}
            placeholder="Search by name or description"
          />
        </div>
        {displayResultsBar && (
          <div className="nav-bar-container__search-bar__results">
            {searchTerm.length == 0 && (
              <p className="nav-bar-container__search-bar__results__message">
                Awaiting search parameters...
              </p>
            )}
            {searchTerm.length > 0 && searchResults.length == 0 && (
              <p className="nav-bar-container__search-bar__results__message">
                No results found...
              </p>
            )}
            {searchResults.slice(0, 5).map((product, index) => {
              return (
                <p
                  key={index}
                  onMouseDown={() => navigate(`/product/${product.id}`)}
                  className="nav-bar-container__search-bar__results__result-item"
                >
                  {product.title}
                </p>
              );
            })}
          </div>
        )}
      </div>
      <div className="nav-bar-container__profile">
        <img src={cart} alt="Shopping Cart" onClick={() => navigate('/cart')} />
        <p className="nav-bar-container__profile">{cartProducts.length}</p>
      </div>
    </div>
  );
};

export default NavBar;
