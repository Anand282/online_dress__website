// You'll need to do the following to implement a Profile feature:

// Update Backend to Fetch User Details

// Create an API route /profile to get the logged-in user's details using the stored auth token.
// Modify Frontend to Display Profile in Navbar

// Fetch user details from the backend when the page loads.
// Show the user's profile picture and name in the navbar.
// Create a Profile Page

// Display user details (email, gender, phone number, age, profile picture).
// Backend: Create Profile Route (server.js)
// Add this route to fetch user details:

// javascript
// Copy
// Edit
// const jwt = require("jsonwebtoken");

// app.get("/profile", async (req, res) => {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ error: "Unauthorized" });

//     try {
//         const decoded = jwt.verify(token, "your_secret_key"); // Replace with actual secret key
//         const db = await getDb();
//         const collection = db.collection("register");

//         const user = await collection.findOne({ email: decoded.email }, { projection: { password: 0 } });

//         if (user) {
//             res.json(user);
//         } else {
//             res.status(404).json({ error: "User not found" });
//         }
//     } catch (error) {
//         console.error("Error fetching profile:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// });
// 🔹 Ensure that when a user logs in, you generate and send a JWT token in the response.
// Modify login response:

// javascript
// Copy
// Edit
// const token = jwt.sign({ email: user.email }, "your_secret_key", { expiresIn: "1h" });
// res.json({ success: true, message: "Login successful", user, token });
// Frontend: Modify Navbar to Show Profile
// Update Navbar.js
// javascript
// Copy
// Edit
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const Navbar = () => {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             const token = localStorage.getItem("authToken");
//             if (!token) return;

//             try {
//                 const response = await axios.get("http://localhost:5000/profile", {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//                 setUser(response.data);
//             } catch (error) {
//                 console.error("Error fetching profile:", error);
//             }
//         };

//         fetchUserProfile();
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem("authToken");
//         window.location.href = "/"; // Redirect to login
//     };

//     return (
//         <header>
//             <nav className='navbar navbar-dark bg-dark navbar-expand-lg sticky-top'>
//                 <div className='container'>
//                     <Link to='/home' className='navbar-brand'>Dress Shop</Link>
//                     <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav'>
//                         <span className='navbar-toggler-icon'></span>
//                     </button>
//                     <div className='collapse navbar-collapse' id='navbarNav'>
//                         <ul className='navbar-nav ms-auto'>
//                             <li className='nav-item'><Link className='nav-link' to='/home'>Home</Link></li>
//                             <li className='nav-item'><Link className='nav-link' to='/men'>Men's</Link></li>
//                             <li className='nav-item'><Link className='nav-link' to='/kurta'>Women's</Link></li>
//                             <li className='nav-item'><Link className='nav-link' to='/boyshirt'>Kid's</Link></li>
//                             <li className='nav-item'><Link className='nav-link' to='/contactUSer'>Contact Us</Link></li>
//                             <li className='nav-item'><Link className='nav-link' to='/cart'>Cart</Link></li>
                            
//                             {user ? (
//                                 <>
//                                     <li className='nav-item'>
//                                         <Link className='nav-link' to='/profile'>
//                                             <img src={`http://localhost:5000${user.imageUrl}`} alt="Profile" 
//                                                 className="rounded-circle" 
//                                                 style={{ width: "35px", height: "35px", objectFit: "cover" }} />
//                                             {user.email}
//                                         </Link>
//                                     </li>
//                                     <li className='nav-item'>
//                                         <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
//                                     </li>
//                                 </>
//                             ) : (mklmkm
//                                 <>
//                                     <li className='nav-item'><Link className='nav-link' to='/register'>Register</Link></li>
//                                     <li className='nav-item'><Link className='nav-link' to='/'>Login</Link></li>
//                                 </>
//                             )}
//                         </ul>
//                     </div>
//                 </div>
//             </nav>
//         </header>
//     );
// };

// export default Navbar;
// ✔️ This displays the logged-in user's email and profile picture in the navbar.

// Frontend: Create Profile Page (Profile.js)
// javascript
// Copy
// Edit
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Profile = () => {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             const token = localStorage.getItem("authToken");
//             if (!token) return;

//             try {
//                 const response = await axios.get("http://localhost:5000/profile", {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//                 setUser(response.data);
//             } catch (error) {
//                 console.error("Error fetching profile:", error);
//             }
//         };

//         fetchUserProfile();
//     }, []);

//     if (!user) {
//         return <div className="container mt-5"><h2>Loading profile...</h2></div>;
//     }

//     return (
//         <div className="container mt-5">
//             <h2>User Profile</h2>
//             <div className="card p-3">
//                 <div className="d-flex align-items-center">
//                     <img src={`http://localhost:5000${user.imageUrl}`} alt="Profile" 
//                         className="rounded-circle" 
//                         style={{ width: "100px", height: "100px", objectFit: "cover" }} />
//                     <div className="ms-3">
//                         <h5>{user.email}</h5>
//                         <p><strong>Gender:</strong> {user.gender}</p>
//                         <p><strong>Phone:</strong> {user.number}</p>
//                         <p><strong>Age Group:</strong> {user.age}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Profile;
// Frontend: Add Profile Route in App.js
// Make sure to add a route to the profile page.

// javascript
// Copy
// Edit
// import Profile from "./Profile"; // Import Profile component

// <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
// ✅ Final Implementation Summary
// Backend
// Add /profile API to return logged-in user details.
// Ensure login response includes JWT token.
// Navbar
// Show profile picture and name if logged in.
// Profile Page
// Display user details (email, gender, phone, age, profile picture).
// Protect Profile Route
// Use ProtectedRoute to prevent unauthorized access.