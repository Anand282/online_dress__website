import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <footer className='p-3 bg-dark text-white'>
                <div className='row '>
                    <div className='col text-center'>
                        <p>@2025 - copy-rights reserved Anand</p>
                        <p></p>
                    </div>
                    <div className='col text-center'>
                    <ul className='list-inline  '> 
                        <li className='list-inline-item '><Link className='text-decoration-none text-white'>Terms of services</Link></li>
                        <li className='list-inline-item'><Link className='text-white text-decoration-none'>Privacy Policy</Link></li>
                        <li className='list-inline-item'><Link className='text-white text-decoration-none' to='/contactUser'>Contact Us</Link></li>
                        <li className='list-inline-item'><Link className='text-white text-decoration-none' to='/report'>Report Any Issues</Link></li>
                    </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer