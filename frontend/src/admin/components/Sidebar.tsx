import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    HomeOutlined,
    ShoppingOutlined,
    FileTextOutlined,
    CreditCardOutlined,
    UserOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Shield, User } from 'lucide-react';
import { Modal, message } from 'antd';

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;
    const [user, setUser] = useState<any>();

     useEffect(() => {
            const updateUser = () => {
                const userData = localStorage.getItem('user');
                const parsedUser = userData ? JSON.parse(userData) : null;
                setUser(parsedUser);
            };
    
            updateUser();
    
            window.addEventListener('userUpdated', updateUser);
            window.addEventListener('userLogout', () => setUser(null));
    
            return () => {
                window.removeEventListener('userUpdated', updateUser);
                window.removeEventListener('userLogout', () => setUser(null));
            };
        }, []);

    // const handleLogout = () => {
    //     Modal.confirm({
    //         title: 'Xác nhận đăng xuất',
    //         content: 'Bạn có chắc chắn muốn đăng xuất?',
    //         onOk() {
    //             localStorage.removeItem('token');
    //             localStorage.removeItem('user');
    //             message.success('Đăng xuất thành công!');
    //             navigate('/');
    //         },
    //     });
    // };

    const menuItems = [
        { key: '/admin', label: 'Admin', icon: <HomeOutlined /> },
        { key: '/admin/products', label: 'Quản lý sản phẩm', icon: <ShoppingOutlined /> },
        { key: '/admin/orders', label: 'Quản lý đơn hàng', icon: <FileTextOutlined /> },
        { key: '/admin/payments', label: 'Quản lý thanh toán', icon: <CreditCardOutlined /> },
        { key: '/admin/users', label: 'Quản lý tài khoản', icon: <UserOutlined /> },
        { key: '/', label: 'Shopping', icon: <Shield size={16} /> },
    ];

    return (
        <nav className="sticky top-0 h-screen w-60 flex flex-col justify-between px-4 py-6 border-r border-gray-200 font-sans text-sm bg-white">
            {/* Menu */}
            <div className="flex flex-col gap-2">
                {/* Logo */}
                <div className="mb-6 px-2 text-2xl font-semibold">
                    <Link to="/admin">Dashboard</Link>
                </div>
                {menuItems.map((item) => (
                    <Link
                        key={item.key}
                        to={item.key}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200
                        ${location.pathname === item.key
                                ? 'bg-gray-100 text-black font-medium'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </Link>
                ))}
            </div>

            {/* Phần dưới cùng - Profile */}
            <div>
                <Link
                    to="/admin/profile"
                    className={`flex items-center gap-4 px-3 py-2 rounded-lg transition-colors duration-200
                                ${currentPath === '/profile' ? 'bg-gray-100 text-black font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                    {user?.image ? (
                        <img
                            src={user.image}
                            alt="Avatar"
                            className="w-6 h-6 rounded-full object-cover"
                        />
                    ) : (
                        <User size={24} />
                    )}
                    <span>{user?.name || 'Profile'}</span>
                </Link>
            </div>

            {/* Đăng xuất */}
            {/* <div className="mt-6">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors duration-200"
                >
                    <LogoutOutlined />
                    <span>Đăng xuất</span>
                </button>
            </div> */}

        </nav>
    );
}
