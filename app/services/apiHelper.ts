import apiClient from "./apiClient";

export const apiService = {
  getAll: <T = any>(resource: string) => apiClient.get<T>(`/api/${resource}`),
  getById: <T = any>(resource: string, id: string) => apiClient.get<T>(`/api/${resource}/${id}`),
  // JSON POSTS AND PATCHES
  create: <T = any, U = any>(resource: string, data: T) => apiClient.post<U>(`/api/${resource}/create`, data),
  update: <T = any, U = any>(resource: string, id: string, data: T) => apiClient.patch<U>(`/api/${resource}/${id}`, data),

  // MULTI POSTS AND PATCHES
  createMultipart: <T = any, U = any>(resource: string, formData: FormData) =>
    apiClient.post<U>(`/api/${resource}/create`, formData, { headers: { "Content-Type": "multipart/form-data" } }),
  updateMultipart: <T = any, U = any>(resource: string, id: string, formData: FormData) =>
    apiClient.patch<U>(`/api/${resource}/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } }),
  remove: <T = any>(resource: string, id: string) => apiClient.delete<T>(`/api/${resource}/${id}`),
};