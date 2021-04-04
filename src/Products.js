import React, { useReducer } from "react";
import "./styles.css";
import { useCart } from "./CartContext";
import { useProduct } from "./ProductContext";
import { NavLink, Route, Routes } from "react-router-dom";

import faker from "faker";

faker.seed(123);

const data = [...Array(50)].map((item, index) => ({
  id: index,
  name: faker.commerce.productName(),
  image: faker.random.image(),
  price: faker.commerce.price(),
  material: faker.commerce.productMaterial(),
  brand: faker.lorem.word(),
  inStock: faker.random.boolean(),
  fastDelivery: faker.random.boolean(),
  ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  offer: faker.random.arrayElement([
    "Save 50",
    "70% bonanza",
    "Republic Day Sale"
  ]),
  idealFor: faker.random.arrayElement([
    "Men",
    "Women",
    "Girl",
    "Boy",
    "Senior"
  ]),
  level: faker.random.arrayElement([
    "beginner",
    "amateur",
    "intermediate",
    "advanced",
    "professional"
  ]),
  color: faker.commerce.color()
}));

export function Products() {
  function sortData(products, productState) {
    if (productState.sort === "high_to_low") {
      return products.sort((a, b) => b.price - a.price);
    }
    if (productState.sort === "low_to_high") {
      return products.sort((a, b) => a.price - b.price);
    }
    return products;
  }

  function filterData(products, productState) {
    return products
      .filter((item) => (productState.showFD ? item.fastDelivery : true))
      .filter((item) => (productState.showAll ? true : item.inStock));
  }

  const { cartState, cartDispatch } = useCart();

  const { productState, productDispatch } = useProduct();

  const sortedData = sortData(data, productState);
  const filteredData = filterData(sortedData, productState);

  return (
    <>
      <h1 className="mg-1">Products</h1>
      <label style={{ margin: "1rem" }}>
        <input
          type="radio"
          name="sort"
          onChange={() =>
            productDispatch({ type: "sort", payload: "high_to_low" })
          }
          checked={productState.sort === "high_to_low"}
        />
        High to Low
      </label>
      <label style={{ margin: "1rem 1rem" }}>
        <input
          type="radio"
          name="sort"
          onChange={() =>
            productDispatch({ type: "sort", payload: "low_to_high" })
          }
          checked={productState.sort === "low_to_high"}
        />
        Low to High
      </label>
      <br />
      <label style={{ margin: "1rem" }}>
        <input
          type="checkbox"
          name="include"
          onChange={() => productDispatch({ type: "showAll", payload: "All" })}
          checked={productState.showAll}
        />
        Include Out of Stock
      </label>
      <label style={{ margin: "1rem" }}>
        <input
          type="checkbox"
          name="fastdelivery"
          onChange={() =>
            productDispatch({ type: "showFD", payload: "showFD" })
          }
          checked={productState.showFD}
        />
        Fast Delivery Only
      </label>

      <div className="App" style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredData.map(
          ({
            id,
            name,
            image,
            price,
            productName,
            inStock,
            fastDelivery,
            ratings
          }) => (
            <div
              key={id}
              style={{
                margin: "1rem",
                maxWidth: "40%",
                padding: "0 0 1rem"
              }}
              className="product-card"
            >
              <img src={image} alt={productName} />
              <p className="card-title"> {name} </p>
              <p className="product-price">Rs. {price}</p>
              {/* {inStock && <div style={{ fontSize: "0.8rem" }}> In Stock </div>} */}
              {!inStock && (
                <div style={{ color: "grey", fontSize: "0.8rem" }}>
                  {" "}
                  Out of Stock{" "}
                </div>
              )}
              <p className="product-rating">
                {ratings}
                <span className="material-icons">grade</span>
              </p>
              {cartState.wishlist.find((item) => id === item.id) ? (
                <span
                  onClick={() =>
                    cartDispatch({ type: "REMOVE_WISHLIST", payload: { id } })
                  }
                  className="material-icons wishlist-badge"
                  style={{ color: "red" }}
                >
                  favorite
                </span>
              ) : (
                <span
                  onClick={() =>
                    cartDispatch({
                      type: "ADD_TO_WISHLIST",
                      payload: {
                        id,
                        name,
                        image,
                        price,
                        productName,
                        inStock,
                        fastDelivery,
                        ratings
                      }
                    })
                  }
                  className="material-icons wishlist-badge"
                >
                  favorite
                </span>
              )}

              {fastDelivery ? (
                <div style={{ fontSize: "0.8rem" }}> Fast Delivery </div>
              ) : (
                <div style={{ fontSize: "0.8rem" }}> 3 days minimum </div>
              )}
              <div>
                {cartState.cart.find((item) => id === item.id) ? (
                  <button className="btn-primary mg-1">
                    <NavLink to="/cart">
                      GO TO CART
                      <span className="material-icons af">
                        arrow_forward_ios
                      </span>
                    </NavLink>
                  </button>
                ) : (
                  <button
                    className="btn-primary mg-1"
                    disabled={inStock ? false : true}
                    onClick={() =>
                      cartDispatch({
                        type: "ADDTOCART",
                        payload: {
                          id,
                          name,
                          image,
                          price,
                          productName,
                          inStock,
                          fastDelivery,
                          ratings
                        }
                      })
                    }
                  >
                    ADD TO CART
                  </button>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}
