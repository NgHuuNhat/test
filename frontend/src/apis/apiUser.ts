import api, { API_URL } from "./api";

const getUsers = async ({ page, pageSize }: { page: number; pageSize: number }) => {
  const res = await api.get(`/api/users`, {
    params: {
      populate: "*",
      sort: "createdAt:asc",
      "pagination[page]": page,
      "pagination[pageSize]": pageSize,
    },
  });

  res.data = res.data.map((item: any) => ({
    ...item,
    imageUrl: item.image?.[0]?.url ? `${API_URL}${item.image[0].url}` : "null",
  }));

  return res;
};

const addUser = async (user: any) => {
  const res = await api.post(`/api/users`, user);
  return res.data;
};

const updateUser = async (id: string, user: any) => {
  const res = await api.put(`/api/users/${id}`, user);
  return res.data;
};

const deleteUser = async (id: string) => {
  const res = await api.delete(`/api/users/${id}`);
  return res.data;
};

export { getUsers, addUser, updateUser, deleteUser };
