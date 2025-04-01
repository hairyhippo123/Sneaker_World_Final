import React from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../App.css';

const BrandDetail = () => {
    const { id } = useParams(); // Lấy id từ URL

    // Giả lập dữ liệu thương hiệu (sau này bạn có thể lấy từ API)
    const brands = {
        1: { name: 'Jordan', description: 'Explore the latest Jordan sneakers.' },
        2: { name: 'Fear of God Essentials', description: 'Discover Fear of God Essentials apparel.' },
        3: { name: 'Louis Vuitton', description: 'Luxury bags and accessories from Louis Vuitton.' },
        4: { name: 'Supreme', description: 'Streetwear from Supreme.' },
        5: { name: 'UGG', description: 'Cozy footwear from UGG.' },
    };

    const brand = brands[id] || { name: 'Unknown Brand', description: 'No description available.' };

    return (
        <div className="main-page">
            <Header />
            <div className="content-container">
                <h2>{brand.name}</h2>
                <p>{brand.description}</p>
                <p>Đây là trang chi tiết của thương hiệu. Bạn có thể thêm danh sách sản phẩm ở đây.</p>
            </div>
            <Footer />
        </div>
    );
};

export default BrandDetail;