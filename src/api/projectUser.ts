import apiClient from "../api/index";
import { useProjectRoleStore } from '../stores/projectStores/projectStore'; 


//update role
export interface RoleProjectUserRequest {
    memberId: string,
    role: string,
}

export interface RoleProjectUserResponse {
    status: number;
    timestamp: string;
    data: string
}

export const updateRoleProjectUser = async (credentials: RoleProjectUserRequest): Promise<RoleProjectUserResponse> => {
    try {

        const projectRoleStore = useProjectRoleStore()
        const idProject = projectRoleStore.idProject
            
        if (!idProject) {
            throw new Error("Project ID is not defined");
        }
        const response = await apiClient.put<RoleProjectUserResponse>(
            `/projects/${idProject}/role`,
            credentials
        );
        return response.data;
    } catch (error: any) {
        // catch chưa xử lý
        if (error.response) {
            if (error.response.status === 404) {
            throw new Error("Project does not exist");
            } else if (error.response.status === 400) {
            throw new Error("Invalid password");
            } else {
            throw new Error("An error occurred while trying to log in");
            }
        } else {
            throw new Error("An error occurred while trying to log in");
        }
    }
};

// InviteUser
export interface InviteUserRequest {
    email: string;
    role: string;
}

export interface InviteUserResponse {
    status: number;
    timestamp: string;
    data: string;
}

export const fetchInviteUser = async (credentials: InviteUserRequest): Promise<InviteUserResponse> => {
    try {
        const projectRoleStore = useProjectRoleStore();
        const idProject = projectRoleStore.idProject;
        
        if (!idProject) {
            throw new Error("Project ID is not defined");
        }
        const reSend = true
        const response = await apiClient.post<InviteUserResponse>(`/projects/${idProject}/invite?reSend=${reSend}`, credentials);
        
        console.log("fetchInviteUser (response): ", response);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            throw new Error(`Error: ${error.response.data.message || error.response.data}`);
        } else {
            throw new Error("An error occurred while fetching projects");
        }
    }
};


// Accept invitation
export interface AcceptInviteResponse {
    status: number;
    timestamp: string;
    data: {
        email: string,
        status: string,
        projectId: string
    }
}

export const acceptInvite = async (emailEncode: string, projectId: string): Promise<AcceptInviteResponse> => {

    try {
        const response = await apiClient.post<AcceptInviteResponse>(`/accept?emailEncode=${emailEncode}&projectId=${projectId}`);
        console.log("acceptInvite (response): ", response);
        return response.data;
    } catch (error: any) {
        // catch chưa xử lý
        if (error.response) {
            if (error.response.status === 404) {
            throw new Error("Project does not exist");
            } else if (error.response.status === 400) {
            throw new Error("Invalid password");
            } else {
            throw new Error("An error occurred while trying to log in");
            }
        } else {
            throw new Error("An error occurred while trying to log in");
        }
    }
};


//deleteUser
export interface DeleteUserResponse {
    status: number;
    timestamp: string;
    data: string
}

export const deleteUser = async(memberId: string): Promise<DeleteUserResponse> => {
    try {
        const projectRoleStore = useProjectRoleStore()
        const idProject = projectRoleStore.idProject
            
        if (!idProject) {
            throw new Error("Project ID is not defined");
        }

        const response = await apiClient.delete<DeleteUserResponse>(`/users/${memberId}/projects/${idProject}`);
        return response.data;
    } catch (error: any) {
        // catch chưa xử lý
        if (error.response) {
            if (error.response.status === 404) {
            throw new Error("Project does not exist");
            } else if (error.response.status === 400) {
            throw new Error("Invalid password");
            } else {
            throw new Error("An error occurred while trying to log in");
            }
        } else {
            throw new Error("An error occurred while trying to log in");
        }
    }
}



// shareProject
export interface ShareProjectRequest {
    email: string;
    role: string;
    expireTime: string;
}

export interface ShareProjectResponse {
    status: number;
    timestamp: string;
    data: string;
}

export const shareProject = async (credentials: ShareProjectRequest): Promise<ShareProjectResponse> => {
    try {
        const projectRoleStore = useProjectRoleStore();
        const idProject = projectRoleStore.idProject;
        
        if (!idProject) {
            throw new Error("Project ID is not defined");
        }
    
        const response = await apiClient.post<ShareProjectResponse>(`/projects/${idProject}/share`, credentials);
        
        console.log("shareProject (response): ", response);
        return response.data;

    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.error.message);
        }else {
            throw new Error("An error share project");
        }
        
    }
};


// view Share Project
export interface ViewShareResponse {
    status: number;
    timestamp: string;
    data: {
        email: string,
        status: string,
        projectId: string,
        shareToken: string
    }
}

export const viewShareProject = async (shareToken: string): Promise<ViewShareResponse> => {

    try {
        const response = await apiClient.post<ViewShareResponse>(`/view_share?shareToken=${shareToken}`);
        console.log("viewShareProject (response): ", response);
        return response.data;
    } catch (error: any) {
        // catch chưa xử lý
        if (error.response) {
            throw new Error(error.response.data.error.message);
        } else {
            throw new Error("An error occurred");
        }
    }
};
