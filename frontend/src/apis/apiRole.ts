import api from "./api";

export const getRoles = async () => {
  const res = await api.get("/api/users-permissions/roles");
  return res.data.roles;
};