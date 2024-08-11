import React, { useState } from 'react';

// STYLES
import './navBar.scss';

// ASSETS
import search from '../../assets/components/navBar/search.png';
import profile from '../../assets/components/navBar/profile.png';
import likes from '../../assets/components/navBar/likes.png';
import cart from '../../assets/components/navBar/shopping-cart.png';

const NavBar = () => {
  const [displayResultsBar, setDisplayResultsBar] = useState(false);

  return (
    <div className="nav-bar-container">
      <h3>ClicknPay</h3>
      <div className="nav-bar-container__search-bar">
        <div className="nav-bar-container__search-bar__elements">
          <img className="h-7" src={search} alt="search" />
          <input
            className=""
            type="text"
            onBlur={() => setDisplayResultsBar((prev) => !prev)}
            onFocus={() => setDisplayResultsBar((prev) => !prev)}
            placeholder="Search"
          />
        </div>
        {displayResultsBar && (
          <div className="nav-bar-container__search-bar__results">
            <p>Awaiting search parameters</p>
          </div>
        )}
      </div>
      <div className="nav-bar-container__profile">
        <img src={profile} alt="Account" />
        <img src={likes} alt="Wish List" />
        <img src={cart} alt="Shopping Cart" />
      </div>
    </div>
  );
};

export default NavBar;
