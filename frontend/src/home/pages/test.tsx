// import React, { useEffect, useState } from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import { HomeIcon, Search, Heart, ShoppingCart, User, Shield } from 'lucide-react';
// import { useCart } from '../contexts/CartContext';

// export default function MenuNav() {
//     const location = useLocation();
//     const currentPath = location.pathname;
//     const [user, setUser] = useState<any>();
//     const { getTotalQuantity } = useCart();
//     const [isShaking, setIsShaking] = useState(false);

//     // Cập nhật user từ localStorage khi component mount
//     useEffect(() => {
//         const updateUser = () => {
//             const userData = localStorage.getItem('user');
//             const parsedUser = userData ? JSON.parse(userData) : null;
//             setUser(parsedUser);
//         };

//         updateUser();

//         window.addEventListener('userUpdated', updateUser);
//         window.addEventListener('userLogout', () => setUser(null));

//         return () => {
//             window.removeEventListener('userUpdated', updateUser);
//             window.removeEventListener('userLogout', () => setUser(null));
//         };
//     }, []);

//     useEffect(() => {
//         // const newQuantity = getTotalQuantity();
//         // if (getTotalQuantity) {
//         // //   setTotalQuantity(newQuantity); // Cập nhật số lượng
//         //   setIsShaking(true); // Bắt đầu rung

//         //   // Dừng rung sau 0.5s (thời gian animation)
//         //   setTimeout(() => {
//         //     setIsShaking(false);
//         //   }, 500);
//         // }
//         //
//         setIsShaking(true); // Bắt đầu rung

//         // Dừng rung sau 0.5s (thời gian animation)
//         setTimeout(() => {
//             setIsShaking(false);
//         }, 500);
//     }, [getTotalQuantity]); // Kiểm tra thay đổi của getTotalQuantity

//     // Menu chính
//     const baseMenu = [
//         { label: 'Home', path: '/', icon: <HomeIcon size={24} /> },
//         { label: 'Search', path: '/search', icon: <Search size={24} /> },
//         { label: 'Wishlist', path: '/wishlist', icon: <Heart size={24} /> },
//         { label: 'Cart', path: '/cart', icon: <ShoppingCart size={24} /> },
//     ];

//     // Nếu là admin thì thêm mục Admin
//     const menu = user?.role === 'admin'
//         ? [...baseMenu, { label: 'Dashboard', path: '/admin', icon: <Shield size={24} /> }]
//         : baseMenu;

//     return (
//         <nav className="sticky top-0 h-screen w-60 flex flex-col justify-between px-4 py-6 border-r border-gray-200 font-sans text-sm bg-white">
//             {/* Phần trên */}
//             <div className="flex flex-col gap-6">
//                 <Link to='/' className="text-2xl font-semibold px-2 mb-6">Shopping</Link>
//                 {menu.map((item) => (
//                     <Link
//                         key={item.path}
//                         to={item.path}
//                         className={`flex items-center gap-4 px-3 py-2 rounded-lg transition-colors duration-200 cursor-pointer
//                         ${currentPath === item.path ? 'bg-gray-100 text-black font-medium' : 'text-gray-700 hover:bg-gray-100'}
//                         ${item.label === 'Cart' && isShaking ? 'shake' : ''}
//                         `}
//                     >
//                         <div className='relative'>
//                             {item.icon}
//                             {/* Nếu là Cart thì hiện badge */}
//                             {item.label === 'Cart' && user && getTotalQuantity() >= 0 && (
//                                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                                     {getTotalQuantity()}
//                                 </span>
//                             )}
//                         </div>
//                         <span>{item.label}</span>
//                     </Link>
//                 ))}
//             </div>

//             {/* Phần dưới cùng - Profile */}
//             <div>
//                 <Link
//                     to="/profile"
//                     className={`flex items-center gap-4 px-3 py-2 rounded-lg transition-colors duration-200
//                     ${currentPath === '/profile' ? 'bg-gray-100 text-black font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
//                 >
//                     {user?.image ? (
//                         <img
//                             src={user.image}
//                             alt="Avatar"
//                             className="w-6 h-6 rounded-full object-cover"
//                         />
//                     ) : (
//                         <User size={24} />
//                     )}
//                     <span>{user?.name || 'Profile'}</span>
//                 </Link>
//             </div>
//         </nav>
//     );
// }





import React from 'react'

export default function test() {
    return (
        <div>test</div>
    )
}