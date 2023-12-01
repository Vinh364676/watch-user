import { Button, Col, Radio, Rate, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import product from "../../../assets/images/product-detail/1.png";
import product1 from "../../../assets/images/product-detail/2.png";
import product2 from "../../../assets/images/product-detail/3.png";
import product4 from "../../../assets/images/product-detail/4.png";
import "./ProductDetail.scss";
import DiliverIcon from "../../../assets/svg/deliver/diliver";
import CardComponent from "../card-component/CardComponent";
import NewProduct from "../home-page/new-product/NewProduct";
import RateCustomer from "./rateCustomer/rateCustomer";
import BannerComponent from "../banner/BannerComponent";
import { dispatch, useSelector } from "../../../redux/store";
import { getCategory } from "../../../redux/slices/category";
import {  getOneProduct } from "../../../redux/slices/product";
import { useParams } from "react-router";
const items = [
  {
    key: '1',
    label: 'Thông tin bổ sung',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'Đánh giá',
    children: <RateCustomer/>,
  },
];
const ProductDetailPage = () => {
  const productDetail = useSelector((state) => state.product.productDetail);

  const params = useParams<{id: any}>()
  console.log('====================================');
  console.log("productDetail",productDetail);
  console.log('====================================');
 
  useEffect(()=> {
    if(params) {
      dispatch(getOneProduct(params.id))
    }
  }, [params])
  
  const imageArray = productDetail.img.split(',');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  useEffect(() => {
    if (selectedImage === null && imageArray.length > 0) {
      setSelectedImage(imageArray[0]);
    }
  }, []);
  const handleImageClick = (imagePath: any) => {
    setSelectedImage(imagePath);
  };

  console.log('====================================');
  console.log(imageArray[0]);
  console.log('====================================');
  const formattedPrice = (+productDetail.price).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <div className=" prDetail">
      <BannerComponent title="Chi tiết sản phẩm" desc="Đồng hồ sang trọng, hiện đại, đồng hành lý tưởng cho phong cách cá nhân."/>
      <div className="containerCustom sectionCustom">
      <Row>
        <Col xl={12}>
          <Row>
            <Col xl={24}>
              {selectedImage !== null && (
                <div className="prDetail__container">
                  <img
                    src={selectedImage}
                    alt="Selected Image"
                    className="prDetail__imgView"
                  />
                </div>
              )}
            </Col>
            <Col xl={24}>
              <Row className="prDetail__children">
                {imageArray.map((image, index) => (
                 
                    <div className="prDetail__children__img" key={index}
                    onClick={() => handleImageClick(image)}>
                      <img
                        src={image}
                        alt=""
                        style={{ cursor: "pointer" }}
                        className="imgChildren"
                      />
                    </div>
                 
                ))}
              </Row>
            </Col>
          </Row>
        </Col>
        <Col xl={12} className="prDetail__right">
          <h2 className="title">{productDetail.productName}</h2>
          <h5>{formattedPrice}</h5>
          <div className="prDetail__right__container">
          <div className="subTitle prDetail__right__container__buy">Đã bán 5</div>
            <div className="prDetail__right__rate">
              <p className="subTitle rateItem__text">5</p>
              <Rate disabled defaultValue={5} className="rateItem" />
            </div>
            
          </div>
          <div className="prDetail__right__color">
            <p className="subTitle prDetail__right__color--title">Màu sắc</p>
            <Radio.Group defaultValue="a" className="prDetail__right__color__group">
              <Radio.Button
                value="a"
                className="prDetail__right__color__item"
                style={{ background: productDetail.color }}
              ></Radio.Button>
              <Radio.Button
                value="b"
                className="prDetail__right__color__item"
                style={{ background: 'blue' }}
              ></Radio.Button>
              {/* <Radio.Button value="b">Shanghai</Radio.Button>
              <Radio.Button value="c">Beijing</Radio.Button>
              <Radio.Button value="d">Chengdu</Radio.Button> */}
            </Radio.Group>
          </div>

          <p className="subTitle prDetail__right__descItem">
            {productDetail.description}
          </p>
          <div className="prDetail__right__buttonItem">
            <Button className="buttonHeart">Thêm vào yêu thích</Button>
            <Button className="buttonCart">Thêm vào giỏ hàng</Button>
          </div>
          <div className="prDetail__foo">
          <div className="prDetail__right__footer">
            <DiliverIcon />
            <div className="prDetail__right__footer__text">
              <span className="prDetail__right__footer__text--title">
                Giao hàng miễn phí
              </span>
              <span className="prDetail__right__footer__text--desc">
                1-2 ngày
              </span>
            </div>
          </div>
          <div className="prDetail__right__footer">
            <DiliverIcon />
            <div className="prDetail__right__footer__text">
              <span className="prDetail__right__footer__text--title">
                Free Delivery
              </span>
              <span className="prDetail__right__footer__text--desc">
                1-2 day
              </span>
            </div>
          </div>
          <div className="prDetail__right__footer">
            <DiliverIcon />
            <div className="prDetail__right__footer__text">
              <span className="prDetail__right__footer__text--title">
                Bảo hành
              </span>
              <span className="prDetail__right__footer__text--desc">
                1 năm
              </span>
            </div>
          </div>
          </div>
          
        </Col>
      </Row>
      <Tabs defaultActiveKey="2" items={items} centered={true} className="tabDetail"/>
      <Row gutter={[24,0]} className="Similar">
        <div className="prSimilar ">
        <h2 className="title prSimilar__title">Sản phẩm tương tự</h2>
        <p className="subTitle prSimilar__desc">Đồng hồ thanh lịch - hoàn hảo cho mọi khoảnh khắc.</p>
        </div>

        <Col xl={6} className="">
            {/* <CardComponent/>
            </Col> 
            <Col xl={6} className="">
            <CardComponent/>
            </Col> 
            <Col xl={6} className="">
            <CardComponent/>
            </Col> 
            <Col xl={6} className="">
            <CardComponent/> */}
            </Col> 

      </Row>
      </div>

    </div>
  );
};

export default ProductDetailPage;
