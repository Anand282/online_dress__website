import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch orders for the logged-in user
export const fetchOrders = createAsyncThunk(
    "orders/fetchOrders",
    async (_, { getState }) => {
        const token = localStorage.getItem("authToken"); // Access token from localStorage
        if (!token) {
            throw new Error("No token found");
        }

        const response = await axios.get("http://localhost:5000/api/orders", { // Full URL
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.orders;
    }
);

const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default orderSlice.reducer;