import React from "react";
import "./styles.css";
import { Products } from "./Products";
import { Wishlist } from "./Wishlist";
import { Cart } from "./Cart";
import { NavLink, Route, Routes } from "react-router-dom";
import { useCart } from "./CartContext";

export default function App() {
  const { cartState, cartDispatch } = useCart();
  return (
    <>
      <nav className="nav-bar">
        <h1>
          <NavLink end to="/" className="nav-header">
            the Cart
          </NavLink>
        </h1>
        <ul className="nav-list">
          <li>
            <NavLink to="/cart">
              <div className="badge-icon">
                <i className="material-icons col">shopping_cart</i>
                {cartState.cart.length === 0 ? (
                  ""
                ) : (
                  <span>{cartState.cart.length}</span>
                )}
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/wishlist">
              <div className="badge-icon">
                <i className="material-icons col">favorite</i>
                {cartState.wishlist.length === 0 ? (
                  ""
                ) : (
                  <span>{cartState.wishlist.length}</span>
                )}
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </>
  );
}
