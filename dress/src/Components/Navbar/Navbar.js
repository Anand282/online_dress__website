import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const token = localStorage.getItem("authToken");

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userEmail");
        window.location.href = "/";
    };

    return (
        <nav className='navbar navbar-dark bg-dark navbar-expand-lg sticky-top'>
            <div className='container'>
                <Link to='/home' className='navbar-brand'>Dress Shop</Link>
                <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav ms-auto'>
                        <li className='nav-item'><Link className='nav-link' to='/home'>Home</Link></li>
                        <li className='nav-item'><Link className='nav-link' to='/men'>Men's</Link></li>
                        <li className='nav-item'><Link className='nav-link' to='/kurta'>Women's</Link></li>
                        <li className='nav-item'><Link className='nav-link' to='/boyshirt'>Kid's</Link></li>
                        <li className='nav-item'><Link className='nav-link' to='/cart'>Cart</Link></li>
                        <li className='nav-item'><Link className='nav-link' to='/orders'>Orders</Link></li>
                        <li className='nav-item'><Link className='nav-link' to='/contactUSer'>Contact Us</Link></li>
                        {token ? (
                            <>
                                <li className='nav-item'><Link className='nav-link' to='/profile'>Profile</Link></li>
                                <li className='nav-item'><button className='nav-link btn btn-link' onClick={handleLogout}>Logout</button></li>
                            </>
                        ) : (
                            <li className='nav-item'><Link className='nav-link' to='/'>Login</Link></li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
