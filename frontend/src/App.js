import { useEffect } from 'react';
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

function App() {

  const { isAuthenticated, user, loading } = useSelector((state) => state.user)

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Ubuntu", "Chilanka"]
      }
    })

    store.dispatch(loadUser());


  }, [])

  return (
    <Router>
      <Header />
      {
        isAuthenticated && <UserOptions user={user} />
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
        </Route>



        <Route path='/login' element={<LoginSignUp />} />



      </Routes>
      <Footer />

    </Router>

  );
}

export default App;
