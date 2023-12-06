// HistoryCart.jsx

import React, { useEffect } from 'react';
import { Button, Empty, Space, Table } from 'antd';
import 'antd/dist/antd.css';  // Import Ant Design styles
import './HistoryCart.scss';  // Import your custom CSS styles
import { dispatch, useSelector } from '../../../redux/store';
import { getHistory } from '../../../redux/slices/history';
import moment from 'moment';
import { ShoppingCartOutlined,CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '../../../constants/url-config';
const HistoryCart = () => {
    const {historyList} = useSelector(state => state.history)
    useEffect(() => {
        dispatch(getHistory({ pageIndex: 1, pageSize: 100 }));
      }, []);
      console.log('====================================');
      console.log("historyList",historyList);
      console.log('====================================');
      const orderHistory = historyList.map(item => {
        const formattedTotal = new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(item.totalPrice);
      
        return {
          key: item.id,
          date: moment(item.createDate).format('DD/MM/YYYY HH:mm:ss'),
          total: formattedTotal,
          status:item.orderStatus
        };
      });
    const columns = [
        {
            title: 'Sản phẩm',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'date',
            key: 'date',
           
        },
        {
            title: 'Giá tiền',
            dataIndex: 'total',
            key: 'total',
         
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
          
        },
        {
            dataIndex: 'action',
            key: 'action',
            render: (text:any, record:any) => (
                <Space className='space__action'>
                    <Link to={ROUTE_PATHS.ProductDetail.replace(":id", record.key)}>
                    <ShoppingCartOutlined className='action__cart'/> 
                    </Link>
                    {record.status !== 'Đã hoàn thành' && (
          <CloseOutlined className='action__cart action__cart__close' />
        )}
                </Space>
              ),
        },
    ];

    return (
        <div className="history-cart">
            <h2 className="history-cart-title">Order History</h2>
            {historyList.length === 0 ? (
        <Empty description="Không có lịch sử đơn hàng" />
      ) : (
        <Table dataSource={orderHistory} columns={columns} pagination={{ pageSize: 5 }} />
      )}
        </div>
    );
};

export default HistoryCart;
