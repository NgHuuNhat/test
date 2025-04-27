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

      <div className="absolute bottom-0 left-0 right-0 px-2 py-2 bg-gradient-to-t from-black/70 to-transparent text-white text-sm flex justify-between items-center">
        <span className="font-semibold text-l">${product.price}</span>
        <span className="font-semibold text-l ms-10">{product.name}</span>

        <div className="flex gap-1">
          <button onClick={handleAddToWish} className="p-2 text-white/100 rounded-full hover:text-white/50 cursor-pointer transition-transform hover:scale-105">
            <Heart size={26} />
          </button>
          <button onClick={handleAddToCart} className="p-2 text-white/100 rounded-full hover:text-white/50 cursor-pointer transition-transform hover:scale-105">
            <ShoppingCart size={26} />
          </button>
        </div>
      </div>
    </div>
  );
}
