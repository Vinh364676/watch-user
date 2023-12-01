import {
  Button,
  Col,
  Drawer,
  Empty,
  Input,
  Menu,
  Modal,
  Popover,
  Row,
  Table,
  notification,
} from "antd";
import "./index.scss";
import { Link, useParams } from "react-router-dom";
import {
  CloseCircleOutlined,
  MinusOutlined,
  PlusOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { ROUTE_PATHS } from "../../../../../constants/url-config";
import { useEffect, useRef, useState } from "react";
import logo from "../../../../../assets/images/Logo.png";
import heart from "../../../../../assets/icon/heart.svg";
import search from "../../../../../assets/icon/search.svg";
import usera from "../../../../../assets/icon/user.svg";
import cart from "../../../../../assets/icon/cart.svg";
import product from "../../../../../assets/images/product/product.svg";
import { useAuthContext } from "../../../../../hooks/useAuthContext";
import { LOCAL_STORAGE_KEYS } from "../../../../../constants/local";
import { dispatch, useSelector } from "../../../../../redux/store";
import { getOneProduct, getProduct } from "../../../../../redux/slices/product";
import LocalUtils from "../../../../../utils/local";
import jwt from "jsonwebtoken";
type Props = {};
const items = [
  {
    label: <Link to={ROUTE_PATHS.Home}>Trang chủ</Link>,
    key: "home",
  },
  {
    label: <Link to={ROUTE_PATHS.Shop}>Cửa hàng</Link>,
    key: "shop",
  },
  {
    label: <Link to={ROUTE_PATHS.ProductDetail}>Liên hệ</Link>,
    key: "contact",
  },
];

const showNotification = () => {
  notification.success({
    className: "notification__item",
    message: "Đăng xuất thành công",
    //   description: 'Sản phẩm đã được xóa thành công!',
    duration: 3,
  });
};

const MainHeader = (props: Props) => {
  const [isModalLogout, setIsModalLogout] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useAuthContext();
  const [inputVisible, setInputVisible] = useState(false);

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

  // const productIdList = storedProductList.map(item => item.id);
  const showModalLogout = () => {
    setIsModalLogout(true);
  };
  const handleOkLog = () => {
    setIsModalLogout(false);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    showNotification();
    setTimeout(() => {
      window.location.href = "/";
    }, 3000); // Thời gian chờ 3 giây (3000 milliseconds
  };
  const handleCancelLog = () => {
    setIsModalLogout(false);
  };
  const [searchValue, setSearchValue] = useState('');
  const filteredProducts = productList.filter(product =>
    product.productName.toLowerCase().includes(searchValue.toLowerCase())
  );
  const content = (
    <div>
      {isAuthenticated ? (
        <Button
          className="popoverButton__button popoverButton__button__login"
          onClick={showModalLogout}
        >
          Đăng xuất
        </Button>
      ) : (
        <div>
          <Link to={ROUTE_PATHS.SignIn}>
            <Button className="popoverButton__button popoverButton__button__login">
              Đăng nhập
            </Button>
          </Link>
          <Link to={ROUTE_PATHS.SignUp}>
            <Button className="">Đăng ký</Button>
          </Link>
        </div>
      )}
    </div>
  );
  const contentSearch = (
    <div >
      {searchValue && filteredProducts.length > 0 ? (
        filteredProducts.map(product => (
          <Link to={ROUTE_PATHS.ProductDetail.replace(":id", product.id.toString())}>
<div className="searchData" key={product.id}>
            <img src={product.thumnail} alt="" className="searchData__img" />
            <h5 className="subTitle">{product.productName}</h5>
          </div>
          </Link>
          
        ))
      ) : (
        <Empty className="emptySearch"/>
      )}
    </div>
  );
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0 && !scrolled) {
        setScrolled(true);
      } else if (window.scrollY === 0 && scrolled) {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const inputRef = useRef<HTMLInputElement | null>(null); // Explicitly specify the type
  const liRef = useRef<HTMLLIElement | null>(null);
  const [hiding, setHiding] = useState(false);
  
  const handleLiClick = () => {
    setInputVisible(!inputVisible);
    setHiding(false);
  };

  const handleInputClick = (e: any) => {
    e.stopPropagation();
  };

  const handleClickOutside = (e: any) => {
    if (liRef.current && !liRef.current.contains(e.target)) {
      setHiding(true);
      // Delay hiding to allow time for the slideInOut animation
      setTimeout(() => setInputVisible(false), 500);
    }
  };

  useEffect(() => {
    // Thêm sự kiện lắng nghe cho click bên ngoài
    document.addEventListener("click", handleClickOutside);

    // Cleanup sự kiện khi component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <>
      <Row className={`header ${scrolled ? "scrolled" : ""}`}>
        <Col xl={8}>
          <div className="test">
            <img src={logo} alt="" />
          </div>
        </Col>
        <Col xl={8}>
          <div>
            <Menu
              className="header__content"
              mode="horizontal"
              disabledOverflow={true}
              items={items}
            ></Menu>
          </div>
        </Col>
        <Col xl={8}>
          <div>
            <ul className="header__content header__content__right">
              <li
                className={`header__content__right__search ${
                  inputVisible ? "active" : ""
                } ${hiding ? "hiding" : ""}`}
                ref={liRef}
                onClick={handleLiClick}
              >
                {inputVisible && (
                  <div
                    className="input-container"
                    ref={inputRef}
                    onClick={handleInputClick}
                  >
                    <Popover
                      content={contentSearch}
                      placement="bottom"
                      trigger="click"
                    >
                      <Input
                        allowClear
                        type="text"
                        placeholder="Tìm kiếm"
                        bordered={false}
                        className="input__search"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                      />
                    </Popover>
                  </div>
                )}
                <img src={search} alt="" />
              </li>

              <li>
                <img src={heart} alt="" />
              </li>
              <li>
                {/* <Link to={ROUTE_PATHS.Home}> */}
                <img src={cart} alt="" onClick={showDrawer} />
                {/* </Link> */}
              </li>
              <li>
                <Popover
                  placement="bottomRight"
                  content={content}
                  trigger="hover"
                >
                  <img src={usera} alt="" />
                </Popover>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
      <Drawer
        className="drawer__cart"
        onClose={onClose}
        open={open}
        title="Giỏ hàng"
      >
        <div>
          {combinedProductList
            .filter((product) => product.product !== 0)
            .map((product) => (
              <Row className="cartItem" key={product.id}>
                <Col xl={4} className="cartItem__left">
                  <img
                    src={product.img}
                    alt=""
                    className="cartItem__left__img"
                  />
                </Col>
                <Col xl={20} className="cartItem__right">
                  <div className="cartItem__content">
                    <h3>{product.productName}</h3>
                    <div className="cartItem__quantity">
                      <button
                        onClick={decrementQuantity}
                        className="cartItem__quantity__button"
                      >
                        <MinusOutlined />
                      </button>
                      <span className="cartItem__quantity__number">
                        {product.quantity}
                      </span>
                      <button
                        onClick={incrementQuantity}
                        className="cartItem__quantity__button"
                      >
                        <PlusOutlined />
                      </button>
                    </div>
                  </div>
                  <div>
                    <p>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.price * product.quantity)}
                    </p>
                    <Button className="cartItem__delete">
                      <DeleteOutlined />
                    </Button>
                  </div>
                </Col>
              </Row>
            ))}
        </div>
        {isAuthenticated ?
         <div>
 <div className="drawer__footer">
          <span>Subtotal</span>
          <span>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(
              combinedProductList
                .filter((product) => product.product !== 0)
                .reduce(
                  (total, product) => total + product.price * product.quantity,
                  0
                )
            )}
          </span>
        </div>
         <Row className="cart__checkout" gutter={[24, 0]}>
          <Col xl={12}>
            <Link to={ROUTE_PATHS.Cart}>
              <Button className="cart__checkout__button">
                <ShoppingCartOutlined />
                <span className="subTitle">Giỏ hàng</span>
              </Button>
            </Link>
          </Col>
          <Col xl={12}>
          
            <Link to={ROUTE_PATHS.Checkout}>
              <Button className="cart__checkout__button">
                <SendOutlined />
                <span className="subTitle">Thanh toán</span>
              </Button>
            </Link>
          </Col>
        </Row> 
         </div>
        :<Empty
        className="cart__checkout__empty"
        description="Đăng nhập để xem thông tin"
         
      >
        <Link to={ROUTE_PATHS.SignIn}>
        <Button type="primary">Đăng nhập</Button>
        </Link>
      </Empty>}
       
       
       
      </Drawer>
      <Modal open={isModalLogout} onOk={handleOkLog} onCancel={handleCancelLog}>
        <p>Bạn có muốn đăng xuất hay không?</p>
      </Modal>
    </>
  );
};

export default MainHeader;
