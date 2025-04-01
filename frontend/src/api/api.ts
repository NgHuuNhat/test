import axios from "axios";

// const API_URL = "http://localhost:1337";
const API_URL = "https://test-vbsz.onrender.com";

export const getProductImage = (image?: { url: string; formats?: { thumbnail?: { url: string } } }[]) => {
    if (!image || image.length === 0) {
        return "/default-image.jpg";
    }

    const img = image[0];
    return API_URL + (img.formats?.thumbnail?.url || img.url);
};

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/products?populate=*`);
        return response.data.data;
    } catch (error) {
        return [];
    }
};
