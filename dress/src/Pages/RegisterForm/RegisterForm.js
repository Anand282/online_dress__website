import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const [register, setRegister] = useState({
        email: "",
        password: "",
        gender: "",
        number: "",
        age: "",
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null); // Image preview
    const navigate = useNavigate(); // Initialize useNavigate

    const on_Changes = (e) => {
        setRegister((prevRegister) => ({
            ...prevRegister,
            [e.target.name]: e.target.value,
        }));
    };

    // Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const allowedFormats = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
            if (!allowedFormats.includes(file.type)) {
                alert("Only PNG, JPG, JPEG, and WEBP formats are allowed.");
                return;
            }

            setImage(file);
            setPreview(URL.createObjectURL(file)); // Generate preview

        }
    };


    const on_submits = async (e) => {
        e.preventDefault();
        try {
            if (register.email && register.password && register.gender && register.number && register.age && image) {
                const formData = new FormData();
                formData.append("email", register.email);
                formData.append("password", register.password);
                formData.append("gender", register.gender);
                formData.append("number", register.number);
                formData.append("age", register.age);
                formData.append("image", image); // Attach image file

                const response = await axios.post("http://localhost:5000/register", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                console.log("Response from server:", response.data);
                alert("Registration successful! Redirecting to login...");
                navigate("/"); // Redirect to login page after successful registration

                setRegister({
                    email: "",
                    password: "",
                    gender: "",
                    number: "",
                    age: "",
                });

                setImage(null);
                setPreview(null);
            } else {
                alert("All fields and an image are required!");
            }
        } catch (error) {
            console.error("Error occurred while registering:", error);
        }
    };

    return (
        <div className="container mb-2">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-12 col-lg-6 p-3 mt-5">
                    <h2>Register Form</h2>

                    {preview && (
                        <div className="mb-3" >
                            <div className="d-flex justify-content-center align-items-center">
                                {/* <h5>Selected Image Preview:</h5> */}
                                <img src={preview} alt="Preview" className="img-fluid rounded" style={{ objectFit: "cover", maxWidth: "100px", maxHeight: "100px", borderRadius: "60px" }} />
                            </div>
                        </div>
                    )}



                    <form onSubmit={on_submits}>
                        <div className="form-group mt-2">
                            <label>Email:</label>
                            <input type="email" name="email" className="form-control" placeholder="Enter your email" value={register.email} onChange={on_Changes} required />
                        </div>

                        <div className="form-group mt-2">
                            <label>Password:</label>
                            <input type="password" name="password" className="form-control" placeholder="Enter your password" value={register.password} onChange={on_Changes} required />
                        </div>

                        <div className="form-group mt-2">
                            <label>Phone Number:</label>
                            <input type="number" name="number" className="form-control" placeholder="Enter your number" value={register.number} onChange={on_Changes} required />
                        </div>

                        <div className="form-group mt-2">
                            <label>Gender:</label>
                            <div>
                                <input type="radio" name="gender" value="Male" checked={register.gender === "Male"} onChange={on_Changes} required /> Male
                                <input type="radio" name="gender" value="Female" checked={register.gender === "Female"} onChange={on_Changes} required /> Female
                                <input type="radio" name="gender" value="others" checked={register.gender === "others"} onChange={on_Changes} required /> Other
                            </div>
                        </div>

                        <div className="form-group mt-2">
                            <label>Age:</label>
                            <select name="age" className="form-control" value={register.age} onChange={on_Changes} required>
                                <option value="">Select Age</option>
                                <option value="1-18">1 - 18</option>
                                <option value="18-25">18 - 25</option>
                                <option value="25-35">25 - 35</option>
                                <option value="35+">35+</option>
                            </select>
                        </div>

                        <div className="form-group mt-2">
                            <label>Image:</label>
                            <input type="file" accept="image/png, image/jpeg, image/jpg, image/webp" onChange={handleImageChange} required />
                        </div>

                        <button type="submit" className="btn btn-primary px-3 mt-3">
                            Submit
                        </button>
                        <button type="button" className="btn btn-primary px-3 mt-3 ms-2"><Link to='/' className="text-decoration-none text-white">Back to login</Link></button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
