import { createContext, useReducer } from "react";
import "./styles.css";
import { Toast } from "./Toast";
import uuid from "uuid";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  function toastRed(state, action) {}

  const [toastState, toastDispatch] = useReducer(toastRed, [
    {
      id: uuid(),
      message: "Added to Cart"
    }
  ]);

  return (
    <ToastContext.Provider value={{}}>
      <div className="toast-container">
        {toastState.map((item) => (
          <Toast {...item} />
        ))}
      </div>
      {children}
    </ToastContext.Provider>
  );
}
