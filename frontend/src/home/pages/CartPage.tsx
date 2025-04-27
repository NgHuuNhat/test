import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { Button } from "antd";

const CartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart, getTotalQuantity, getTotalPrice, clearCart } = useCart();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <Button
          type="primary"
          size="large"
          onClick={() => {
            navigate(`/login?redirect=${location.pathname}`);
          }}
        >
          Đăng nhập
        </Button>
      </div>
    );
  }

  const handleImageClick = (item: any) => {
    // Log item details when image is clicked
    console.log("Item Details:", item);
  };

  return (
    <div className="flex h-screen">
      {/* Left Side: Product List */}
      <div className="w-2/3 p-7 bg-white text-black flex flex-col overflow-y-auto rounded-lg">
        <div className="flex justify-center items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Giỏ hàng của {user?.name}</h1>
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
            <span>{user?.cart.id}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Tên giỏ hàng:</span>
            <span>Giỏ hàng của {user?.name}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Mã khách hàng:</span>
            <span>{user?.id}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Tên khách hàng:</span>
            <span>{user?.name}</span>
          </div>

          {/* Contact Information */}
          <div className="flex justify-between text-sm text-gray-500">
            <span>Số điện thoại:</span>
            <span>{user?.phone}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Email:</span>
            <span>{user?.email}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Địa chỉ nhận hàng:</span>
            <span>{user?.shippingAddress}</span>
          </div>

          {/* Total Quantity and Price */}
          <div className="flex justify-between text-sm text-gray-500">
            <span>Số lượng:</span>
            <span>{getTotalQuantity()}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Thành tiền:</span>
            <span>${getTotalPrice().toLocaleString()}</span>
          </div>
        </div>

        {/* Payment Button */}
        <Button
          type="primary"
          size="large"
          className="mt-auto w-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200"
          onClick={clearCart}
        >
          Thanh toán
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
