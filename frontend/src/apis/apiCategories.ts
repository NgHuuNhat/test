import api from "./api";

export const getCategories = async () => {
  try {
    const res = await api.get("/api/categories");
    return res.data;
  } catch (error) {
    console.log(error)
    return [];
  }
};
