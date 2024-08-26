// src/api/projects.ts
import apiClient from "../api/index";
import { useProjectRoleStore } from '../stores/projectStores/projectStore';

  
export interface createSprintResponse {
    status: number;
    timestamp: string;
    data: any;
}

export const createNewSprint = async (): Promise<createSprintResponse> => {
    try {
        const projectRoleStore = useProjectRoleStore()
        const idProject = projectRoleStore.idProject
        if (!idProject) {
            throw new Error("Project ID is not defined");
        }
       
        const response = await apiClient.post<createSprintResponse>(`/projects/${idProject}/sprints`);
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


export interface completeSprintResponse {
    status: number;
    timestamp: string;
    data: any;
}
export const changeStartToCompleteSprint = async (sprintId : string): Promise<completeSprintResponse> => {
    try {
        const projectRoleStore = useProjectRoleStore()
        const idProject = projectRoleStore.idProject
        if (!idProject) {
            throw new Error("Project ID is not defined");
        }
       
        const response = await apiClient.put<completeSprintResponse>(`/projects/${idProject}/sprints/${sprintId}/confirm-complete`);
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

export interface StartSprintRequest {
    title: string,
    startDate: string,
    endDate: string,
}

export interface StartSprintResponse {
    status: number;
    timestamp: string;
    data: any;
}

export const startSprint = async (credentials: StartSprintRequest,sprintId:String): Promise<StartSprintResponse> => {
    try {
        const projectRoleStore = useProjectRoleStore()
        const idProject = projectRoleStore.idProject
        if (!idProject) {
            throw new Error("Project ID is not defined");
        }
       
        const response = await apiClient.put<StartSprintResponse>(`/projects/${idProject}/sprints/${sprintId}/start`,
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


export const deleteSprint = async (sprintId:String): Promise<StartSprintResponse> => {
    try {
        const projectRoleStore = useProjectRoleStore()
        const idProject = projectRoleStore.idProject
        if (!idProject) {
            throw new Error("Project ID is not defined");
        }
       
        const response = await apiClient.delete<StartSprintResponse>(`/projects/${idProject}/sprints/${sprintId}`,
            
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

export const updateSprint = async (credentials:StartSprintRequest,sprintId:String): Promise<StartSprintResponse> => {
    try {
        const projectRoleStore = useProjectRoleStore()
        const idProject = projectRoleStore.idProject
        if (!idProject) {
            throw new Error("Project ID is not defined");
        }
       
        const response = await apiClient.put<StartSprintResponse>(`/projects/${idProject}/sprints/${sprintId}`,
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