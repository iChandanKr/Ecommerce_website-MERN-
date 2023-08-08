import { useEffect, useState } from 'react';
import './App.css';
import Header from './component/layout/header/Header.js';
import Footer from "./component/layout/footer/Footer.js";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebFont from "webfontloader";
import React from "react";
import Home from "./component/home/Home.js";
import ProductDetails from "./component/product/ProductDetails.js";
import Products from './component/product/Products.js';
import Search from "./component/product/Search.js"
import LoginSignUp from './component/user/LoginSignUp';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/header/UserOption.js';
import { useSelector } from 'react-redux';
import Profile from './component/user/Profile.js';
import ProtectedRoutes from './component/Route/ProtectedRoutes';
import UpdateProfile from './component/user/UpdateProfile.js';
import UpdatePassword from './component/user/UpdatePassword.js';
import ForgotPassword from './component/user/ForgotPassword.js';
import ResetPassword from './component/user/ResetPassword.js';
import Cart from './component/cart/Cart.js';
import Shipping from './component/cart/Shipping.js';
import ConfirmOrder from './component/cart/ConfirmOrder.js'
import axios from 'axios';
import Payment from './component/cart/Payment.js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './component/cart/OrderSuccess.js';
import MyOrders from './component/order/Myorders.js';
import OrderDetails from './component/order/OrderDetails.js';
import Dashboard from './component/admin/Dashboard.js';
import AdminProtected from "./component/Route/AdminProtected";
import ProductList from './component/admin/ProductList.js';
import NewProduct from './component/admin/NewProduct.js';



function App() {

  const { isAuthenticated, user, loading } = useSelector((state) => state.user)

  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/stripeapikey');
    setStripeApiKey(data.stripeApiKey);

  }
  console.log(stripeApiKey);


  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Ubuntu", "Chilanka"]
      }
    });


    store.dispatch(loadUser());

    getStripeApiKey();

  }, [])

  return (
    <Router>
      <Header />
      {
        isAuthenticated && <UserOptions user={user} />
      }

      {
        stripeApiKey && <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>

            <Route element={<ProtectedRoutes />}>
              <Route path='/process/payment' element={<Payment />} />
            </Route>

          </Routes>
        </Elements>

      }


      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route path='/search' element={<Search />} />


        {/*---------- Protected Routes -------------*/}
        <Route element={<ProtectedRoutes />}>
          <Route path='/account' element={<Profile />} />
          <Route path='/me/update' element={<UpdateProfile />} />
          <Route path='/password/update' element={<UpdatePassword />} />
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/order/confirm' element={<ConfirmOrder />} />
          <Route path='/success' element={<OrderSuccess />} />
          <Route path='/orders' element={<MyOrders />} />
          <Route path='/order/:id' element={<OrderDetails />} />

        </Route>


        {/* Admin Protected Route-----------------------------------*/}
        <Route element={<AdminProtected />}>

          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/products' element={<ProductList />} />
          <Route path='/admin/product/new'element={<NewProduct/>} />
        </Route>



        <Route path='/password/forgot' element={<ForgotPassword />} />
        <Route path='/password/reset/:token' element={<ResetPassword />} />



        <Route path='/login' element={<LoginSignUp />} />
        <Route path='/cart' element={<Cart />} />



      </Routes>
      <Footer />

    </Router>

  );
}

export default App;
