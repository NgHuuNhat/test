// import { Select, Input } from 'antd';
// import React, { useEffect, useState, useCallback } from 'react';
// import { getProducts } from '../../apis/apiProducts';
// import ProductCard from '../components/ProductCard';

// export default function Home() {
//   const [products, setProducts] = useState<any[]>([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [debouncedSearch, setDebouncedSearch] = useState('');
//   const [sortOrder, setSortOrder] = useState<string>('asc');
//   const [categoryFilter, setCategoryFilter] = useState<string>('all');
//   const categories = ['all', 'electronics', 'fashion', 'home', 'beauty'];

//   // Debounce search
//   // const debounceSearch = useCallback(
//   //   debounce((value: string) => {
//   //     setDebouncedSearch(value);
//   //   }, 500),
//   //   []
//   // );

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//     // debounceSearch(e.target.value);
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const filters = {
//         sort: sortOrder,
//         category: categoryFilter !== 'all' ? categoryFilter : undefined,
//         search: debouncedSearch,
//       };
//       const productData = await getProducts(filters);
//       setProducts(productData.data);
//     };
//     fetchProducts();
//   }, [sortOrder, categoryFilter, debouncedSearch]);

//   const handleSortChange = (value: string) => {
//     setSortOrder(value);
//   };

//   const handleCategoryChange = (value: string) => {
//     setCategoryFilter(value);
//   };

//   const addToWish = (product: any) => {
//     console.log("them vao yeu thich", product);
//   };

//   const addToCart = (product: any) => {
//     console.log("them vao gio hang", product);
//   };

//   const viewDetail = (product: any) => {
//     console.log("xem chi tiet", product);
//   };

//   return (
//     <div className='m-2 my-7'>
//       <div className="search-bar flex justify-between my-5">
//         <Input
//           placeholder="Tìm sản phẩm"
//           value={searchQuery}
//           onChange={handleSearchChange}
//           style={{ width: '60%' }}
//         />
//         <div className="filters flex gap-4">
//           <Select defaultValue="mn" onChange={handleSortChange} style={{ width: 150 }}>
//             <Select.Option value="mn">Mới nhất</Select.Option>
//             <Select.Option value="cn">Cũ nhất</Select.Option>
//             <Select.Option value="asc">Giá tăng dần</Select.Option>
//             <Select.Option value="desc">Giá giảm dần</Select.Option>
//           </Select>

//           <Select defaultValue="all" onChange={handleCategoryChange} style={{ width: 150 }}>
//             {categories.map((category) => (
//               <Select.Option key={category} value={category}>
//                 {category.charAt(0).toUpperCase() + category.slice(1)}
//               </Select.Option>
//             ))}
//           </Select>
//         </div>
//       </div>

//       <div className="grid grid-cols-3 gap-[2px]">
//         {products.map((product: any) => (
//           <ProductCard
//             key={product.documentId}
//             product={product}
//             onAddToWish={() => addToWish(product)}
//             onAddToCart={() => addToCart(product)}
//             onViewDetail={() => viewDetail(product)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }



import React from 'react'

export default function test() {
    return (
        <div>test</div>
    )
}

