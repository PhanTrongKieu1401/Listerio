// src/api/projects.ts
import apiClient from "../api/index";
import { useProjectRoleStore } from '../stores/projectStores/projectStore'; 

export interface Type {
    
    id: string,
    title: string,
    image: string,
    description: string,
      
}
  
  
export interface ListTaskResponse {
    status: number;
    timestamp: string;
    data: Type[];
}



export const getAllTypeProject = async (): Promise<ListTaskResponse> => {
    try {
        const projectRoleStore = useProjectRoleStore()
        const idProject = projectRoleStore.idProject
        if (!idProject) {
            throw new Error("Project ID is not defined");
        }
       
        const response = await apiClient.get<ListTaskResponse>(`/projects/${idProject}/types`,
            
        );
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


export interface UpdateTaskResponse {
    status: number;
    timestamp: string;
    data: Type;
}



export const aagetAllTypeProject = async (): Promise<UpdateTaskResponse> => {
    try {
        const projectRoleStore = useProjectRoleStore()
        const idProject = projectRoleStore.idProject
        if (!idProject) {
            throw new Error("Project ID is not defined");
        }
       
        const response = await apiClient.put<UpdateTaskResponse>(`/projects/${idProject}/types/`,
            
        );
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

