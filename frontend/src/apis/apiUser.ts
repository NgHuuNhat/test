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
  console.log("res", res)
  if (res.data) {
    const cartRes = await api.post(`${API_URL}/api/carts`, {
      data: {
        userId: res.data.id
      }
    });
    console.log("res", res)
    console.log("cartRes", cartRes)
  }

  return res.data;
};

const updateUser = async (id: string, user: any) => {
  console.log(id, user)
  const res = await api.put(`/api/users/${id}`, user);
  return res.data;
};

const deleteUser = async (id: string) => {
  const res = await api.delete(`/api/users/${id}`);
  return res.data;
};

const getUserById = async (id: any) => {
  const res = await api.get(`/api/users/${id}?populate=*`);
  const user = res.data;
  const role = user.role?.name || "unknown";
  const image = user.image?.[0]?.url
    ? `${API_URL}${user.image[0].url}`
    : null;
  const newUser = {
    ...user,
    role,
    image,
  };
  return newUser;
};


export { getUsers, addUser, updateUser, deleteUser, getUserById };
