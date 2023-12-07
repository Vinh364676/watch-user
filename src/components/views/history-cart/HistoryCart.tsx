// HistoryCart.jsx

import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  Empty,
  Menu,
  Modal,
  Space,
  Table,
  notification,
} from "antd";
import "antd/dist/antd.css"; // Import Ant Design styles
import "./HistoryCart.scss"; // Import your custom CSS styles
import { dispatch, useSelector } from "../../../redux/store";
import { getHistory, updateHistory } from "../../../redux/slices/history";
import moment from "moment";
import {
  ShoppingCartOutlined,
  CloseOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../../constants/url-config";
import { getProduct } from "../../../redux/slices/product";
import { getHistoryDetail } from "../../../redux/slices/historyDetail";
const HistoryCart = () => {
  const { historyList } = useSelector((state) => state.history);
  console.log("====================================");
  console.log("historyList", historyList);
  console.log("====================================");
  const { productList } = useSelector((state) => state.product);
  const { historyDetailList } = useSelector((state) => state.historyDetail);

  console.log("====================================");
  console.log("historyDetailList", historyDetailList);
  console.log("====================================");
  useEffect(() => {
    dispatch(getHistory({ pageIndex: 1, pageSize: 100 }));
    dispatch(getProduct({ pageIndex: 1, pageSize: 100 }));
    dispatch(getHistoryDetail({ pageIndex: 1, pageSize: 100 }));
  }, []);
  const getProductById = (productId: any) => {
    const product = productList.find((product) => product.id === productId);
    return product ? product.productName : "Unknown Product";
  };

  const orderHistory = historyList.map((historyItem) => {
    const formattedTotal = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(historyItem.totalPrice);

    // Filter historyDetailList to get details for the current historyItem
    const historyDetailsForItem = historyDetailList.filter(
      (detail) => detail.billId === historyItem.id
    );

    // Fetch product names from historyDetailsForItem
    const productNames = historyDetailsForItem.map((detail) =>
      getProductById(detail.productId)
    );

    return {
      key: historyItem.id,
      idProduct: historyDetailsForItem.map((detail) => detail.productId),
      date: moment(historyItem.createDate).format("DD/MM/YYYY"),
      total: formattedTotal,
      status: historyItem.orderStatus,
      products: productNames.join(", "), // Concatenate product names
    };
  });
  orderHistory.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
  
    // Compare dates
    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return 0;
  });
  
  console.log("====================================");
  console.log("orderHistory", orderHistory);
  console.log("====================================");
  const showNotification = () => {
    notification.success({
      className: "notification__item",
      message: "Hủy đơn hàng thành công",
      //   description: 'Sản phẩm đã được xóa thành công!',
      duration: 3,
    });
  };
  const handleCancel = (key: any) => {
    try {
      // If key is just a number, assume it's the id and structure it as an object
      const updatedKey = { id: key };

      console.log("Dispatching updateHistory for id:", updatedKey.id);
      dispatch(updateHistory(updatedKey));
      // showNotification();
      console.log("====================================");
      console.log("key", updatedKey);
      console.log("====================================");
    } catch (error) {
      console.error("Error in handleCancel:", error);
      // Handle the error or log accordingly
    }
  };

  const [isModalLogout, setIsModalLogout] = useState(false);
  const [isModalDetail, setIsModalDetail] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const showModalDetail = () => {
    setIsModalDetail(true);
  };
  const handleOkDetail = () => {
    setIsModalDetail(false);
  };
  const handleCancelDetail = () => {
    setIsModalDetail(false);
  };
  const showModalLogout = (key: any) => {
    setIsModalLogout(true);
    setSelectedProductId(key);
  };
  const handleOkLog = async () => {
    setIsModalLogout(false);

    try {
      // If key is just a number, assume it's the id and structure it as an object
      const updatedKey = { id: selectedProductId };

      console.log("Dispatching updateHistory for id:", updatedKey.id);
      dispatch(updateHistory(updatedKey));
      // showNotification();
      showNotification();
    } catch (error) {
      console.error("Error in handleCancel:", error);
      // Handle the error or log accordingly
    }
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const handleCancelLog = () => {
    setIsModalLogout(false);
  };
  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "products",
      key: "products",
      render: (text: any, record: any) => (
        <div
          dangerouslySetInnerHTML={{
            __html: record.products.replace(/,/g, "<br>"),
          }}
        />
      ),
    },
    {
      title: "Ngày đặt",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Giá tiền",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      dataIndex: "action",
      render: (text: any, record: any) => (
        <span className="table__action">
          <Dropdown
            placement="bottomRight"
            overlay={
              <Menu>
                <Menu.Item key="0" className="drop--delete">
                  {record.status !== "Đã hoàn thành" &&
                    record.status !== "Đã hủy" && (
                      <div>
                        <CloseOutlined
                          className="action__cart action__cart__close"
                          onClick={() => showModalLogout(record.key)}
                        />
                        <span>Hủy đơn</span>
                      </div>
                    )}
                </Menu.Item>
                <Menu.Item key="1" className="drop--buy-again">
                  <Link
                    to={ROUTE_PATHS.ProductDetail.replace(
                      ":id",
                      record.idProduct
                    )}
                  >
                    <ShoppingCartOutlined className="action__cart" />
                    Mua lại
                  </Link>
                </Menu.Item>
                <Menu.Item key="2" className="drop--buy-again" onClick={showModalDetail}>
                  <ShoppingCartOutlined className="action__cart" />
                  Chi tiết
                </Menu.Item>
              </Menu>
            }
            className="table__action__dropdown"
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <EllipsisOutlined />
            </a>
          </Dropdown>
        </span>
      ),
    },
  ];
 
  return (
    <div className="history-cart">
      <h2 className="history-cart-title">Order History</h2>
      {historyList.length === 0 ? (
        <Empty description="Không có lịch sử đơn hàng" />
      ) : (
        <Table
          dataSource={orderHistory}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
      )}

      <Modal
        okType={"danger"}
        className="modal__product"
        centered
        open={isModalLogout}
        onOk={handleOkLog}
        onCancel={handleCancelLog}
      >
        <div className="modal__product__content">
          <h2 className="modal__product__content--title">Hủy đơn</h2>
          <p className="modal__product__content--desc">
            Bạn có chắc chắn muốn hủy đơn hàng này không?
          </p>
        </div>
      </Modal>

    
<Modal centered open={isModalDetail} onOk={handleOkDetail} onCancel={handleCancelDetail} className="order-detail-modal">
  <div className="order-details-container">
    {/* Customer Information Section */}
    {/* <div className="section customer-section">
      <h2>Thông tin người đặt hàng</h2>
      <p>
        <strong>Tên người đặt hàng:</strong> {dummyData.customerName}
      </p>
      <p>
        <strong>Email:</strong> {dummyData.customerEmail}
      </p>
      <p>
        <strong>Địa chỉ:</strong> {dummyData.customerAddress}
      </p>
    </div> */}

    {/* Order Details Section */}
    <div className="section order-section">
      <h2>Chi tiết đơn hàng</h2>
      {orderHistory.map((order, index) => (
        <div key={index} className="product-details">
          <p>
            <strong>Sản phẩm:</strong> {order.products}
          </p>
          <p>
            <strong>Số lượng:</strong> {order.total}
          </p>
          <p>
            <strong>Đơn giá:</strong> {order.status}
          </p>
        </div>
      ))}
      <p>
        <strong>Thanh toán:</strong> 
      </p>
      <p>
        <strong>Tình trạng đơn hàng:</strong> 
      </p>
    </div>

    {/* Total Section */}
    <div className="section total-section">
      <h2>Tổng thanh toán</h2>
      <p>
        <strong>Thành tiền:</strong> 
      </p>
    </div>
  </div>
</Modal>

    </div>
  );
};

export default HistoryCart;
