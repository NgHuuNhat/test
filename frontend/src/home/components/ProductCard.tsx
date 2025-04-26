import { Heart, ShoppingCart } from 'lucide-react';
import React from 'react'

export default function ProductCard({
  product,
  onAddToWish,
  onAddToCart,
  onViewDetail,
}: {
  product: any;
  onAddToWish: () => void;
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

      {/* <div className='absolute top-0 right-0 px-2 py-2 bg-gradient-to-t to-transparent text-white text-sm flex justify-between items-center'>
        <button onClick={onAddToWish} className="p-2 rounded-full cursor-pointer transition-transform hover:scale-110">
          <Heart size={24} />
        </button>
      </div> */}

      {/* Thông tin luôn hiển thị ở góc dưới */}
      <div className="absolute bottom-0 left-0 right-0 px-2 py-2 bg-gradient-to-t from-black/70 to-transparent text-white text-sm flex justify-between items-center">

        <span className="font-semibold text-l">${product.price}</span>
        <span className="font-semibold text-l ms-10">{product.name}</span>

        <div className="flex gap-1">
          <button onClick={onAddToWish} className="p-2 text-white/100 rounded-full hover:text-white/50 cursor-pointer transition-transform hover:scale-105">
            <Heart size={26} />
          </button>
          <button onClick={onAddToCart} className="p-2 text-white/100 rounded-full hover:text-white/50 cursor-pointer transition-transform hover:scale-105">
            <ShoppingCart size={26} />
          </button>
        </div>

      </div>
    </div>
  )
}
