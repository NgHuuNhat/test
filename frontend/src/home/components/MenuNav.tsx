import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { HomeIcon, Search, Heart, ShoppingCart, User, Shield } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function MenuNav() {
    const location = useLocation();
    const currentPath = location.pathname;
    const [user, setUser] = useState<any>();
    const { getTotalQuantity } = useCart();
    const [isShaking, setIsShaking] = useState(false);
    // const isMobile = window.innerWidth < 1024; // iPhone, iPad, máy bảng

    // useEffect(() => {
    //     // const isMobile = window.innerWidth < 1024;
    // }, [isMobile])

    // Cập nhật user từ localStorage khi component mount
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

    useEffect(() => {
        // const newQuantity = getTotalQuantity();
        // if (getTotalQuantity) {
        // //   setTotalQuantity(newQuantity); // Cập nhật số lượng
        //   setIsShaking(true); // Bắt đầu rung

        //   // Dừng rung sau 0.5s (thời gian animation)
        //   setTimeout(() => {
        //     setIsShaking(false);
        //   }, 500);
        // }
        //
        setIsShaking(true); // Bắt đầu rung

        // Dừng rung sau 0.5s (thời gian animation)
        setTimeout(() => {
            setIsShaking(false);
        }, 500);
    }, [getTotalQuantity]); // Kiểm tra thay đổi của getTotalQuantity

    // Menu chính
    const baseMenu = [
        { label: 'Home', path: '/', icon: <HomeIcon size={24} /> },
        { label: 'Search', path: '/search', icon: <Search size={24} /> },
        { label: 'Wishlist', path: '/wishlist', icon: <Heart size={24} /> },
        { label: 'Cart', path: '/cart', icon: <ShoppingCart size={24} /> },
    ];

    // Nếu là admin thì thêm mục Admin
    const menu = user?.role === 'admin'
        ? [...baseMenu, { label: 'Dashboard', path: '/admin', icon: <Shield size={24} /> }]
        : baseMenu;

    return (
        <nav className='lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-between lg:px-4 lg:py-6 lg:w-60 lg:border-r lg:border-t-0  fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-100'>

            <div className="flex gap-6 justify-around py-2 lg:flex-col lg:py-0">
                <Link to='/' className="hidden lg:block text-2xl font-semibold px-2 my-2 mb-4">Shopping</Link>
                {menu.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-4 px-3 py-2 rounded-lg transition-colors duration-200 cursor-pointer
                        ${currentPath === item.path ? 'bg-gray-100 text-black font-medium' : 'text-gray-700 hover:bg-gray-100'}
                        ${item.label === 'Cart' && isShaking ? 'shake' : ''}
                        `}
                    >
                        <div className='relative'>
                            {item.icon}
                            {item.label === 'Cart' && user && getTotalQuantity() >= 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {getTotalQuantity()}
                                </span>
                            )}
                        </div>
                        <span className='hidden lg:block'>{item.label}</span>
                    </Link>
                ))}

                <Link
                    to="/profile"
                    className={`flex items-center gap-4 px-3 py-2 rounded-lg transition-colors duration-200 cursor-pointer
                ${currentPath === '/profile' ? 'bg-gray-100 text-black font-medium' : 'text-gray-700 hover:bg-gray-100'}`
                    }
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
                    <span className='hidden lg:block'>{user?.name || 'Profile'}</span>
                </Link>
            </div>
        </nav>
    );
}