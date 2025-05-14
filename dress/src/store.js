// frontend/src/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import orderReducer from "./features/orderSlice";
import authReducer from "./features/authSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        orders: orderReducer,
    },
});