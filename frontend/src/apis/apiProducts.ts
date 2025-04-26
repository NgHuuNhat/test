import api, { API_URL } from "./api";

const getProducts = async ({
  page,
  pageSize,
  sort,
  category,
  search,
}: {
  page?: number;
  pageSize?: number;
  sort?: string;
  category?: string;
  search?: string;
}) => {
  const res = await api.get(`/api/products`, {
    params: {
      populate: "*",
      sort: "createdAt:asc",
      "pagination[page]": page,
      "pagination[pageSize]": pageSize,
    },
  });

  res.data.data = res.data.data.map((item: any) => ({
    ...item,
    imageUrl: item.image?.[0]?.url ? `${API_URL}${item.image[0].url}` : "null",
  }));

  return res.data;
};

const addProduct = async (product: any) => {
  const res = await api.post(`/api/products`, { data: product });
  return res.data;
};

const updateProduct = async (id: string, product: any) => {
  const res = await api.put(`/api/products/${id}`, { data: product });
  return res.data;
};

const deleteProduct = async (id: string) => {
  const res = await api.delete(`/api/products/${id}`);
  return res.data;
};

export { getProducts, addProduct, updateProduct, deleteProduct };
