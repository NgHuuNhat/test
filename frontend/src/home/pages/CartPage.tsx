import React, { useEffect, useState } from 'react'

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [orderHistory, setOrderHistory] = useState<any[]>([]);

  // useEffect(() => {
  //   const fetchCart = async () => {
  //     const cartData = await getCart();
  //     setCartItems(cartData);
  //   };
  //   const fetchOrderHistory = async () => {
  //     const historyData = await getOrderHistory();
  //     setOrderHistory(historyData);
  //   };
  //   fetchCart();
  //   fetchOrderHistory();
  // }, []);

  return (
    <div>
      <h1>Giỏ hàng</h1>
      {/* <div>
        <h2>Sản phẩm trong giỏ hàng</h2>
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>{item.name} - {item.quantity}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Lịch sử đặt hàng</h2>
        <ul>
          {orderHistory.map(order => (
            <li key={order.id}>
              {order.date} - Trạng thái: {order.status}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  )
}
