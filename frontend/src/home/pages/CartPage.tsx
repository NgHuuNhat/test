import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { Button, message } from "antd";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { API_URL } from "../../apis/api";

const CartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const { cart, deleteToCart, updateToCart, fetchCart } = useCart();

  const totalQuantity = cart?.totalQuantity ?? 0;
  const totalPrice = cart?.totalPrice ?? 0;

  console.log("cart", cart)
  const cartItems = cart?.cartItems

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    setUser(storedUser);
    const updateUser = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user") || "null");
      setUser(updatedUser);
    };

    if (user) {
      fetchCart();
    }

    window.addEventListener("userUpdated", updateUser);
    return () => window.removeEventListener("userUpdated", updateUser);
  }, []);

  if (!user) {
    return (
      <div className="my-2 flex justify-center items-center h-[calc(100vh-64px)]">
        <Button type="primary" onClick={() => navigate(`/login?redirect=${location.pathname}`)}>Đăng nhập</Button>
      </div>
    );
  }

  const handleRemoveProduct = (documentId: string) => {
    console.log("xoa documentId", documentId)
    deleteToCart(documentId);
  };

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    console.log('itemId-newQuantity', itemId, newQuantity)
    updateToCart(itemId, newQuantity)
  };



  // const handlePayment = () => {
  //   if (!user?.address || !user?.phone || !user?.email || !user?.name) {
  //     message.error('Vui lòng nhập đầy đủ thông tin!');
  //     return;
  //   }

  //   clearCart();
  //   message.success('Thanh toán thành công!');
  // };

  const renderCartItems = () => {
    return cartItems?.map((item: any) => (
      <div key={item.documentId} className="flex hover:bg-gray-50 rounded-lg transition-all duration-200">
        <div className="flex items-center gap-6">
          <img
            // src="http://localhost:1337/uploads/3cb6a01a3d869126997a59aec3c7720e72b03f778da1ad633797e986f09cab9d_409e9fb1df.jpg"
            src={`${API_URL}${item?.productId?.image?.[0]?.url}`}
            alt={item.name} className="w-24 h-24 md:w-36 md:h-36 object-cover rounded-full cursor-pointer" />
        </div>

        <div className="ms-2 lg:ms-0 flex flex-1 md:flex-col justify-between md:flex-row items-center">
          <div className="flex flex-col sm:w-2/3 md:text-left md:ms-3">
            <h2 className="font-semibold text-lg text-gray-800">{item.name}</h2>
            <p className="text-gray-600 text-xs sm:text-sm">${(item.price).toLocaleString()} x{item.quantity} = ${(item.price * item.quantity).toLocaleString()}</p>
          </div>

          <div className="md:flex">
            <Button type="text" size="small"
              onClick={() => handleQuantityChange(item.documentId, item.quantity - 1)}
              className="hover:bg-gray-200 rounded-full">-</Button>

            <span className="font-semibold mx-3">{item.quantity}</span>

            <Button type="text" size="small"
              onClick={() => handleQuantityChange(item.documentId, item.quantity + 1)}
              className="hover:bg-gray-200 rounded-full">+</Button>

            <Button type="text" size="small"
              onClick={() => handleRemoveProduct(item.documentId)}
              className="hover:bg-gray-200 rounded-full">xóa</Button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex flex-col lg:flex-row lg:h-screen mb-15 lg:mb-0">
      {/* Left Side: Product List */}
      <div className="lg:w-2/3 md:px-3 lg:p-3 py-5 bg-white text-black flex flex-col overflow-y-auto rounded-lg">
        <div className="flex justify-center items-center mb-6">
          <div className="relative mx-4">
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{totalQuantity}</span>
          </div>
          <h6 className="text-m py-2 font-semibold text-gray-800">{`Giỏ hàng của ${user?.name || 'bạn'}`}</h6>
        </div>

        {cartItems?.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-sm text-gray-500">Giỏ hàng trống</p>
            <button onClick={() => navigate(`/?redirect=${location.pathname}`)} className="mx-2 text-sm text-blue-500 underline hover:text-blue-700 cursor-pointer">Mua hàng</button>
          </div>
        ) : (
          <div className="flex flex-col space-y-6 px-2 md:px-10 lg:px-0">
            {renderCartItems()}
          </div>
        )}
      </div>

      {/* Right Side: Cart Info */}
      <div className="lg:w-1/3 p-4 md:px-15 lg:px-3 bg-white text-black flex flex-col sticky top-0 lg:h-screen rounded-lg">
        <div className="mb-10 flex flex-col space-y-6">
          <div className="text-m font-semibold text-gray-800">Thông tin giỏ hàng</div>

          {/* User Info */}
          {[
            { label: "Mã giỏ hàng", value: user?.cart?.id || 'Chưa có giỏ hàng' },
            { label: "Tên giỏ hàng", value: `Giỏ hàng của ${user?.name || 'bạn'}` },
            { label: "Mã khách hàng", value: user?.id },
            { label: "Tên khách hàng", value: user?.name || 'trống' },
            { label: "Số điện thoại", value: user?.phone || 'trống' },
            { label: "Email", value: user?.email || 'trống' },
            { label: "Địa chỉ nhận hàng", value: user?.address || 'trống' }
          ].map((item, index) => (
            <div key={index} className="flex justify-between text-sm text-gray-500">
              <span>{item.label}:</span>
              <span>{item.value}</span>
            </div>
          ))}

          <span className="flex justify-center text-sm text-gray-500">
            <button onClick={() => navigate(`/profile?redirect=${location.pathname}`)} className="text-blue-500 underline hover:text-blue-700 cursor-pointer">Cập nhật thông tin nhận hàng</button>
          </span>

          {/* Cart Summary */}
          <div className="flex justify-between text-sm text-gray-500">
            <span className="font-bold">Số lượng:</span>
            <span className="font-bold">{totalQuantity}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span className="font-bold">Thành tiền:</span>
            <span className="font-bold">${totalPrice}</span>
          </div>

          <span className="flex justify-center text-sm text-gray-500">
            <button onClick={() => navigate(`/?redirect=${location.pathname}`)} className="text-blue-500 underline hover:text-blue-700 cursor-pointer">Tiếp tục mua hàng</button>
          </span>
        </div>

        {/* Payment Button */}
        <Button type="primary" size="large" className="mt-auto w-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200"
        //  onClick={handlePayment}
        >
          Thanh toán
        </Button>
      </div>
    </div>
  );
};

export default CartPage;





// // import { useCart } from '@/contexts/CartContext';
// import { InputNumber, Button } from 'antd';
// import { useCart } from '../contexts/CartContext';
// import { useEffect } from 'react';

// const CartPage = () => {
//   const { cart, deleteToCart, updateToCart } = useCart();

//   // const handleQuantityChange = (productId: string, newQuantity: number) => {
//   //   const updatedProducts = cart?.cartItems?.map((item: any) =>
//   //     item.productId === productId ? { ...item, quantity: newQuantity } : item
//   //   ) || [];

//   //   updateCart(updatedProducts);
//   // };

//   const handleQuantityChange = async (itemId: string, newQuantity: number) => {
//     console.log('itemId-newQuantity', itemId, newQuantity)
//     updateToCart(itemId, newQuantity)
//     // if (!cart || newQuantity < 1) return;

//     // const item = cart.cartItems.find(i => i.documentId === itemId);
//     // if (!item) return;

//     // const totalPrice = item.price * newQuantity;

//     // try {
//     //   await api.put(`/api/cart-items/${itemId}`, {
//     //     data: {
//     //       quantity: newQuantity,
//     //       totalPrice: totalPrice,
//     //     }
//     //   });

//     //   await fetchCart(); // làm mới giỏ hàng
//     // } catch (error) {
//     //   console.error("Lỗi cập nhật số lượng:", error);
//     // }
//   };

//   const handleRemoveProduct = (documentId: string) => {
//     console.log("xoa documentId", documentId)
//     deleteToCart(documentId);
//     // const updatedProducts = cart?.cartItems?.filter(item => item.productId !== productId) || [];
//     // updateCart(updatedProducts);
//   };

//   // if (!cart) return <div>Loading cart...</div>;

//   console.log("cart", cart)

//   return (
//     <div>
//       <h2>Giỏ hàng của bạn</h2>
//       {cart?.cartItems?.map((item: any) => (
//         <div key={item.documentId} className="flex items-center justify-between mb-4">
//           <p>Product ID: {item.productId.documentId}</p>
//           <p>Product Name: {item.name}</p>
//           <p>Product Price: {item.price}</p>
//           <p>Product Quantity: {item.quantity}</p>
//           <p>Product TotalPrice: {item.totalPrice}</p>
//           {/* <InputNumber
//             min={1}
//             value={item.quantity}
//             onChange={(value) => handleQuantityChange(item.documentId, value || 1)}
//           /> */}
//           <div className="flex items-center gap-2">
//             <button onClick={() => handleQuantityChange(item.documentId, item.quantity - 1)}>-</button>
//             <span>{item.quantity}</span>
//             <button onClick={() => handleQuantityChange(item.documentId, item.quantity + 1)}>+</button>
//           </div>
//           <Button danger onClick={() => handleRemoveProduct(item.documentId)}>
//             Xóa
//           </Button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CartPage;

