import api from "./api";

export const login = async (identifier: string, password: string) => {
  const res = await api.post(`/api/auth/local`, {
    identifier,
    password,
  });
  return res.data;
};