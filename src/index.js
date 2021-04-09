import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { CartProvider } from "./CartContext";
import { ProductProvider } from "./ProductContext";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastProvider } from "./ToastProvider";
import { Toast } from "./Toast";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ToastProvider>
      <CartProvider>
        <ProductProvider>
          <Router>
            <App />
          </Router>
        </ProductProvider>
      </CartProvider>
    </ToastProvider>
  </StrictMode>,
  rootElement
);
