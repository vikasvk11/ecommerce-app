import { useCart } from "./CartContext";
import { NavLink, Route, Routes } from "react-router-dom";

export function Wishlist() {
  const { cartState, cartDispatch } = useCart();

  return (
    <div>
      {cartState.wishlist.length === 0 ? (
        <div className="cart-container empty">
          <h1>What do you wish for? We have it all . . .</h1>
          <img className="empty-cart-img" src="cart-icon-v3.png" alt="logo" />
          <button className="btn-primary">
            <NavLink to="/products">Shop Now</NavLink>
          </button>
        </div>
      ) : (
        <div className="wishlist-container">
          <h1 className="cart-header">
            My Wishlist ({cartState.wishlist.length})
          </h1>
          {cartState.wishlist.map(
            ({
              id,
              name,
              image,
              price,
              productName,
              inStock,
              fastDelivery,
              ratings,
              qty
            }) => (
              <div className="product-card" key={id}>
                <img src={image} alt={productName} />
                <p className="card-title"> {name} </p>
                <p className="product-price">&#8377; {price}</p>
                {inStock && (
                  <div style={{ fontSize: "0.8rem", paddingLeft: "0.5rem" }}>
                    {" "}
                    In Stock{" "}
                  </div>
                )}
                {!inStock && (
                  <div
                    style={{
                      color: "grey",
                      fontSize: "0.8rem",
                      paddingLeft: "0.5rem"
                    }}
                  >
                    {" "}
                    Out of Stock{" "}
                  </div>
                )}
                <p className="product-rating">
                  {ratings}
                  <span className="material-icons">grade</span>
                </p>
                <span
                  onClick={() =>
                    cartDispatch({ type: "REMOVE_WISHLIST", payload: { id } })
                  }
                  className="material-icons wishlist-badge delete-badge"
                >
                  delete
                </span>
                {fastDelivery ? (
                  <div style={{ fontSize: "0.8rem", paddingLeft: "0.5rem" }}>
                    {" "}
                    Fast Delivery{" "}
                  </div>
                ) : (
                  <div style={{ fontSize: "0.8rem", paddingLeft: "0.5rem" }}>
                    {" "}
                    3 days minimum{" "}
                  </div>
                )}
                {cartState.cart.find((item) => id === item.id) ? (
                  <button className="btn-primary mg-1 mg-a-1">
                    <NavLink to="/cart">
                      GO TO CART
                      <span className="material-icons af">
                        arrow_forward_ios
                      </span>
                    </NavLink>
                  </button>
                ) : (
                  <button
                    className="btn-primary mg-a-1"
                    disabled={inStock ? false : true}
                    onClick={() =>
                      cartDispatch({
                        type: "MOVE_TO_CART",
                        payload: {
                          id,
                          name,
                          image,
                          price,
                          productName,
                          inStock,
                          fastDelivery,
                          ratings,
                          qty
                        }
                      })
                    }
                  >
                    MOVE TO CART
                  </button>
                )}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
