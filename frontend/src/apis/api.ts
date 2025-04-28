import axios from "axios";

// export const API_URL = "http://localhost:1337";
export const API_URL = "https://test-vbsz.onrender.com";


// export const API_URL = "https://test-six-kappa-87.vercel.app/";

const api = axios.create({
  baseURL: API_URL,
});

export default api;
