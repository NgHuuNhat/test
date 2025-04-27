import { Heart, ShoppingCart } from 'lucide-react';
import React from 'react';
import { useCart } from '../contexts/CartContext';
import axios from 'axios';
import { API_URL } from '../../apis/api';

export default function ProductCard({
  product,
}: {
  product: any;
}) {

  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    console.log("add to cart", product);
    addToCart(product);
  };

  const handleViewDetail = () => {
    console.log("view detail", product);
  };

  const handleAddToWish = () => {
    console.log("add wish", product);
  };

  return (
    <div className="w-full aspect-square relative overflow-hidden group">
      <img
        src={product.imageUrl}
        alt={product.name}
        onClick={handleViewDetail}
        className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
      />

      <div className='absolute top-0 right-0 text-white text-sm flex justify-between items-center'>
        <button onClick={handleAddToWish} className="p-4 text-white/100 rounded-full hover:text-white/50 cursor-pointer transition-transform hover:scale-105">
          <Heart size={26} />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-sm items-center">
        <div className="w-full flex justify-between items-center pb-4 px-4">
          <span className="font-semibold text-l">{product.name}</span>
          <button onClick={handleAddToCart} className="w-full max-w-[40%] flex justify-center items-center bg-white/10 py-2 rounded-full text-white transition-transform duration-200 hover:scale-105 hover:text-white/50 cursor-pointer">
            <ShoppingCart className='w-full' size={26} />
          </button>
          <span className="font-semibold text-l">${product.price}</span>
        </div>

      </div>
    </div>
  );
}
