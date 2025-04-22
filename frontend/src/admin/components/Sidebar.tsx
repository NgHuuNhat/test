import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, message, Modal } from 'antd';
import { HomeOutlined, ShoppingOutlined, FileTextOutlined, CreditCardOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';

export default function Sidebar() {
    const location = useLocation()
    const navigate = useNavigate();

    const handleLogout = () => {
        Modal.confirm({
            title: 'Xác nhận đăng xuất',
            content: 'Bạn có chắc chắn muốn đăng xuất?',
            onOk() {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                message.success("Đăng xuất thành công!");
                navigate("/");
            },
            onCancel() {
            }
        });
    };

    const menuItems = [
        { key: '/admin', icon: <HomeOutlined style={{ fontWeight: 'bold' }} />, label: <Link to="/admin" style={{ fontWeight: 'bold' }}><h3>Admin</h3></Link> },
        { key: '/admin/products', icon: <ShoppingOutlined />, label: <Link to="/admin/products">Quản lý sản phẩm</Link> },
        { key: '/admin/orders', icon: <FileTextOutlined />, label: <Link to="/admin/orders">Quản lý đơn hàng</Link> },
        { key: '/admin/payments', icon: <CreditCardOutlined />, label: <Link to="/admin/payments">Quản lý thanh toán</Link> },
        { key: '/admin/users', icon: <UserOutlined />, label: <Link to="/admin/users">Quản lý tài khoản</Link> },
        { key: '/', icon: <LogoutOutlined style={{ color: 'red' }} />, label: <a onClick={handleLogout} style={{ color: 'red' }}>Đăng xuất</a> },
    ];

    return (
        <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            style={{ width: 256, height: '100vh', borderRight: '1px solid #ddd' }}
            items={menuItems.map(item => ({
                ...item,
                key: item.key,
            }))}
        />
    );
}
