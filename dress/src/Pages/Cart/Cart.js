import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../../features/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUpdateQuantity = (id, quantity) => {
        dispatch(updateQuantity({ id, quantity }));
    };

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleBuyNow = async (item) => {
      try {
          const token = localStorage.getItem("authToken");
          if (!token) {
              alert("Please log in to place an order.");
              return;
          }
  
          const response = await axios.post(
              "http://localhost:5000/api/orders/create-order", // Full URL
              { items: [item] }, // Send the item as an order
              { headers: { Authorization: `Bearer ${token}` } } // Include the token
          );
  
          if (response.status === 201) {
              alert("Order placed successfully!");
              navigate("/orders"); // Redirect to orders page
          }
      } catch (error) {
          console.error("Error placing order:", error);
          alert("Failed to place order");
      }
  };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="container mt-4" style={{"min-height":"80vh"}}>
            <h2 className="mb-3">Shopping Cart</h2>
            {cart.length === 0 ? (
                <div className="alert alert-warning text-center">No items in the cart</div>
            ) : (
                <div className="card shadow-sm">
                    <div className="card-body">
                        <ul className="list-group">
                            {cart.map((item) => (
                                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <img src={item.image} alt={item.name} className="img-fluid me-3" style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "5px" }} />
                                        <div>
                                            <strong>{item.name}</strong> <br />
                                            Quantity: {item.quantity} | Price: ₹{item.price}
                                        </div>
                                    </div>
                                    <div>
                                        <button className="btn btn-sm btn-success mx-1" onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                                        <button className="btn btn-sm btn-warning mx-1" onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                                        <button className="btn btn-sm btn-danger mx-1" onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                                        <button className="btn btn-sm btn-primary mx-1" onClick={() => handleBuyNow(item)}>Buy Now</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-3 text-end">
                            <h5>Total Quantity: <span>{totalItems}</span></h5>
                            <h5>Total Price: <span>₹{totalPrice}</span></h5>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;