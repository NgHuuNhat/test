import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CreditCard, FileTextIcon, HomeIcon, Shield, ShoppingBag, User } from 'lucide-react';

export default function Sidebar() {
    const location = useLocation();
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

    const menu = [
        { label: 'Admin', path: '/admin', icon: <HomeIcon size={24} /> },
        { label: 'Quản lý sản phẩm', path: '/admin/products', icon: <ShoppingBag size={24} /> },
        { label: 'Quản lý đơn hàng', path: '/admin/orders', icon: <FileTextIcon size={24} /> },
        { label: 'Quản lý thanh toán', path: '/admin/payments', icon: <CreditCard size={24} /> },
        { label: 'Quản lý tài khoản', path: '/admin/users', icon: <User size={24} /> },
        ...(user?.role === 'admin'
            ? [{ label: 'Shopping', path: '/', icon: <Shield size={24} /> }]
            : []),
        {
            label: 'Profile',
            path: '/admin/profile',
            icon: user?.image ? (
                <img
                    src={user.image}
                    alt="Avatar"
                    className="w-6 h-6 rounded-full object-cover"
                />
            ) : (
                <User size={24} />
            ),
        },
    ];

    return (
        <nav className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-between lg:px-4 lg:py-6 lg:w-60 lg:border-r lg:border-t-0
            fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
            <div className="flex gap-1 lg:gap-6 justify-around py-2 lg:flex-col lg:py-0 whitespace-nowrap">
                <Link to="/" className="hidden lg:block text-2xl font-semibold px-2 my-2 mb-4">
                    Shopping
                </Link>

                {menu.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 cursor-pointer
        ${currentPath === item.path ? 'bg-gray-100 text-black font-medium' : 'text-gray-700 hover:bg-gray-100'}
        `}
                    >
                        <div className="relative">
                            {item.icon}
                        </div>
                        <span className="hidden lg:block">
                            {item.label === 'Profile' ? (user?.name || 'Profile') : item.label}
                        </span>
                    </Link>
                ))}
            </div>
        </nav>
    );
}
