import { Issue } from "../generated/prisma/client"
import { apiService } from "./apiHelper"
// This is a generic creator for locking in the name once for the methods
//

//BASED OFF THE apiIssues service

const ResourceFactory = <T>(resourceName:string) => ({
    getAll: () => apiService.getAll<T[]>(resourceName),
    getSingle: (id: string) => apiService.getById<T>(resourceName, id),
    create: (data: Partial<T>) => apiService.create<Partial<T>, T>(resourceName, data),
    update: (id:string, data: Partial<T>) => apiService.update<Partial<T>, T>(resourceName, id, data),
    delete: (id:string) => apiService.remove(resourceName, id),
})

export const ISSUES_AXIOS = ResourceFactory<Issue>("issues");