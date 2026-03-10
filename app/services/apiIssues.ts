import { apiService } from "./apiHelper";
import { Issue } from "../generated/prisma/client";



export const issuesAxios = {
    getAll: () => apiService.getAll<Issue[]>("issues"),
    getSingle: (id: string) => apiService.getById<Issue>("issues", id),
    create: (data: Partial<Issue>) => apiService.create<Partial<Issue>, Issue>("issues", data),
    update: (id:string, data: Partial<Issue>) => apiService.update<Partial<Issue>, Issue>("issues", id, data),
    delete: (id:string) => apiService.remove("issues", id),
};