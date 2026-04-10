import { apiService } from "./apiHelper";
import { Issue } from "../generated/prisma/client";


// This is the precurser to the Axios resource factory.
// Though not used anymore, it's archived as the stepping stone between having the apiHelper and the resource factory.
export const issuesAxios = {
    getAll: () => apiService.getAll<Issue[]>("issues"),
    getSingle: (id: string) => apiService.getById<Issue>("issues", id),
    create: (data: Partial<Issue>) => apiService.create<Partial<Issue>, Issue>("issues", data),
    update: (id:string, data: Partial<Issue>) => apiService.update<Partial<Issue>, Issue>("issues", id, data),
    delete: (id:string) => apiService.remove("issues", id),
};