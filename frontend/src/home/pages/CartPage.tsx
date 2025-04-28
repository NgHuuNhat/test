import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { Button, message } from "antd";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

const CartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart, getTotalQuantity, getTotalPrice, clearCart } = useCart();
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true); // loading state to wait for user data
  // const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    // Lấy thông tin user từ localStorage khi lần đầu render
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    setUser(storedUser);
    setLoading(false); // Set loading to false once user data is fetched

    // Cập nhật khi có sự kiện "userUpdated"
    const updateUser = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user") || "null");
      setUser(updatedUser);
    };

    window.addEventListener("userUpdated", updateUser);

    return () => {
      window.removeEventListener("userUpdated", updateUser);
    };
  }, []); // Chạy 1 lần khi component mount

  if (loading) {
    // Show a loading indicator or placeholder until user data is available
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <p className="text-lg text-gray-500">Đang tải thông tin người dùng...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="my-2 flex justify-center items-center h-[calc(100vh-64px)]">
        <Button type="primary" onClick={() => navigate(`/login?redirect=${location.pathname}`)}>Đăng nhập</Button>
      </div>
      // <div className="flex justify-center items-center h-[calc(100vh-64px)]">
      //   <Button
      //     type="primary"
      //     size="large"
      //     onClick={() => {
      //       navigate(`/login?redirect=${location.pathname}`);
      //     }}
      //   >
      //     Đăng nhập
      //   </Button>
      // </div>
    );
  }

  const handleImageClick = (item: any) => {
    // Log item details when image is clicked
    console.log("Item Details:", item);
  };

  const handlePayment = () => {
    // Kiểm tra thiếu trường nào và hiển thị thông báo cụ thể
    if (!user?.address) {
      message.error('Vui lòng nhập địa chỉ nhận hàng!');
      return;
    }

    if (!user?.phone) {
      message.error('Vui lòng nhập số điện thoại!');
      return;
    }

    if (!user?.email) {
      message.error('Vui lòng nhập email!');
      return;
    }

    if (!user?.name) {
      message.error('Vui lòng nhập tên khách hàng!');
      return;
    }

    // Tiến hành thanh toán hoặc các hành động tiếp theo nếu tất cả các thông tin đã đầy đủ
    clearCart();
    message.success('Thanh toán thành công!');
  };


  return (
    <div className="flex h-screen">
      {/* Left Side: Product List */}
      <div className="w-2/3 p-7 bg-white text-black flex flex-col overflow-y-auto rounded-lg">
        <div className="flex justify-center items-center mb-6">
          <div className="relative mx-4">
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {getTotalQuantity()}
            </span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">{user?.name ? (`Giỏ hàng của ${user?.name}`) : ('Giỏ hàng của bạn')}</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-lg text-gray-500">Giỏ hàng trống</p>
          </div>
        ) : (
          <div className="flex flex-col space-y-6">
            {cartItems.map((item: any) => (
              <div
                key={item.documentId}
                className="flex items-center justify-between p-6 hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                <div className="flex items-center gap-6">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-36 h-36 object-cover rounded-full cursor-pointer"
                    onClick={() => handleImageClick(item)} // Add onClick event to image only
                  />
                  <div className="flex flex-col text-sm">
                    <h2 className="font-semibold text-lg text-gray-800">{item.name}</h2>
                    <p className="text-gray-600 text-xs">${(item.price).toLocaleString()} x{item.quantity} = ${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-xs">
                  <Button
                    type="text"
                    size="small"
                    onClick={() => decreaseQuantity(item.documentId)}
                    className="hover:bg-gray-200 rounded-full"
                  >
                    -
                  </Button>
                  <span className="font-semibold">{item.quantity}</span>
                  <Button
                    type="text"
                    size="small"
                    onClick={() => increaseQuantity(item.documentId)}
                    className="hover:bg-gray-200 rounded-full"
                  >
                    +
                  </Button>
                  <Button
                    type="text"
                    size="small"
                    onClick={() => removeFromCart(item.documentId)}
                    className="text-red-500 hover:bg-red-100 rounded-full"
                  >
                    xóa
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Side: Cart Info */}
      <div className="w-1/3 p-8 bg-white text-black flex flex-col sticky top-0 h-screen rounded-lg">
        <div className="flex flex-col space-y-6">
          {/* Cart Information */}
          <div className="text-xl font-semibold text-gray-800">Thông tin giỏ hàng</div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Mã giỏ hàng:</span>
            <span>{user?.cart?.id || 'Chưa có giỏ hàng'}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Tên giỏ hàng:</span>
            <span>{user?.name ? (`Giỏ hàng của ${user?.name}`) : ('Giỏ hàng của bạn')}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Mã khách hàng:</span>
            <span>{user?.id}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Tên khách hàng:</span>
            <span>{user?.name || 'trống'} </span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Số điện thoại:</span>
            <span>{user?.phone || 'trống'}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Email:</span>
            <span>{user?.email || 'trống'}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Địa chỉ nhận hàng:</span>
            {user?.address ? (
              <div>
                <span className="block text-end">{user.address}</span>
                {/* <span>
                  <button
                    onClick={() => navigate(`/profile?redirect=${location.pathname}`)}
                    className="text-blue-500 underline hover:text-blue-700 cursor-pointer"
                  >
                    Cập nhật địa chỉ nhận hàng
                  </button>
                </span> */}
              </div>
            ) : (
              <span>
                trống
                {/* <button
                  onClick={() => navigate(`/profile?redirect=${location.pathname}`)}
                  className="text-blue-500 underline hover:text-blue-700 cursor-pointer"
                >
                  Vui lòng nhập địa chỉ
                </button> */}
              </span>
            )}
          </div>

          <span className="flex justify-center text-sm text-gray-500">
            <button
              onClick={() => navigate(`/profile?redirect=${location.pathname}`)}
              className="text-blue-500 underline hover:text-blue-700 cursor-pointer"
            >
              Cập nhật thông tin nhận hàng
            </button>
          </span>

          {/* Total Quantity and Price */}
          <div className="flex justify-between text-sm text-gray-500">
            <span className="font-bold">Số lượng:</span>
            <span className="font-bold">{getTotalQuantity()}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span className="font-bold">Thành tiền:</span>
            <span className="font-bold">${getTotalPrice().toLocaleString()}</span>
          </div>
        </div>

        {/* Payment Button */}
        <Button
          type="primary"
          size="large"
          className="mt-auto w-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200"
          // onClick={clearCart}
          onClick={handlePayment}
        >
          Thanh toán
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
