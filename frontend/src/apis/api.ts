import axios from "axios";

// export const API_URL = "http://localhost:1337";
// export const API_URL = "https://test-be-i1me.onrender.com";
// export const API_URL = "https://test-vbsz.onrender.com";

// https://68f4787db16eb6f46834a1c3.mockapi.io/api/product
export const API_URL = "https://68f4787db16eb6f46834a1c3.mockapi.io";


const api = axios.create({
  baseURL: API_URL,
});

export default api;
