import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../features/orderSlice";

const OrderPage = () => {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mt-4" style={{"min-height":"80vh"}}>
            <h2>Your Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul className="list-group">
                    {orders.map((order) => (
                        <li key={order._id} className="list-group-item">
                            <h5>Order ID: {order._id}</h5>
                            <p>Status: {order.status}</p>
                            <ul>
                                {order.items.map((item) => (
                                    <li key={item.id}>
                                        {item.name} - ₹{item.price} (Qty: {item.quantity} 
                                        {/* - (iMAGE:{item.image}) */}
                                        )
                                        
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderPage;