import axios from "axios";

// const API_URL = "http://localhost:1337/api";
const API_URL = "https://test-vbsz.onrender.com/api";

export const getPosts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        // console.log("Response từ API:", response.data.data);
        return response.data.data;
    } catch (error) {
        // console.error("Lỗi khi lấy dữ liệu:", error);
        return [];
    }
};
