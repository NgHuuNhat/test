import React from 'react';
import logo from './logo.svg';
import './App.css';
import Test from './components';
import ProductList from './pages/ProductList';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/admin" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;
