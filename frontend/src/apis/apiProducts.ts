import api, { API_URL } from "./api";

// const getProducts = async ({
//   page,
//   pageSize,
//   sort,
//   category,
//   search,
// }: {
//   page?: number;
//   pageSize?: number;
//   sort?: string;
//   category?: string;
//   search?: string;
// }) => {
//   const res = await api.get(`/api/product`, {
//     params: {
//       populate: "*",
//       sort: "createdAt:asc",
//       "pagination[page]": page,
//       "pagination[pageSize]": pageSize,
//     },
//   });

//   // res.data.data = res.data.data.map((item: any) => ({
//   //   ...item,
//   //   imageUrl: item.image?.[0]?.url ? `${API_URL}${item.image[0].url}` : "null",
//   // }));

//   console.log('/api/product', res.data)
//   return res.data;
// };

const getProducts = async () => {
  try {
    const res = await api.get('/api/product')
    console.log('res', res.data)
    return res.data
  } catch (error) {
    return []
  }
}

const addProduct = async (product: any) => {
  const res = await api.post(`/api/product`, { data: product });
  return res.data;
};

const updateProduct = async (id: string, product: any) => {
  const res = await api.put(`/api/product/${id}`, { data: product });
  return res.data;
};

const deleteProduct = async (id: string) => {
  const res = await api.delete(`/api/product/${id}`);
  return res.data;
};

export { getProducts, addProduct, updateProduct, deleteProduct };
