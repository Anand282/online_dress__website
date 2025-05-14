import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";
const Mshirt_img = require.context(
    "./shirt_images",
    false,
    /\.(png)$/
);
const Mshirt_im = Mshirt_img.keys().map(Mshirt_img);

const Men = () => {

    const content = [
        {
            id: 1,
            name: "LIGHT BLUE FORMAL SHIRT",
            description:
                "This light blue formal shirt is perfect for professional and formal occasions. Its classic design and    tailored fit make it an essential piece for any business wardrobe, offering both comfort and style.",
            image: Mshirt_im[0],
            price: 203,
        },
        {
            id: 2,
            name: "BEIGE FORMAL SHIRT",
            description:
                "A beige formal shirt ideal for business meetings and formal events. Its neutral color and sophisticated    look provide versatility, allowing it to be paired easily with various ties and suits.",
            image: Mshirt_im[1],
            price: 251,
        },
        {
            id: 3,
            name: "WHITE FORMAL SHIRT",
            description:
                "This white formal shirt is designed for formal settings. Its understated elegance and high-quality    fabric ensure that it remains a staple for any professional setting.",
            image: Mshirt_im[2],
            price: 221,
        },
        {
            id: 4,
            name: "MAROON FORMAL SHIRT",
            description:
                "This maroon formal shirt stands out with its rich color, making it suitable for formal and semi-formal    settings. The deep hue adds a touch of boldness while maintaining a professional appearance.",
            image: Mshirt_im[3],
            price: 273,
        },
        {
            id: 5,
            name: "PURPLE FORMAL SHIRT",
            description:
                "A purple formal shirt with a slim fit, appropriate for formal events. The unique color offers a fresh    alternative to traditional shades, perfect for those looking to make a subtle yet distinct impression.",
            image: Mshirt_im[4],
            price: 304,
        },
        {
            id: 6,
            name: "GREY SHIRT",
            description:
                "A versatile grey shirt suitable for casual and semi-formal wear. Its neutral tone makes it easy to pair    with different trousers, adding to its practicality for everyday use.",
            image: Mshirt_im[5],
            price: 189,
        },
        {
            id: 7,
            name: "STRIPED SHIRT IN GREY",
            description:
                "This shirt features grey and black horizontal stripes, suitable for casual and semi-formal wear. The    pattern adds a modern twist to a classic design, making it a trendy choice.",
            image: Mshirt_im[6],
            price: 309,
        },
        {
            id: 8,
            name: "GREY AND WHITE POLO SHIRT",
            description:
                "A grey and white polo shirt perfect for casual and sporty looks. Its breathable fabric and comfortable    fit make it ideal for both active days and relaxed outings.",
            image: Mshirt_im[7],
            price: 250,
        },
        {
            id: 9,
            name: "SHORT-SLEEVED SHIRT",
            description:
                "A short-sleeved shirt with blue and white patterns, suitable for casual wear. The lightweight material    and vibrant design make it perfect for warm weather and leisure activities.",
            image: Mshirt_im[8],
            price: 209,
        },
        {
            id: 10,
            name: "GREY CAMOUFLAGE SHIRT",
            description:
                "A white and grey camouflage shirt, great for casual and trendy looks. Its unique print and contemporary    style make it a standout piece in any casual wardrobe.",
            image: Mshirt_im[9],
            price: 288,
        },
        {
            id: 11,
            name: "LIGHT BLUE CHAMBRAY SHIRT",
            description:
                "This light blue chambray shirt is versatile for casual and semi-formal occasions. The soft, breathable    fabric offers comfort, while its classic design ensures it remains stylish and timeless.",
            image: Mshirt_im[10],
            price: 226,
        },
        {
            id: 12,
            name: "DARK BLUE CHAMBRAY SHIRT",
            description:
                "A dark blue chambray shirt perfect for everyday wear. Its durable material and deep color make it    suitable for a variety of casual settings.",
            image: Mshirt_im[11],
            price: 246,
        },


    ];

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart({ ...product, quantity: 1 }));
    };

    return (
        <>

            <div className='container px-3 py-3'>
                <div className='card bg-secondary text-white'>
                    <div className='card-body'>
                        <h1 className='card-title'>Men's Collections</h1>
                        <p className='card-text'>Here you view recent collections</p>
                    </div>
                </div>
            </div>
            <div className='container card'>
                <h4>Categories</h4>
                <div className='card-body d-flex gap-3'>
                    <p><Link to='/men' className='text-decoration-none card-text'>Shirts</Link></p>
                    <p><Link to='/tshirt' className='text-decoration-none card-text'>T-Shirts</Link></p>
                    <p><Link to='/jeans' className='text-decoration-none card-text'>Jeans</Link></p>
                    <p><Link to='/jacket' className='text-decoration-none card-text'>Jackets</Link></p>

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
                                                className="btn btn-primary w-100"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div >



        </>
    )
}

export default Men