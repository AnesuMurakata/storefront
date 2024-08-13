import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Cart from './pages/cart/cart';
import Product from './pages/product/product';
import NavBar from './components/navBar/navBar';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Cart />} path="/cart" />
        <Route element={<Product />} path="/product/:id" />
      </Routes>
    </Router>
  );
}

export default App;
