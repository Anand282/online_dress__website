import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminLogin = () => {
    const [admin, setAdmin] = useState({ username: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setAdmin({ ...admin, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://online-dress-website-61vs-backend.vercel.app//admin/login", admin);

            if (response.data.success) {
                localStorage.setItem("adminAuthToken", response.data.token);
                localStorage.setItem("adminEmail", response.data.admin.email); // Store admin email

                setMessage("Admin login successful! Redirecting...");
                setTimeout(() => {
                    window.location.href = "/admin-dashboard"; // Redirect to admin dashboard
                }, 2000);
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            console.error("Error logging in as admin:", error);
            setMessage("Server error. Try again later.");
        }
    };

    return (
        <>
            <div className="container mt-5 me-5">
                <ul className="nav nav-underline">
                    <li className="nav-item">
                        <Link className="nav-link" to='/'>User Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to='/admin'>Admin Login</Link>
                    </li>
                </ul>
            </div>
            <div className="container">
                <div className='row d-flex justify-content-center align-items-center'>
                    <div className='col-12 col-lg-6 p-3'>
                        <h2>Admin Login</h2>
                        {message && <p>{message}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mt-3">
                                <label>Username:</label>
                                <input type="text" name="username" className="form-control" onChange={handleChange} placeholder="Enter admin username" required />
                            </div>

                            <div className="form-group mt-3">
                                <label>Password:</label>
                                <input type="password" name="password" className="form-control" onChange={handleChange} placeholder="Enter admin password" required />
                            </div>
                            <br />
                            <button type="submit" className="btn btn-primary mt-2">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminLogin;