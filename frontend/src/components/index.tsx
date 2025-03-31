import React, { useEffect, useState } from 'react'
import { getPosts } from '../api/api';
import { Product } from '../types/type';

export default function Test() {
    const [products, setPosts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getPosts();
            setPosts(data);
            // console.log(data)
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1>Danh sách sản phẩm</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <h2>{product.name}</h2>
                        <p>Giá: {product.price.toLocaleString()} VND</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
