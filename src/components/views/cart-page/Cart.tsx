import { Button, Col, Form, Input, Row, Table } from "antd";
import React, { useEffect } from "react";
import cartImg from "../../../assets/images/product/cart.png";
import { MinusOutlined, PlusOutlined,DeleteOutlined } from "@ant-design/icons";
import productImg from "../../../assets/images/product/newproduct1.png"
import "./Cart.scss";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../../constants/url-config";
import { dispatch, useSelector } from "../../../redux/store";
import { getProduct } from "../../../redux/slices/product";
const Cart = () => {
  const handleQuantityChange = (recordKey: string, action: 'increment' | 'decrement') => {
    // Implement logic to update the quantity in the data array based on the action
    // For example, find the item in the data array with the given key and update its quantity
  };
  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      width: 280,
      render: (text: any, record: any) => (
        <div className="cart__table__name">
          <img
            // className="product__table__img"
            src={record.image}
            style={{ width: "50px" }}
          />
          <span>
          {text}
          </span>
        </div>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity', // Use a unique dataIndex for 'Số lượng'
      key: 'quantity',
      render: (text: any, record: any) => (
        <div>
          <Button
            type="primary"
            onClick={() => handleQuantityChange(record.key, 'decrement')}
          ><MinusOutlined /></Button>
          {text}
          <Button
            type="primary"
            onClick={() => handleQuantityChange(record.key, 'increment')}
          ><PlusOutlined /></Button>
        </div>
      ),
    },
    {
      title: 'Giá tiền',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      key: 'action',
      render: (text: any, record: any) => (
        <Button
          // type="danger"
          // onClick={() => handleDelete(record.key)}
        >
          <DeleteOutlined />
        </Button>
      ),
    },
  ];


  const { productList } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProduct({ pageIndex: 1, pageSize: 100 }));
  }, []);
  const storedProductListString = sessionStorage.getItem("productList");
  const storedProductList = storedProductListString
    ? JSON.parse(storedProductListString)
    : [];
    const combinedProductList = productList.map((product) => {
      const storedProduct = storedProductList.find(
        (item: any) => item.id === product.id
      );
      return {
        ...product,
        product: storedProduct ? storedProduct.id : 0,
        quantity: storedProduct ? storedProduct.quantity : 0,
      };
    });
  
    const data = combinedProductList
    .filter((product) => product.product !== 0)
    .map((product) => ({
      key: product.id.toString(),
      name: product.productName,
      image: product.thumnail,
      quantity: product.quantity,
    }));
  return (
    <div className="containerCustom sectionCustom cart">
      <Row gutter={[56,0]}> 
        <Col xl={14} className="cart__left">
          <h5>Shopping Cart</h5>
          {/* <div>
            <img src={cartImg} alt="" />
            <div>
              <p>Apple iPhone 14 Pro Max 128Gb Deep Purple</p>
              <p>Black</p>
            </div>
            <div className="cartItem__quantity">
              <button
                //   onClick={decrementQuantity}
                className="cartItem__quantity__button"
              >
                <MinusOutlined />
              </button>
              <span className="cartItem__quantity__number">1</span>
              <button
                //   onClick={incrementQuantity}
                className="cartItem__quantity__button"
              >
                <PlusOutlined />
              </button>
            </div>
            <div>
                <p>$1399</p>
            </div>
          </div> */}
          <Table className="cart__table" pagination={false} columns={columns} dataSource={data} />
        </Col>
        <Col xl={10} className="cart__right">
          <h5>Order Summary</h5>
          <Form labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}>
          <Form.Item
        label="Mã giảm giá"
        name="username"
        requiredMark ={"optional"}
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Row gutter={[20,0]}>
          <Col xl={18}>
        <Input allowClear placeholder="Nhập mã (nếu có)" className="cart__right__input"/>
          </Col>
          <Col xl={6}>
          <Button className="cart__right__button">Kiểm tra</Button>
          </Col>
        </Row>
      </Form.Item>
          </Form>
          <div className="cart__right__content">
          <p className="subTitle cart__right__content__subTotal">Tổng sản phẩm</p>
          <p className="subTitle cart__right__content__subTotal">$2347</p>
          </div>
          <div className="cart__right__content">
          <p className="subTitle cart__right__content__text">Thuế</p>
          <p className="subTitle cart__right__content__text">8%</p>
          </div>
          <div className="cart__right__content">
          <p className="subTitle cart__right__content__text">Vận chuyển</p>
          <p className="subTitle cart__right__content__text">$29</p>
          </div>
          <div className="cart__right__content">
          <p className="subTitle cart__right__content__subTotal">Tổng cộng</p>
          <p className="subTitle cart__right__content__subTotal">$29</p>
          </div>
          <Link to={ROUTE_PATHS.Checkout}>
           <Button className="cart__right__checkout">Checkout</Button>
          
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
