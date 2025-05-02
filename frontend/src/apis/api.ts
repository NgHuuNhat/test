import axios from "axios";

// export const API_URL = "http://localhost:1337";

export const API_URL = "https://test-be-i1me.onrender.com";

const api = axios.create({
  baseURL: API_URL,
});

export default api;
