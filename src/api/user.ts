// src/api/projects.ts
import apiClient from "../api/index";
import { useProjectRoleStore } from '../stores/projectStores/projectStore';

  
  
export interface AssignUserResponse {
    status: number;
    timestamp: string;
    data: any;
}


export const assignTaskForUser = async (userId : string,taskId :string): Promise<AssignUserResponse> => {
    try {
        const projectRoleStore = useProjectRoleStore()
        const idProject = projectRoleStore.idProject
        if (!idProject) {
            throw new Error("Project ID is not defined");
        }
       
        const response = await apiClient.post<AssignUserResponse>(`/users/${userId}/projects/${idProject}/tasks/${taskId}`);

        return response.data;
    } catch (error: any) {
        if (error.response) {
            if (error.response.status === 401) {
            throw new Error("Unauthorized: Invalid or expired access token");
            } else {
            throw new Error("An error occurred while fetching projects");
            }
        } else {
            throw new Error("An error occurred while fetching projects");
        }
    }
};


export interface getUserDetailResponse {
    status: number;
    timestamp: string;
    data: any;
}


export const getCurrentUserDetail = async (): Promise<getUserDetailResponse> => {
    try {
       
        const response = await apiClient.get<getUserDetailResponse>(`/users`);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            if (error.response.status === 401) {
            throw new Error("Unauthorized: Invalid or expired access token");
            } else {
            throw new Error("An error occurred while fetching projects");
            }
        } else {
            throw new Error("An error occurred while fetching projects");
        }
    }
};


