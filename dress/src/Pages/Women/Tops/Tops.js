import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addToCart } from "../../../features/cartSlice";
const Mshirt_img = require.context(
    "./tops",
    false,
    /\.(png)$/
);
const Mshirt_im = Mshirt_img.keys().map(Mshirt_img);
const Tops = () => {
    const content = [
        {
            id: 38,
            name: "LIGHT BLUE tops",
            description:
                "This light blue formal shirt is perfect for professional and formal occasions. Its classic design and    tailored fit make it an essential piece for any business wardrobe, offering both comfort and style.",
            image: Mshirt_im[0],
            price: 203,
        },
        {
            id: 39,
            name: "BEIGE tops",
            description:
                "A beige formal shirt ideal for business meetings and formal events. Its neutral color and sophisticated    look provide versatility, allowing it to be paired easily with various ties and suits.",
            image: Mshirt_im[1],
            price: 254,
        },
        {
            id: 40,
            name: "WHITE tops",
            description:
                "This white formal shirt is designed for formal settings. Its understated elegance and high-quality    fabric ensure that it remains a staple for any professional setting.",
            image: Mshirt_im[2],
            price: 225,
        },
        {
            id: 41,
            name: "MAROON tops",
            description:
                "This maroon formal shirt stands out with its rich color, making it suitable for formal and semi-formal    settings. The deep hue adds a touch of boldness while maintaining a professional appearance.",
            image: Mshirt_im[3],
            price: 267,
        },
        {
            id: 42,
            name: "PURPLE tops",
            description:
                "A purple formal shirt with a slim fit, appropriate for formal events. The unique color offers a fresh    alternative to traditional shades, perfect for those looking to make a subtle yet distinct impression.",
            image: Mshirt_im[4],
            price: 305,
        },
    ]
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart({ ...product, quantity: 1 }));
    };
    return (
        <>
            <div className='container px-3 py-3'>
                <div className='card bg-secondary text-white'>
                    <div className='card-body'>
                        <h1 className='card-title'>Women's Collections</h1>
                        <p className='card-text'>Here you view recent collections</p>
                    </div>
                </div>
            </div>
            <div className='container card'>
                <h4>Categories</h4>
                <div className='card-body d-flex gap-3'>
                    <p><Link to='/kurta' className='text-decoration-none card-text'>Kurta</Link></p>
                    <p><Link to='/saree' className='text-decoration-none card-text'>Saree</Link></p>
                    <p><Link to='/tops' className='text-decoration-none card-text'>Tops</Link></p>
                </div>

            </div>



            <div className='container' >
                <div className="row mt-4">
                    {content.map((product) => (
                        <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mt-2">
                            <div className="card">
                                <div className="row">
                                    <div className="col-6 col-sm-12">
                                        <img className="img-fluid rounded  w-100" src={product.image} alt={product.name} style={{ height: "300px", objectFit: "cover" }} />
                                    </div>
                                    <div className="col-6 col-sm-12">
                                        <div className="card-body">
                                            <h3 className="mb-3">{product.name}</h3>
                                            <p className='card-text'>Price: ₹{product.price}</p>

                                            <button
                                                onClick={() => {
                                                    handleAddToCart(product);
                                                    alert(`${product.name} has been added to the cart!`);
                                                }}
                                                className="btn btn-primary w-100" >
                                                Add to Cart
                                            </button>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default Tops