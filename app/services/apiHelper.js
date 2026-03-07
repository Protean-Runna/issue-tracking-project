import apiClient from "./apiClient";

export const apiService = {
  getAll: (resource) => apiClient.get(`/api/${resource}`),
  getById: (resource, id) => apiClient.get(`/api/${resource}/${id}`),
  //JSON posts and puts
  create: (resource, data) => apiClient.post(`/api/${resource}/create`, data),
  update: (resource, id, data) => apiClient.put(`/api/${resource}/update/${id}`, data),

  //Multipart posts and puts
  createMultipart: (resource, formData) =>
    apiClient.post(`/api/${resource}/create`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  updateMultipart: (resource, id, formData) =>
    apiClient.put(`/api/${resource}/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  remove: (resource, id) => apiClient.delete(`/api/${resource}/delete/${id}`),
};