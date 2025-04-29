import React from 'react'

export default function test() {
  return (
    <div>test</div>
  )
}


// import { InputNumber, Button } from 'antd';
// import { useCart } from '../contexts/CartContext';
// import { useEffect } from 'react';

// const CartPage = () => {
//   const { cart, deleteToCart, updateToCart } = useCart();

//   const handleQuantityChange = async (itemId: string, newQuantity: number) => {
//     console.log('itemId-newQuantity', itemId, newQuantity)
//     updateToCart(itemId, newQuantity)
//   };

//   const handleRemoveProduct = (documentId: string) => {
//     console.log("xoa documentId", documentId)
//     deleteToCart(documentId);
//   };


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