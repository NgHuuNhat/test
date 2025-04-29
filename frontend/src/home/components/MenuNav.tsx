import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { HomeIcon, Search, Heart, ShoppingCart, User, Shield } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function MenuNav() {
    const location = useLocation();
    const currentPath = location.pathname;
    const [user, setUser] = useState<any>(null);
    const [isShaking, setIsShaking] = useState(false);
    const { cart } = useCart();

    const totalQuantity = cart?.totalQuantity ?? 0;

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
        if (totalQuantity > 0) {
            setIsShaking(true);
            const timer = setTimeout(() => setIsShaking(false), 500);
            return () => clearTimeout(timer);
        }
    }, [totalQuantity]);

    const menu = [
        { label: 'Home', path: '/', icon: <HomeIcon size={24} /> },
        { label: 'Search', path: '/search', icon: <Search size={24} /> },
        { label: 'Wishlist', path: '/wishlist', icon: <Heart size={24} /> },
        { label: 'Cart', path: '/cart', icon: <ShoppingCart size={24} /> },
        ...(user?.role === 'admin'
            ? [{ label: 'Dashboard', path: '/admin', icon: <Shield size={24} /> }]
            : []),
        {
            label: 'Profile',
            path: '/profile',
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
${item.label === 'Cart' && isShaking ? 'shake' : ''}
`}
                    >
                        <div className="relative">
                            {item.icon}
                            {/* {item.label === 'Cart' && user && getTotalQuantity() >= 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {getTotalQuantity()}
                                </span>
                            )} */}
                            {item.label === 'Cart' && user && (totalQuantity ?? 0) >= 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {totalQuantity}
                                </span>
                            )}
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
