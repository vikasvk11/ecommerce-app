import React from "react";
import "./styles.css";
import { Products } from "./Products";
import { Wishlist } from "./Wishlist";
import { Cart } from "./Cart";
import { NavLink, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <>
      <nav style={{ margin: "2rem" }}>
        <NavLink
          end
          to="/"
          className="btn-primary-outline mg-a-1"
          activeClassName="nav-active"
        >
          Home
        </NavLink>
        <NavLink
          to="/cart"
          className="btn-primary-outline mg-a-1"
          activeClassName="nav-active"
        >
          Cart
        </NavLink>
        <NavLink
          to="/wishlist"
          className="btn-primary-outline mg-a-1"
          activeClassName="nav-active"
        >
          Wishlist
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </>
  );
}
