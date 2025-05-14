import React from 'react'
import Contact from '../../Pages/Contact/Contact'
import One from './CaroImg/1.jpeg'
import Two from './CaroImg/2.jpeg'
import Three from './CaroImg/3.jpeg'
import Allproduct from '../Allproducts/Allproduct'
const Caro = () => {
    return (
        <>
            <div id='carouselExIndicators' className='carousel slide' data-bs-ride='carousel'>
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                        <img src={One} className="d-block w-100 " alt="..." style={{ height: '608px', objectFit: 'cover' }} />
                        <div class="carousel-caption  d-md-block">
                            <h5>Step into style</h5>
                            <p>Discover trendy dresses for every occasion!</p>
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <img src={Two} className="d-block w-100 " alt="..." style={{ height: '608px', objectFit: 'cover' }} />
                        <div class="carousel-caption  d-md-block">
                            <h5>Unleash your elegance</h5>
                            <p>Fashion that makes a statement!</p>
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <img src={Three} className="d-block w-100" alt="..." style={{ height: '608px', objectFit: 'cover' }} />
                        <div class="carousel-caption  d-md-block">
                            <h5>New arrivals are here</h5>
                            <p>Shop the latest looks today!</p>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <Allproduct />
            <Contact />
        </>
    )
}

export default Caro