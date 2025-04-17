import api from "./api";

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("files", file);

  const res = await api.post("/api/upload", formData);
  return res.data[0]; // { id, url, ... }
};
