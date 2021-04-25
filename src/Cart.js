import { useReducer, useState } from "react";
import { CartContext, useCart } from "./CartContext";
import { NavLink, Route, Routes } from "react-router-dom";
import "./styles.css";

export function Cart() {
  const { cartState, cartDispatch } = useCart();

  const [modalState, setModalState] = useState({ state: false, productId: "" });

  function modalAppear(id) {
    setModalState({ state: true, productId: id });
    console.log({ 1: modalState });
  }

  function modalDisappear() {
    setModalState({ state: false, productId: "" });
  }

  function modalDelete() {
    cartDispatch({
      type: "REMOVE_CART",
      payload: { id: modalState.productId }
    });
    setModalState({ state: false, productId: "" });
  }

  console.log({ 2: modalState });

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
                <p className="product-price">
                  &#8377; {(price * qty).toLocaleString()}{" "}
                </p>

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
                  onClick={() => modalAppear(id)}
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
                {cartState.cart
                  .reduce((acc, cur) => cur.qty * cur.price + acc, 0)
                  .toLocaleString()}
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
                {cartState.cart
                  .reduce((acc, cur) => cur.qty * cur.price + acc, 0)
                  .toLocaleString()}
              </p>
            </div>
            <button className="btn-primary">Checkout</button>
          </div>
        </div>
      )}
      <div className={`modal-bg ${modalState.state ? "modal-bg-active" : ""}`}>
        <div className="modal">
          <h1>
            Delete item{" "}
            <span
              onClick={modalDisappear}
              className="material-icons modal-close"
            >
              close
            </span>
          </h1>
          <p>Are you sure you want to delete this item from your cart?</p>
          <div className="modal-btn-container">
            <button
              onClick={modalDisappear}
              className="btn-secondary-outline modal-btn"
            >
              Cancel
            </button>
            <button
              onClick={modalDelete}
              className="btn-primary-outline modal-btn"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
