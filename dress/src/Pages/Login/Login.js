import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
    const [user, setUser] = useState({ username: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/", user, {
                withCredentials: true
            });


            if (response.data.success) {
                localStorage.setItem("authToken", response.data.token);
                localStorage.setItem("userEmail", response.data.user.email); // Store user email

                setMessage("Login successful! Redirecting...");
                setTimeout(() => {
                    window.location.href = "/home"; // Redirect to home
                }, 2000);
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setMessage("Server error. Try again later.");
        }
    };



    return (
        <>
            <div className="container mt-5 me-5">
                <ul className="nav nav-underline">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to='/'>User Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/admin'>Admin Login</Link>
                    </li>
                    {/* <li class="nav-item">
                        <Link class="nav-link" to='/seller'>Seller</Link>
                    </li> */}

                </ul>
            </div>
            <div className="container">
                <div className='row d-flex justify-content-center align-items-center'>
                    <div className='col-12 col-lg-6  p-3'>
                        <h2>Login</h2>
                        {message && <p>{message}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mt-3">
                                <label>Username:</label>
                                <input type="text" name="username" className="form-control" onChange={handleChange} placeholder="enter your user name" required />
                            </div>

                            <div className="form-group mt-3">
                                <label>Password:</label>
                                <input type="password" name="password" className="form-control" onChange={handleChange} placeholder="enter your password" required />
                            </div>
                            <br></br>
                            <button type="submit" className="btn btn-primary mt-2">Login</button>
                            <button type="button" className="btn btn-primary mt-2 ms-2"><Link to='/register' className="text-decoration-none text-white">Register</Link></button>
                        </form>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Login;
