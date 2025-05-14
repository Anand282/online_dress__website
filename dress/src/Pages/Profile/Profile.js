

import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("authToken");
            const email = localStorage.getItem("userEmail");

            if (!token || !email) {
                console.error("No auth token found");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:5000/profile/${email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("Profile data:", response.data);
                
                // Set user data to state
                if (response.data.success) {
                    setUser(response.data.user);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, []); // Dependency array ensures it runs only once when component mounts

    if (!user) return <p>Loading profile...</p>;

    return (
        <div className="container mt-5 " style={{"min-height":"75vh"}}>
            <h2>User Profile</h2>
            {/* <br></br> */}
            {user.imageUrl && (
                <img src={`http://localhost:5000${user.imageUrl}`} alt="Profile" style={{ width: "100px", borderRadius: "20%" }} />
            )}
            <br></br>
            <br></br>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Phone Number:</strong> {user.number}</p>
            <p><strong>Age:</strong> {user.age}</p>
        </div>
    );
};

export default Profile;
