import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../App.css';
import Header from './Header';
import Footer from './Footer';
import AirJordan1RetroHigh85 from '../assets/images/AirJordan1RetroHigh85.jpg';
import Jordan from '../assets/images/Jordan.jpg';
import LouisVuitton from '../assets/images/LouisVuitton.jpg';
import Supreme from '../assets/images/Supreme.jpg';
import UGG from '../assets/images/UGG.jpg';
import FOG from '../assets/images/fearofgodessentials.jpg';

const MainPage = () => {
    const { user } = useContext(AuthContext);

    const sneakers = [
        { id: 1, name: 'Jordan 1 Retro High OG Bred', price: 272, image: AirJordan1RetroHigh85 },
        { id: 2, name: 'Nike Air Foamposite One Galaxy', price: 197, image: AirJordan1RetroHigh85 },
        { id: 3, name: 'Air Jordan 4 Retro OG SP Nigel', price: 291, image: AirJordan1RetroHigh85 },
        { id: 4, name: 'Jordan 5 Retro OG Black Metallic', price: 229, image: AirJordan1RetroHigh85 },
        { id: 5, name: 'Jordan 4 Retro SB Navy', price: 346, image: AirJordan1RetroHigh85 },
        { id: 6, name: 'Jordan 12 Retro Flu Game', price: 247, image: AirJordan1RetroHigh85 },
    ];

    const recommendedSneakers = [
        { id: 7, name: 'Nike Dunk Low', price: 180, image: 'https://via.placeholder.com/200' },
        { id: 8, name: 'Adidas Yeezy Boost 350', price: 220, image: 'https://via.placeholder.com/200' },
        { id: 9, name: 'Puma Suede Classic', price: 150, image: 'https://via.placeholder.com/200' },
    ];

    const popularBrands = [
        { id: 1, name: 'Jordan', image: Jordan },
        { id: 2, name: 'Fear of God Essentials', image: FOG },
        { id: 3, name: 'Louis Vuitton', image: LouisVuitton },
        { id: 4, name: 'Supreme', image: Supreme },
        { id: 5, name: 'UGG', image: UGG },
    ];

    return (
        <div className="main-page">
            <Header />

            {/* Container chính để giới hạn chiều rộng nội dung */}
            <div className="content-container">
                {/* Banner */}
                <section className="banner">
                    <div className="banner-content">
                        <h2>Pop Mart</h2>
                        <button className="shop-now-button">Shop Now</button>
                    </div>
                </section>

                {/* Popular Brands */}
                <section className="popular-brands">
                    <div className="section-header">
                        <h2>Popular Brands</h2>
                        <a href="#" className="see-all">See All →</a>
                    </div>
                    <div className="brand-list">
                        {popularBrands.map((brand) => (
                            <div key={brand.id} className="brand-card">
                                <img src={brand.image} alt={brand.name} />
                                <h3>{brand.name}</h3>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Welcome Message for Logged-in Customer */}
                {user && user.role === 'CUSTOMER' && (
                    <section className="welcome-message">
                        <h2>Chào mừng bạn, Khách hàng!</h2>
                        <p>Khám phá các sản phẩm được cá nhân hóa dành riêng cho bạn.</p>
                    </section>
                )}

                {/* Recommended Products */}
                <section className="recommended">
                    <h2>{user && user.role === 'CUSTOMER' ? 'Recommended For You' : 'Trending Sneakers'}</h2>
                    <div className="sneaker-list">
                        {(user && user.role === 'CUSTOMER' ? recommendedSneakers : sneakers).map((sneaker) => (
                            <div key={sneaker.id} className="sneaker-card">
                                <div className="favorite-icon">❤️</div> {/* Thêm biểu tượng trái tim */}
                                <img src={sneaker.image} alt={sneaker.name} />
                                <h3>{sneaker.name}</h3>
                                <p>Lowest Ask: ${sneaker.price}</p>
                                <span className="xpress-ship">Xpress Ship</span>
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