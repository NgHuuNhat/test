import { Button, message, Select, Input, Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { getProducts } from '../../apis/apiProducts';
import ProductCart from '../components/ProductCart';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const categories = ['all', 'electronics', 'fashion', 'home', 'beauty']; // Giả sử đây là các danh mục sản phẩm

  useEffect(() => {
    const fetchProducts = async () => {
      const filters = {
        page: currentPage,
        pageSize: 10,
        sort: sortOrder,
        category: categoryFilter !== 'all' ? categoryFilter : undefined,
        search: searchQuery,
      };
      const productData = await getProducts(filters);
      setProducts(productData.data);
      setTotalProducts(productData.total); // Giả sử API trả về tổng số sản phẩm
    };
    fetchProducts();
  }, [currentPage, sortOrder, categoryFilter, searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const addToCart = (product: any) => {
    // Logic thêm sản phẩm vào giỏ hàng
  };

  return (
    <div>
      {/* Tìm kiếm sản phẩm */}
      <div className="search-bar flex justify-between my-5">
        <Input
          placeholder="Tìm sản phẩm"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ width: '60%' }}
        />
        <div className="filters flex gap-4">
          <Select
            defaultValue="asc"
            onChange={handleSortChange}
            style={{ width: 150 }}
          >
            <Select.Option value="asc">Giá: Tăng dần</Select.Option>
            <Select.Option value="desc">Giá: Giảm dần</Select.Option>
          </Select>

          <Select
            defaultValue="all"
            onChange={handleCategoryChange}
            style={{ width: 150 }}
          >
            {categories.map((category) => (
              <Select.Option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-3 gap-[10px]">
        {products.map((product: any) => (
          <ProductCart
            key={product.documentId}
            product={product}
            onAddToCart={() => addToCart(product)}
            onViewDetail={() => console.log("Xem chi tiết:", product)}
          />
        ))}
      </div>


      <div className="flex justify-center my-5">
        <Pagination
          current={currentPage}
          total={totalProducts}
          pageSize={10}
          onChange={handlePageChange}
          showSizeChanger={false}
          style={{
            fontWeight: 'bold',
          }}
        />
      </div>

    </div>
  );
}
