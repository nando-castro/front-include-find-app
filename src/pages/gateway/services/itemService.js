import { api } from "@/services/api";

const itemService = {
  get: (params) => (params ? api.get(`/item/${params}`) : api.get(`/items`)),
  post: (data) => api.post(`/item`, data),
};

export default itemService;
