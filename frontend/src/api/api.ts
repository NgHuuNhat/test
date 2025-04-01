import axios from "axios";
import { Product } from "../types/type";

// const API_URL = "http://localhost:1337";
const API_URL = "https://test-vbsz.onrender.com";

export const getProductImage = (image?: { url: string; formats?: { thumbnail?: { url: string } } }[]) => {
    if (!image || image.length === 0) {
        return "/default-image.jpg";
    }
    const img = image[0];
    return API_URL + (img.formats?.thumbnail?.url || img.url);
};

export const getCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/categories`)
        console.log('api-categories', response.data.data);
        return response.data.data
    } catch (error) {
        return []
    }
}

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/products?populate=*`);
        console.log('api-products', response.data.data)
        return response.data.data;
    } catch (error) {
        return [];
    }
};

export const addProduct = async (data: Product) => {
    try {
        console.log('data=product',data)
        const response = await axios.post(`${API_URL}/api/products`, { data });
        console.log(response.data.data)
        return response.data.data;
    } catch (error) {
        return [];
    }
};

export const updateProduct = async (id: number, data: Product) => {
    try {
        const response = await axios.put(`${API_URL}/api/products/${id}`, { data });
        // console.log(response.data.data)
        return response.data.data;
    } catch (error) {
        return [];
    }
};

// export const deleteProduct = async (id: number) => {
//     try {
//         const response = await axios.delete(`${API_URL}/api/products/${id}`);
//         console.log(response)
//         return response.data.data;
//     } catch (error) {
//         console.log(error)
//         return [];
//     }
// };

export const deleteProduct = async (id: any) => {
    try {
        console.log(id)
        const response = await axios.delete(`${API_URL}/api/products/${id}`);
        console.log('Response delete:', response);
        return response.data.data;
    } catch (error) {
        console.error('Error deleting product:', error);
        return null;  // Hoặc tùy chỉnh để dễ theo dõi lỗi
    }
};

