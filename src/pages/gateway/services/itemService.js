import { api } from "@/services/api";

export const itemService = {
  get: (params) => (params ? api.get(`/item/${params}`) : api.get(`/items`)),
  post: (data) => api.post(`/item`, data),
};