import React from 'react'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
const Contact = () => {
    const notify = () => {
        toast('form submitted successfully')
    }
    const [user, setUser] = useState({ 'email': '', 'name': '', 'message': '' });

    const on_Change = (e) => {
        setUser((user) => {
            return { ...user, [e.target.name]: e.target.value };
        })
    }
    const onSubmit_ = async (e) => {
        e.preventDefault()
        try {
            if (user.email && user.name && user.message) {
                const response = await axios.post('http://localhost:5000/contactUser', user)
                console.log(response);

                setUser(() => {
                    return { "email": "", "name": "", "message": "" }
                })
                window.location.href = "/contactUser/"
                alert("form submitted successfully")
            }
            else {
                alert("fill details")
            }
        }
        catch (error) {
            console.error("error adding contact form", error);
        }
    }
    return (
        <>
            {/* <div className="video-background">
                <video autoPlay loop muted>
                    <source src="/background.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div> */}
            <div className='container mb-2'>
                <div className='row d-flex justify-content-center align-items-center'>
                    <div className='col-12 col-lg-6  p-3 mt-5 ' >
                        <h2>Contact Form</h2>
                        <br></br>
                        <form action='' encType='multipart/form-data' onSubmit={onSubmit_}>
                            <div className='form-group mt-2'>
                                <label>Email Address</label>
                                <input type="email" name='email' id='email' className='form-control' placeholder='Enter your email' value={user.email} onChange={on_Change} />
                            </div>
                            <div className='form-group mt-2'>
                                <label>Name</label>
                                <input type="text" name='name' id='name' className='form-control' placeholder='Enter your name' value={user.name} onChange={on_Change} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Message</label>
                                <textarea name='message' id='message' className='form-control' placeholder='Enter your message' cols='10' rows='5' value={user.message}
                                    onChange={on_Change}></textarea>
                            </div>
                            <button type='submit' className='btn btn-primary my-2 mt-4'>Submit</button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact