import { createContext, useReducer, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  function cartReducer(state, action) {
    switch (action.type) {
      case "ADDTOCART":
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, qty: 1 }]
        };
      case "INCREMENT":
        return {
          ...state,
          cart: state.cart.map((product) =>
            product.id === action.payload.id
              ? { ...product, qty: product.qty + 1 }
              : product
          )
        };
      case "DECREMENT":
        return {
          ...state,
          cart: state.cart.map((product) =>
            product.id === action.payload.id
              ? { ...product, qty: product.qty - 1 }
              : product
          )
        };
      case "REMOVE_CART":
        return {
          ...state,
          cart: state.cart.filter((product) => product.id !== action.payload.id)
        };
      case "ADD_TO_WISHLIST":
        return {
          ...state,
          wishlist: [...state.wishlist, action.payload]
        };
      case "REMOVE_WISHLIST":
        return {
          ...state,
          wishlist: state.wishlist.filter(
            (product) => product.id !== action.payload.id
          )
        };
      case "MOVE_TO_CART":
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, qty: 1 }],
          wishlist: state.wishlist.filter(
            (product) => product.id !== action.payload.id
          )
        };
      case "MOVE_TO_WISHLIST":
        return {
          ...state,
          cart: state.cart.filter(
            (product) => product.id !== action.payload.id
          ),
          wishlist: [...state.wishlist, action.payload]
        };
      default:
        return state;
    }
  }

  const [cartState, cartDispatch] = useReducer(cartReducer, {
    cart: [],
    wishlist: []
  });

  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
