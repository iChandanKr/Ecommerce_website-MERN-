import { useEffect } from 'react';
import './App.css';
import Header from './component/layout/header/Header.js';
import Footer from "./component/layout/footer/Footer.js";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebFont from "webfontloader";
import React from "react";
import Home from "./component/home/Home.js";

function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Ubuntu", "Chilanka"]
      }
    })


  }, [])

  return (
    <Router>
    <Header />
      <Routes>

        <Route  path='/' element={<Home/>} />

        </Routes>
        <Footer />

    </Router>

  );
}

export default App;
