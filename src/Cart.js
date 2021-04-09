import { useReducer } from "react";
import { CartContext, useCart } from "./CartContext";
import { NavLink, Route, Routes } from "react-router-dom";

export function Cart() {
  const { cartState, cartDispatch } = useCart();

  return (
    <div>
      {cartState.cart.length === 0 ? (
        <div className="cart-container empty">
          <h1>It looks empty in here</h1>
          <img className="empty-cart-img" src="cart-icon-v3.png" alt="logo" />
          <button className="btn-primary">
            <NavLink to="/products">Shop Now</NavLink>
          </button>
        </div>
      ) : (
        <div className="cart-container">
          <h1 className="cart-header">My Cart ({cartState.cart.length})</h1>
          {cartState.cart.map(
            ({
              id,
              name,
              image,
              price,
              productName,
              fastDelivery,
              inStock,
              ratings,
              qty
            }) => (
              <div className="product-card" key={id}>
                <img src={image} alt={productName} />
                <p className="card-title"> {name} </p>
                <p className="product-price">&#8377; {price * qty} </p>

                {fastDelivery ? (
                  <div style={{ fontSize: "0.8rem", paddingLeft: "0.5rem" }}>
                    Fast Delivery
                  </div>
                ) : (
                  <div style={{ fontSize: "0.8rem", paddingLeft: "0.5rem" }}>
                    3 days minimum
                  </div>
                )}
                <button
                  disabled={qty === 1}
                  onClick={() =>
                    cartDispatch({ type: "DECREMENT", payload: { id } })
                  }
                  className="btn-secondary"
                >
                  -
                </button>
                <span>{qty}</span>
                <button
                  onClick={() =>
                    cartDispatch({ type: "INCREMENT", payload: { id } })
                  }
                  className="btn-secondary"
                >
                  +
                </button>
                <br />
                <button
                  className="btn-secondary remove"
                  onClick={() =>
                    cartDispatch({ type: "REMOVE_CART", payload: { id } })
                  }
                >
                  Remove
                </button>
                {cartState.wishlist.find((item) => id === item.id) ? (
                  <NavLink className="btn-secondary remove" to="/wishlist">
                    Go to Wishlist{" "}
                    <span className="material-icons af">arrow_forward_ios</span>
                  </NavLink>
                ) : (
                  <button
                    onClick={() =>
                      cartDispatch({
                        type: "MOVE_TO_WISHLIST",
                        payload: {
                          id,
                          name,
                          image,
                          price,
                          productName,
                          fastDelivery,
                          inStock,
                          ratings,
                          qty
                        }
                      })
                    }
                    className="btn-secondary remove"
                  >
                    Move to Wishlist
                  </button>
                )}
              </div>
            )
          )}
          <div className="checkout">
            <h1 className="checkout-header">CART DETAILS</h1>
            <div className="checkout-el">
              <p>Total Price</p>
              <p>
                &#8377;{" "}
                {cartState.cart.reduce(
                  (acc, cur) => cur.qty * cur.price + acc,
                  0
                )}
              </p>
            </div>
            <div className="checkout-el">
              <p>Delivery Charges</p>
              <p className="offer">FREE</p>
            </div>
            <div className="checkout-el total">
              <p>Total Amount</p>
              <p>
                &#8377;{" "}
                {cartState.cart.reduce(
                  (acc, cur) => cur.qty * cur.price + acc,
                  0
                )}
              </p>
            </div>
            <button className="btn-primary">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}
