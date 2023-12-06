import React from 'react';
import './SuccessCart.scss';

const SuccessCart = () => {
    return (
        <div className="success-cart-container">
            <div className="animation-container">
                <div className="confetti">
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    <div className="confetti-piece"></div>
                    {/* Thêm nhiều hơn nếu bạn muốn */}
                </div>
            </div>
            <div className="content">
                <h2 className="success-heading">Thanh toán thành công!</h2>
                <p className="thank-you">Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi.</p>
                <p>Mã đơn hàng của bạn: <strong>#123456</strong></p>
                <div className="order-details">
                    <p>Thông tin chi tiết đơn hàng:</p>
                    <ul>
                        <li>Sản phẩm 1: Áo thun x 2</li>
                        <li>Sản phẩm 2: Quần jean x 1</li>
                        {/* Thêm thông tin sản phẩm khác nếu cần */}
                    </ul>
                </div>
                <p className="total">Tổng cộng: $50.00</p>
                <p className="confirmation-message">Chúng tôi sẽ gửi email xác nhận đơn hàng cho bạn trong thời gian sớm nhất.</p>
                <button className="back-to-home-btn" onClick={() => window.location.href = "/"}>Quay lại trang chủ</button>
            </div>
        </div>
    );
};

export default SuccessCart;
