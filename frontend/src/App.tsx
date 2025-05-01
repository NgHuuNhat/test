import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from './admin/components/Layout';
import Admin from './admin/pages';
import Home from './home/pages/index';
import Users from './admin/pages/users';
import Products from './admin/pages/products';
import Orders from './admin/pages/orders';
import Payments from './admin/pages/payments';
import Login from './auth/login';
import ProfilePage from './home/pages/ProfilePage';
import CartPage from './home/pages/CartPage';
import HomeLayout from './home/components/HomeLayout';
import WishlistPage from './home/pages/WishlistPage';
import SearchPage from './home/pages/SearchPage';
import { CartProvider } from './home/contexts/CartContext';
import PaymentPage from './home/pages/PaymentPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>

          {/* Route cho login */}
          <Route path="/login" element={<Login />} />
          {/* <Route path="/profile" element={<ProfilePage />} /> */}

          {/* Route cho trang chủ */}
          <Route path="/*" element={<HomeLayout />} >
            <Route path="" element={<Home />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="payment" element={<PaymentPage />} />
          </Route>

          {/* Route cho trang quản trị */}
          <Route path="/admin/*" element={<Layout />}>
            <Route path="" element={<Admin />} />
            <Route path="users" element={<Users />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="payments" element={<Payments />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

        </Routes>
      </Router >
    </CartProvider>
  );
}

export default App;
