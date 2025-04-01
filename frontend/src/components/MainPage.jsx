import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../App.css';
import Header from './Header';
import Footer from './Footer';
//Brand
import Jordan from '../assets/images/Brand/Jordan.jpg';
import LouisVuitton from '../assets/images/Brand/LouisVuitton.jpg';
import Supreme from '../assets/images/Brand/Supreme.jpg';
import UGG from '../assets/images/Brand/UGG.jpg';
import FOG from '../assets/images/Brand/fearofgodessentials.jpg';
//Products
import AirJordan1RetroHigh85 from '../assets/images/TrendingSneakers/AirJordan1RetroHigh85.jpg';
import AirJordan4RetroOG from '../assets/images/TrendingSneakers/AirJordan4RetroOG.jpg';
import AirJordan4RetroSBNavy from '../assets/images/TrendingSneakers/AirJordan4RetroSBNavyProduct.jpg';
import NikeAirMax1SWOOSHLowPolyBigHeadOrigins from '../assets/images/TrendingSneakers/NikeAirMax1SWOOSHLowPolyBigHeadOrigins.jpg';
import NikeTotal903SPMetallicSilverRed from '../assets/images/TrendingSneakers/NikeTotal903SPMetallicSilverRed.jpg';
//Steal and Deals
import Tile1 from '../assets/images/StealAndDeals/Copy_of_Brand_Tile_Template_(1).jpg';
import Tile2 from '../assets/images/StealAndDeals/Copy_of_Brand_Tile_Template_(2).jpg';
import Tile4 from '../assets/images/StealAndDeals/Copy_of_Brand_Tile_Template_(4).jpg';
import Tile5 from '../assets/images/StealAndDeals/Copy_of_Brand_Tile_Template_(5).jpg';
import Tile6 from '../assets/images/StealAndDeals/Copy_of_Brand_Tile_Template_(6).jpg';
import Tile7 from '../assets/images/StealAndDeals/Copy_of_Brand_Tile_Template_(7).jpg';
//Banner
import TrendingNikeAirMax from '../assets/images/banner/TrendingNikeAirMax.jpg';
import CherryBlossom from '../assets/images/banner/CherryBlossom.jpg';

const MainPage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState({}); // Trạng thái favorite

    const sneakers = [
        { id: 1, name: 'Jordan 1 Retro High OG SP Union LA Chicago Shadow', price: 270, image: AirJordan1RetroHigh85, sold: 4976 },
        { id: 2, name: 'Air Jordan 4 Retro OG SP Nigel Sylvester Brick', price: 290, image: AirJordan4RetroOG, sold: 7888 },
        { id: 3, name: 'Jordan 4 Retro SB Navy', price: 338, image: AirJordan4RetroSBNavy, sold: 2953 },
        { id: 4, name: 'Nike Total 90 3 SP Metallic Silver Black', price: 109, image: NikeTotal903SPMetallicSilverRed, sold: 1782 },
        { id: 5, name: 'Nike Air Max 1SWOOSH Low Poly Big Head Origins', price: 109, image: NikeAirMax1SWOOSHLowPolyBigHeadOrigins, sold: 1782 },
    ];

    const popularBrands = [
        { id: 1, name: 'Jordan', image: Jordan },
        { id: 2, name: 'Fear of God Essentials', image: FOG },
        { id: 3, name: 'Louis Vuitton', image: LouisVuitton },
        { id: 4, name: 'Supreme', image: Supreme },
        { id: 5, name: 'UGG', image: UGG },
    ];

    const handleBrandClick = (brandId) => navigate(`/brand/${brandId}`);
    const handleSneakerClick = (sneakerId) => navigate(`/sneaker/${sneakerId}`);
    const handleScrollToAnchor = (anchor) => {
        const element = document.getElementById(anchor);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };
    const toggleFavorite = (id) => {
        setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleRoleNavigation = () => {
        if (user.role === 'MODERATOR') {
            navigate('/moderator/welcome');
        } else if (user.role === 'ADMIN') {
            navigate('/admin/welcome');
        }
    };

    return (
        <div className="main-page">
            <Header
                showRoleButton={user && (user.role === 'MODERATOR' || user.role === 'ADMIN')}
                role={user?.role}
                onRoleClick={handleRoleNavigation}
            />
            <div className="content-container">
                {/* Banner Section */}
                <section className="banner-section">
                    <div className="banner-large">
                        <img
                            src={CherryBlossom}
                            alt="Louis Vuitton x Murakami Cherry Blossom"
                            className="banner-large-image"
                        />
                    </div>
                    <div className="banner-small">
                        <img
                            src={TrendingNikeAirMax}
                            alt="Nike Air Max 1 SWOOSH"
                            className="banner-small-image"
                        />
                    </div>
                </section>

                {/* Steals & Deals Section */}
                <section className="steals-deals" id="steals-deals">
                    <h2>Steals & Deals</h2>
                    <div className="deal-image-container">
                        {[Tile1, Tile2, Tile4, Tile5, Tile6, Tile7].map((tile, index) => (
                            <div key={index} className="image-card">
                                <img
                                    src={tile}
                                    alt="Steals & Deals"
                                    className="deal-image"
                                    onClick={() => handleScrollToAnchor('popular-brands')}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Popular Brands */}
                <section className="popular-brands" id="popular-brands">
                    <div className="section-header">
                        <h2>Popular Brands</h2>
                        <a href="#" className="see-all">See All →</a>
                    </div>
                    <div className="deal-image-container">
                        {popularBrands.map((brand) => (
                            <div
                                key={brand.id}
                                className="image-card"
                                onClick={() => handleBrandClick(brand.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img src={brand.image} alt={brand.name} className="deal-image" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Welcome Message */}
                {user && user.role === 'CUSTOMER' && (
                    <section className="welcome-message">
                        <h2>Chào mừng bạn, Khách hàng!</h2>
                        <p>Khám phá các sản phẩm được cá nhân hóa dành riêng cho bạn.</p>
                    </section>
                )}

                {/* Trending Sneakers */}
                <section className="trending-sneakers">
                    <div className="section-header">
                        <h2>Trending Sneakers</h2>
                        <a
                            className="see-all"
                            onClick={() => navigate('/all-sneakers')} // Điều hướng đến trang AllSneakers
                            style={{ cursor: 'pointer' }}
                        >
                            See All →
                        </a>
                    </div>
                    <div className="sneaker-list">
                        {sneakers.map((sneaker) => (
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
                                            e.stopPropagation();
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

export default MainPage;