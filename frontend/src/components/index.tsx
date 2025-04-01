import React, { useEffect, useState } from 'react'
import { getProductImage, getProducts } from '../api/api';
import { Product } from '../types/type';

export default function Test() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getProducts();
            setProducts(data);
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1>Danh sách sản phẩm</h1>
            <ul>
                {products.map((p) => (
                    <li key={p.id}>
                        <h2>{p.name}</h2>
                        <p>Giá: {p.price} VNĐ</p>
                        <img src={getProductImage(p.image)} alt={p.name} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
