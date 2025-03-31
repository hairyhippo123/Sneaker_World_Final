import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../App.css';

// Dữ liệu tĩnh (sẽ thay bằng API sau)
const sneakersData = [
    { id: 1, name: 'Jordan 1 Retro High OG SP Union LA Chicago Shadow', price: 270, image: '/path/to/AirJordan1RetroHigh85.jpg', sold: 4976, description: 'A classic collaboration between Jordan and Union LA, featuring a Chicago Shadow colorway.' },
    { id: 2, name: 'Air Jordan 4 Retro OG SP Nigel Sylvester Brick', price: 290, image: '/path/to/AirJordan4RetroOG.jpg', sold: 7888, description: 'Inspired by Nigel Sylvester, this Air Jordan 4 features a unique brick design.' },
    { id: 3, name: 'Jordan 4 Retro SB Navy', price: 338, image: '/path/to/AirJordan4RetroSBNavy.jpg', sold: 2953, description: 'A navy colorway of the Jordan 4 Retro SB, perfect for streetwear enthusiasts.' },
    { id: 4, name: 'Nike Total 90 3 SP Metallic Silver Black', price: 109, image: '/path/to/NikeTotal903SPMetallicSilverRed.jpg', sold: 1782, description: 'A sleek metallic silver and black design for the Nike Total 90 3 SP.' },
    { id: 5, name: 'Nike Air Max 1SWOOSH Low Poly Big Head Origins', price: 109, image: '/path/to/NikeAirMax1SWOOSHLowPolyBigHeadOrigins.jpg', sold: 1782, description: 'A low-poly design of the Nike Air Max 1 with a big head origins theme.' },
];

const SneakerDetail = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate();
    const sneaker = sneakersData.find((item) => item.id === parseInt(id)); // Tìm sản phẩm theo ID

    if (!sneaker) {
        return <div>Product not found</div>;
    }

    const handleAddToCart = () => {
        // Logic để thêm sản phẩm vào giỏ hàng (có thể lưu vào state hoặc localStorage)
        console.log(`${sneaker.name} added to cart!`);
    };

    return (
        <div className="main-page">
            <Header />
            <div className="content-container">
                <section className="sneaker-detail">
                    <div className="sneaker-detail-container">
                        <div className="sneaker-detail-image">
                            <img src={sneaker.image} alt={sneaker.name} />
                        </div>
                        <div className="sneaker-detail-info">
                            <h1>{sneaker.name}</h1>
                            <p className="price">Buy Now for ${sneaker.price}</p>
                            <p className="sold-info">Last Sale: ${sneaker.sold}</p>
                            <p className="description">{sneaker.description}</p>
                            <div className="sneaker-detail-actions">
                                <button className="add-to-cart-button" onClick={handleAddToCart}>
                                    Add to Cart
                                </button>
                                <button className="buy-now-button">Buy Now</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default SneakerDetail;