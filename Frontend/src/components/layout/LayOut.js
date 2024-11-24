import React from "react";
import NavBar from "../navbar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";

export default function LayOut(prop) {
  const { wishList, isAuthenticated, userData, cartList } = prop;
  return (
    <div>
      <NavBar
       isAuthenticated={isAuthenticated} userData={userData} wishList={wishList} cartList={cartList}
      />
      <Outlet />
      <Footer />
    </div>
  );
}
