import { apiService } from "./apiHelper";


type Issue = {          // Validated and mapped API side. should be find
id: number;
title: string;
description: string;
status: string;
createdAt: string; 
updatedAt: string; 
};


export const issuesAxios = {
    getAll: () => apiService.getAll<Issue[]>("issues"),
    getSingle: (id: string) => apiService.getById<Issue>("issues", id),
    create: (data: Partial<Issue>) => apiService.create<Partial<Issue>, Issue>("issues", data),
    update: (id:string, data: Partial<Issue>) => apiService.update<Partial<Issue>, Issue>("issues", id, data),
    delete: (id:string) => apiService.remove("issues", id),
};