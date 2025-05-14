// frontend/src/features/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = () => async (dispatch) => {
    try {
        const response = await axios.get("/api/cart", { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } });
        dispatch(setCart(response.data.cart));
    } catch (error) {
        console.error("Error fetching cart:", error);
    }
};

export const syncCart = (cart) => async (dispatch) => {
    try {
        await axios.post("/api/add-to-cart", cart, { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } });
    } catch (error) {
        console.error("Error syncing cart:", error);
    }
};

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        updateQuantity: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        setCart: (state, action) => {
            state.items = action.payload;
        },
    },
});

export const { addToCart, updateQuantity, removeFromCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;