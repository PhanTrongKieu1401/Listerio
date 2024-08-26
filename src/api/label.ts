// src/api/projects.ts
import apiClient from "../api/index";
import { useProjectRoleStore } from '../stores/projectStores/projectStore'; 

export interface Label {
    id: string,
    typeId: string,
    title: string,
    description: string
}
  
  
export interface LabelResponse {
    status: number;
    timestamp: string;
    data: Label;
}
export interface LabelContent {
    title: string,
    description: string
}


export const createLabelForType = async (typeId:string,credentials: LabelContent): Promise<LabelResponse> => {
    try {
        const projectRoleStore = useProjectRoleStore()
        const idProject = projectRoleStore.idProject
        if (!idProject) {
            throw new Error("Project ID is not defined");
        }
       
        const response = await apiClient.post<LabelResponse>(`/projects/${idProject}/types/${typeId}/labels`,
            credentials
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

export interface ListLabelResponse {
    status: number;
    timestamp: string;
    data: Label[];
}
export const getAllLabelInType = async (typeId:string): Promise<ListLabelResponse> => {
    try {
        const projectRoleStore = useProjectRoleStore()
        const idProject = projectRoleStore.idProject
        if (!idProject) {
            throw new Error("Project ID is not defined");
        }
       
        const response = await apiClient.get<ListLabelResponse>(`/projects/${idProject}/types/${typeId}/labels`,
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