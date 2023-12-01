import { Button, Card, Rate, notification } from "antd";
import "./CardComponent.scss";
import Meta from "antd/lib/card/Meta";
import product from "../../../assets/images/product/a.png";
import heart from "../../../assets/icon/heart.svg";
import HeartIcon from "../../../assets/svg/heart/Heart";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import moment from "moment";
import { useAuthContext } from "../../../hooks/useAuthContext";

type Props = {
  image: string;
  brand: string;
  name: string;
  price: number | String;
  href: any;
  onClickItem?: () => void;
};
const CardComponent = ({ image, brand, name, price, href,onClickItem }: Props) => {
  const {isAuthenticated} = useAuthContext();
  const formattedPrice = (+price).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const showNotification = () => {
    notification.error({
      className: "notification__item--error",
      message: "Đăng nhập để thêm sản phẩm vào giỏ hàng",
      //   description: 'Sản phẩm đã được xóa thành công!',
      duration: 3,
    });
  };

  return (
    <>
      <Card
        hoverable
        className="card"
        style={
          {
            // width:300,
          }
        }
        cover={
          <Link to={href}>
            <div className="card__item">
              <div className="zoom-effect">
                <img alt="example" src={image} className="card__image" />
              </div>
              <div className="card__item__heart">
                <HeartIcon />
              </div>
            </div>
          </Link>
        }
      >
        <div className="cart__layout">
          <div className="card__item__button">
            <div className="card__content">
              <h5 className="card__content--top">{brand}</h5>
              <h2 className="card__content__title">{name}</h2>
              <p className="card__content--bottom">{formattedPrice}</p>
              {/* <div className="card__content__footer">
                <p>$199.00</p>
                  <Rate className="card__rate" disabled defaultValue={5} />
                </div> */}
            </div>
          </div>
          <div className="card__footer">
          {isAuthenticated ? (
              <Button className="button__submit" type="primary" onClick={onClickItem}>
                <ShoppingCartOutlined /> Thêm vào giỏ
              </Button>
            ) : (
              <Button className="button__submit" type="primary" onClick={showNotification}>
                <ShoppingCartOutlined /> Thêm vào giỏ
              </Button>
            )}
          </div>
        </div>
      </Card>
    </>
  );
};

export default CardComponent;
