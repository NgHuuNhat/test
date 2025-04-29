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

  console.log("products", products)

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

  return (
    <div className='mb-15 lg:m-1'>
      <div className="mx-2 lg:mx-0 search-bar flex justify-between my-5 flex-col lg:flex-row gap-1">
        <Input
          className='w-full'
          placeholder="Tìm theo tên hoặc giá..."
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}

        />

        <div
          className='w-full flex gap-1'
        >
          <Select value={sortOrder} onChange={setSortOrder} style={{ width: '50%' }}>
            <Select.Option value="mn">Mới nhất</Select.Option>
            <Select.Option value="cn">Cũ nhất</Select.Option>
            <Select.Option value="asc">Giá tăng dần</Select.Option>
            <Select.Option value="desc">Giá giảm dần</Select.Option>
          </Select>

          <Select value={categoryFilter} onChange={setCategoryFilter} style={{ width: "50%" }}>
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
          />
        ))}
      </div>
    </div>
  );
}
