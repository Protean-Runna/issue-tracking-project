import { apiService } from "./apiHelper";

export const issuesAxios = {
  getAll: () => apiService.getAll("issues"),
  getSingle: (id) => apiService.getById("issues", id),
  create: (data) => apiService.create("issues", data),
  update: (id, data) => apiService.update("issues", id, data),
  delete: (id) => apiService.remove("issues", id),
};