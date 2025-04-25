import { Eye, Heart, ShoppingCart } from 'lucide-react';
import React from 'react';

export default function ProductCart({
  product,
  onAddToCart,
  onViewDetail,
}: {
  product: any;
  onAddToCart: () => void;
  onViewDetail: () => void;
}) {
  return (
    <div className="w-full aspect-square relative overflow-hidden group">
      {/* Click vào hình để xem chi tiết */}
      <img
        src={product.imageUrl}
        alt={product.name}
        onClick={onViewDetail}
        className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
      />

      {/* Thông tin luôn hiển thị ở góc dưới */}
      <div className="absolute bottom-0 left-0 right-0 px-2 py-2 bg-gradient-to-t from-black/70 to-transparent text-white text-sm flex justify-between items-center">
        <span className="font-semibold text-xl">${product.price}</span>
        <div className="flex gap-1">
          <button className="p-1 bg-white/20 rounded hover:bg-white/40 cursor-pointer transition-transform hover:scale-110">
            <Heart size={24} />
          </button>
          {/* <button className="p-1 bg-white/20 rounded hover:bg-white/40 cursor-pointer transition-transform hover:scale-110">
            <Eye size={16} />
          </button> */}
          <button onClick={onAddToCart} className="p-1 bg-white/20 rounded hover:bg-white/40 cursor-pointer transition-transform hover:scale-110">
            <ShoppingCart size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
