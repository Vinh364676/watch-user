import React, { useEffect } from 'react';
import './SuccessCart.scss';
import { dispatch, useSelector } from '../../../redux/store';
import { getPayment } from '../../../redux/slices/payment';

const SuccessCart = () => {
    const {paymentList} = useSelector(state => state.payment)
    console.log('====================================');
    console.log("paymentList",paymentList);
    console.log('====================================');
    useEffect(() => {
        
        dispatch(getPayment({ pageIndex: 1, pageSize: 100 }));
      }, []);
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
                {/* <h2 className="success-heading">Thanh toán thành công!</h2> */}
                {/* <p className="thank-you">Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi.</p> */}
                {Array.isArray(paymentList) && paymentList.map((payment, index) => (
          <div key={index} className="payment-details">
            <p>Mã đơn hàng của bạn: <strong>{payment.orderId}</strong></p>
            <div className="order-details">
              <p>Thông tin chi tiết đơn hàng:</p>
              <ul>
                <li>{`Sản phẩm: ${payment.orderDescription} x 1`}</li>
                {/* Add more product details if needed */}
              </ul>
            </div>
            <p className="total">Tổng cộng: ${payment.success ? '50.00' : '0.00'}</p>
         
          </div>
        ))}
                <p className="confirmation-message">Chúng tôi sẽ gửi email xác nhận đơn hàng cho bạn trong thời gian sớm nhất.</p>
                <button className="back-to-home-btn" onClick={() => window.location.href = "/"}>Quay lại trang chủ</button>
            </div>
        </div>
    );
};

export default SuccessCart;
