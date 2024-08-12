import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Cart from './pages/cart/cart';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Cart />} path="/cart" />
      </Routes>
    </Router>
  );
}

export default App;
