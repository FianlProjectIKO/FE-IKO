import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Cart from '../pages/Cart'
import Favorite from '../pages/Favorite'
import Login from '../pages/Login'
import Main from '../pages/Main'
import MyPage from '../pages/MyPage'
import Order from '../pages/Order'
import ProductDetail from '../pages/ProductDetail'
import Signup from '../pages/Signup'
import NotFound from '../components/NotFound'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/sign" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
