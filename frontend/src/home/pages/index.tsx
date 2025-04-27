import { Select, Input } from 'antd';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { getProducts } from '../../apis/apiProducts';
import ProductCard from '../components/ProductCard';
import api from '../../apis/api';

const getCategories = async () => {
  const res = await api.get("/api/categories");
  return res.data.data;
};

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<string>('mn');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [categories, setCategories] = useState<any[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  // const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [productRes, categoryRes] = await Promise.all([
        getProducts({}),
        getCategories()
      ]);

      const productList = productRes.data || [];
      setProducts(productList);
      setCategories(categoryRes);
    };

    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(
        (p) => p.category?.name.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    if (searchQuery.trim() !== '') {
      const keyword = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name?.toLowerCase().includes(keyword) ||
          p.price?.toString().includes(keyword)
      );
    }

    if (sortOrder === 'asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'mn') {
      filtered.sort((a, b) => b.createdAt?.localeCompare(a.createdAt));
    } else if (sortOrder === 'cn') {
      filtered.sort((a, b) => a.createdAt?.localeCompare(b.createdAt));
    }

    return filtered;
  }, [products, searchQuery, sortOrder, categoryFilter]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // const handleBlur = () => {
  //   setTimeout(() => {
  //     setIsFocused(false);
  //   }, 1000); // delay 150ms để mượt hơn
  // };

  // const addToWish = (product: any) => {
  //   console.log("Thêm vào yêu thích", product);
  // };

  // const addToCart = (product: any) => {
  //   console.log("Thêm vào giỏ hàng", product);
  // };

  // const viewDetail = (product: any) => {
  //   console.log("Xem chi tiết", product);
  // };

  return (
    <div className='m-2 my-7'>
      <div className="search-bar flex justify-between my-5 flex-col md:flex-row gap-3">
        <Input
          placeholder="Tìm theo tên hoặc giá..."
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          // onBlur={handleBlur}
          style={{
            width: '100%'
            // maxWidth: '100%',
            // width: isFocused ? '100%' : '50%',
            // transition: 'width 0.3s ease'
          }}
        />

        <div
          // className={`filters flex gap-4 overflow-hidden transition-all duration-300 ease-in-out`}
          className='flex gap-1'
        // style={{
        //   maxHeight: searchQuery ? 0 : 100,
        //   opacity: searchQuery ? 0 : 1,
        //   transition: 'all 0.3s ease-in-out',
        // }}
        >
          <Select value={sortOrder} onChange={setSortOrder} style={{ width: 150 }}>
            <Select.Option value="mn">Mới nhất</Select.Option>
            <Select.Option value="cn">Cũ nhất</Select.Option>
            <Select.Option value="asc">Giá tăng dần</Select.Option>
            <Select.Option value="desc">Giá giảm dần</Select.Option>
          </Select>

          <Select value={categoryFilter} onChange={setCategoryFilter} style={{ width: 150 }}>
            <Select.Option value="all">Tất cả</Select.Option>
            {categories.map((category: any) => (
              <Select.Option key={category.id} value={category.name}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px]">
        {filteredProducts.map((product: any) => (
          <ProductCard
            key={product.documentId}
            product={product}
            // onAddToWish={() => addToWish(product)}
            // onAddToCart={() => addToCart(product)}
            // onViewDetail={() => viewDetail(product)}
          />
        ))}
      </div>
    </div>
  );
}
