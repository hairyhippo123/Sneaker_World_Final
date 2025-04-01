import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
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
    { id: 1, name: 'Jordan 1 Retro High OG SP Union LA Chicago Shadow', price: 270, image: AirJordan1RetroHigh85, sold: 4976, description: 'A classic collaboration between Jordan and Union LA, featuring a Chicago Shadow colorway.' },
    { id: 2, name: 'Air Jordan 4 Retro OG SP Nigel Sylvester Brick', price: 290, image: AirJordan4RetroOG, sold: 7888, description: 'Inspired by Nigel Sylvester, this Air Jordan 4 features a unique brick design.' },
    { id: 3, name: 'Jordan 4 Retro SB Navy', price: 338, image: AirJordan4RetroSBNavy, sold: 2953, description: 'A navy colorway of the Jordan 4 Retro SB, perfect for streetwear enthusiasts.' },
    { id: 4, name: 'Nike Total 90 3 SP Metallic Silver Black', price: 109, image: NikeTotal903SPMetallicSilverRed, sold: 1782, description: 'A sleek metallic silver and black design for the Nike Total 90 3 SP.' },
    { id: 5, name: 'Nike Air Max 1SWOOSH Low Poly Big Head Origins', price: 109, image: NikeAirMax1SWOOSHLowPolyBigHeadOrigins, sold: 1782, description: 'A low-poly design of the Nike Air Max 1 with a big head origins theme.' },
];

const SneakerDetail = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate();
    const sneaker = sneakersData.find((item) => item.id === parseInt(id)); // Tìm sản phẩm theo ID

    if (!sneaker) {
        return <div>Product not found</div>;
    }

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
                            <button className="buy-now-button">Buy Now</button>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default SneakerDetail;