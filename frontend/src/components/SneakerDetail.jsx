import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../App.css';
import AirJordan1RetroHigh85 from '../assets/images/Sneakers/Air Jordan 1 Retro High 85.png';
import AirJordan4RetroOG from '../assets/images/Sneakers/Air Jordan 4 Retro OG SP.png';
import AirJordan4RetroSBNavy from '../assets/images/Sneakers/Jordan 4 Retro SB.png';
import NikeAirMax1SWOOSHLowPolyBigHeadOrigins from '../assets/images/Sneakers/Nike Air Max 1.png';
import NikeTotal903SPMetallicSilverRed from '../assets/images/Sneakers/Nike Total 90 3 SP.png';

// Dữ liệu tĩnh (sẽ thay bằng API sau)
const sneakersData = [
    { id: 1, name: 'Jordan 1 Retro High OG SP Union LA Chicago Shadow', price: 270, image: AirJordan1RetroHigh85, sold: 4976, description: 'A classic collaboration between Jordan and Union LA, featuring a Chicago Shadow colorway.', sizes: ['8', '9', '10', '11', '12'] },
    { id: 2, name: 'Air Jordan 4 Retro OG SP Nigel Sylvester Brick', price: 290, image: AirJordan4RetroOG, sold: 7888, description: 'Inspired by Nigel Sylvester, this Air Jordan 4 features a unique brick design.', sizes: ['8', '9', '10', '11', '12'] },
    { id: 3, name: 'Jordan 4 Retro SB Navy', price: 338, image: AirJordan4RetroSBNavy, sold: 2953, description: 'A navy colorway of the Jordan 4 Retro SB, perfect for streetwear enthusiasts.', sizes: ['8', '9', '10', '11', '12'] },
    { id: 4, name: 'Nike Total 90 3 SP Metallic Silver Black', price: 109, image: NikeTotal903SPMetallicSilverRed, sold: 1782, description: 'A sleek metallic silver and black design for the Nike Total 90 3 SP.', sizes: ['8', '9', '10', '11', '12'] },
    { id: 5, name: 'Nike Air Max 1SWOOSH Low Poly Big Head Origins', price: 109, image: NikeAirMax1SWOOSHLowPolyBigHeadOrigins, sold: 1782, description: 'A low-poly design of the Nike Air Max 1 with a big head origins theme.', sizes: ['8', '9', '10', '11', '12'] },
];

const SneakerDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const sneaker = sneakersData.find((item) => item.id === parseInt(id));

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    if (!sneaker) {
        return <div>Product not found</div>;
    }

    const handleAddToCartClick = () => {
        setIsModalOpen(true); // Mở modal khi nhấp vào "Add to Cart"
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Đóng modal
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Vui lòng chọn size!');
            return;
        }
        // Logic thêm vào giỏ hàng (sẽ cập nhật sau khi có backend)
        console.log(`Thêm vào giỏ: ${sneaker.name}, Size: ${selectedSize}, Số lượng: ${quantity}, Giá: $${sneaker.price * quantity}`);
        setIsModalOpen(false); // Đóng modal sau khi thêm
    };

    const handleQuantityChange = (change) => {
        setQuantity((prev) => Math.max(1, prev + change)); // Không cho số lượng nhỏ hơn 1
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
                            <p className="price">Lowest Ask: ${sneaker.price}</p>
                            <p className="sold-info">{sneaker.sold} sold</p>
                            <p className="description">{sneaker.description}</p>
                            <div className="sneaker-detail-actions">
                                <button className="add-to-cart-button" onClick={handleAddToCartClick}>
                                    Add to Cart
                                </button>
                                <button className="buy-now-button">Buy Now</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Modal */}
                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2>{sneaker.name}</h2>
                            <div className="modal-form">
                                <div className="form-group">
                                    <label>Size:</label>
                                    <select
                                        value={selectedSize}
                                        onChange={(e) => setSelectedSize(e.target.value)}
                                    >
                                        <option value="">Chọn size</option>
                                        {sneaker.sizes.map((size) => (
                                            <option key={size} value={size}>
                                                {size}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Giá:</label>
                                    <p>${sneaker.price}</p>
                                </div>
                                <div className="form-group quantity-group">
                                    <label>Số lượng:</label>
                                    <div className="quantity-controls">
                                        <button onClick={() => handleQuantityChange(-1)}>-</button>
                                        <span>{quantity}</span>
                                        <button onClick={() => handleQuantityChange(1)}>+</button>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Tổng:</label>
                                    <p>${sneaker.price * quantity}</p>
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button className="modal-add-button" onClick={handleAddToCart}>
                                    Thêm vào giỏ
                                </button>
                                <button className="modal-close-button" onClick={handleCloseModal}>
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default SneakerDetail;