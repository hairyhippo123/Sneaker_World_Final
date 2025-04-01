import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../App.css';
import AirJordan1RetroHigh85 from '../assets/images/TrendingSneakers/AirJordan1RetroHigh85.jpg';
import AirJordan4RetroOG from '../assets/images/TrendingSneakers/AirJordan4RetroOG.jpg';
import AirJordan4RetroSBNavy from '../assets/images/TrendingSneakers/AirJordan4RetroSBNavyProduct.jpg';
import NikeAirMax1SWOOSHLowPolyBigHeadOrigins from '../assets/images/TrendingSneakers/NikeAirMax1SWOOSHLowPolyBigHeadOrigins.jpg';
import NikeTotal903SPMetallicSilverRed from '../assets/images/TrendingSneakers/NikeTotal903SPMetallicSilverRed.jpg';
// Dữ liệu tĩnh (sẽ thay bằng API sau)
const sneakersData = [
    { id: 1, name: 'Jordan 1 Retro High OG SP Union LA Chicago Shadow', price: 270, image: AirJordan1RetroHigh85, sold: 4976 },
    { id: 2, name: 'Air Jordan 4 Retro OG SP Nigel Sylvester Brick', price: 290, image: AirJordan4RetroOG, sold: 7888 },
    { id: 3, name: 'Jordan 4 Retro SB Navy', price: 338, image: AirJordan4RetroSBNavy, sold: 2953 },
    { id: 4, name: 'Nike Total 90 3 SP Metallic Silver Black', price: 109, image: NikeAirMax1SWOOSHLowPolyBigHeadOrigins, sold: 1782 },
    { id: 5, name: 'Nike Air Max 1SWOOSH Low Poly Big Head Origins', price: 109, image: NikeTotal903SPMetallicSilverRed, sold: 1782 },
];

const AllSneakers = () => {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState({}); // Trạng thái favorite

    const handleSneakerClick = (sneakerId) => {
        navigate(`/sneaker/${sneakerId}`);
    };

    const toggleFavorite = (id) => {
        setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="main-page">
            <Header />
            <div className="content-container">
                <section className="trending-sneakers">
                    <div className="section-header">
                        <h2>All Sneakers</h2>
                    </div>
                    <div className="sneaker-list">
                        {sneakersData.map((sneaker) => (
                            <div
                                key={sneaker.id}
                                className="sneaker-card"
                                onClick={() => handleSneakerClick(sneaker.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="sneaker-image">
                                    <div
                                        className={`favorite-icon ${favorites[sneaker.id] ? 'active' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation(); // Ngăn sự kiện click lan lên sneaker-card
                                            toggleFavorite(sneaker.id);
                                        }}
                                    >
                                        ❤️
                                    </div>
                                    <img src={sneaker.image} alt={sneaker.name} />
                                </div>
                                <div className="sneaker-info">
                                    <h3>{sneaker.name}</h3>
                                    <p>Lowest Ask <span className="price">${sneaker.price}</span></p>
                                    <p className="sold-info">{sneaker.sold} sold <span className="rocket-icon">🚀</span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default AllSneakers;