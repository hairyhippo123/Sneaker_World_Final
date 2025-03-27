import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../App.css';
import AirJordan1RetroHigh85 from '../assets/images/AirJordan1RetroHigh85.jpg';
import Jordan from '../assets/images/Jordan.jpg'
import LouisVuitton from '../assets/images/LouisVuitton.jpg'
import Supreme from '../assets/images/Supreme.jpg'
import UGG from '../assets/images/UGG.jpg'
import FOG from '../assets/images/fearofgodessentials.jpg'
const MainPage = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

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
        { id: 1,  image: Jordan },
        { id: 2,  image: FOG },
        { id: 3,  image: LouisVuitton },
        { id: 4,  image: Supreme },
        { id: 5,  image: UGG },
    ];

    const handleLogout = () => {
        logout();
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <div className="main-page">
            {/* Header */}
            <header className="header">
                <div className="header-left">
                    <h1 className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                        Sneaker World
                    </h1>
                </div>
                <div className="header-center">
                    <input type="text" placeholder="Tìm kiếm thương hiệu, màu sắc, v.v." className="search-bar" />
                </div>
                <div className="header-right">
                    <nav className="nav-links">
                        <a href="#">Thương hiệu</a>
                        <a href="#">Mới</a>
                        <a href="#">Nam</a>
                        <a href="#">Nữ</a>
                        <a href="#">Trẻ em</a>
                        <a href="#">Sneakers</a>
                        <a href="#">Giày</a>
                        <a href="#">Trang phục</a>
                        <a href="#">Phụ kiện</a>
                        <a href="#">Danh mục khác</a>
                        <a href="#">Ưu đãi</a>
                    </nav>
                    <div className="auth-buttons">
                        {user ? (
                            <>
                                <span>Xin chào, {user.role}</span>
                                <button onClick={handleLogout} className="logout-button">Đăng xuất</button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => navigate('/login')} className="login-button">Đăng nhập</button>
                                <button onClick={() => navigate('/signup')} className="signup-button">Đăng ký</button>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Banner */}
            <section className="banner">
                <div className="banner-content">
                    <h2>Khám phá bộ sưu tập mới</h2>
                    <button className="shop-now-button">Mua ngay</button>
                </div>
            </section>

            {/* Popular Brands */}
            <section className="popular-brands">
                <div className="section-header">
                    <h2>Thương hiệu nổi bật</h2>
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
                <h2>{user && user.role === 'CUSTOMER' ? 'Đề xuất cá nhân hóa' : 'Đề xuất cho bạn'}</h2>
                <div className="sneaker-list">
                    {(user && user.role === 'CUSTOMER' ? recommendedSneakers : sneakers).map((sneaker) => (
                        <div key={sneaker.id} className="sneaker-card">
                            <img src={sneaker.image} alt={sneaker.name} />
                            <h3>{sneaker.name}</h3>
                            <p>Giá thấp nhất: ${sneaker.price}</p>
                            <span className="xpress-ship">Xpress Ship</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default MainPage;