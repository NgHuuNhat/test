import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from './admin/components/Layout';
import Admin from './admin/pages';
import Home from './home/index';
import Users from './admin/pages/users';
import Products from './admin/pages/products';
import Orders from './admin/pages/orders';
import Payments from './admin/pages/payments';
import Login from './auth/login';

function App() {
  return (
    <Router>
      <Routes>

        {/* Route cho login */}
        <Route path="login" element={<Login />} />

        {/* Route cho trang chủ */}
        <Route path="/" element={<Home />} />

        {/* Route cho trang quản trị */}
        <Route path="/admin/*" element={<Layout />}>
          <Route path="" element={<Admin />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="payments" element={<Payments />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
