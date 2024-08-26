import apiClient from "../api/index";
import { useProjectRoleStore } from '../stores/projectStores/projectStore'; 

export interface Comment {
    id: string,
    text: string,
    parentId: string,
    taskId: string,
    userId: string,
    createdAt: string,
    lastUpdatedAt: string
}



export interface CommentDetailResponse {
    status: number;
    timestamp: string;
    data: Comment[];
}


export const getAllCommentForTask = async (taskId:string ): Promise<CommentDetailResponse> => {
    try {
        const projectRoleStore = useProjectRoleStore()
        const idProject = projectRoleStore.idProject
        if (!idProject) {
            throw new Error("Project ID is not defined");
        }
       
        const response = await apiClient.get<CommentDetailResponse>(`/projects/${idProject}/tasks/${taskId}/comments`);
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
export interface CommentCreateResponse {
    status: number;
    timestamp: string;
    data: Comment;
}

export const createCommentForTask = async (taskId:string,newComment:String ): Promise<CommentCreateResponse> => {
    try {
        const projectRoleStore = useProjectRoleStore()
        const idProject = projectRoleStore.idProject
        if (!idProject) {
            throw new Error("Project ID is not defined");
        }
       
        const response = await apiClient.post<CommentCreateResponse>(`/projects/${idProject}/tasks/${taskId}/comments`,
            {text:newComment}
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

export interface CommentDeleteResponse {
    status: number;
    timestamp: string;
    data: string;
}

export const deleteComment = async (taskId:string,commentId:String ): Promise<CommentDeleteResponse> => {
    try {
        const projectRoleStore = useProjectRoleStore()
        const idProject = projectRoleStore.idProject
        if (!idProject) {
            throw new Error("Project ID is not defined");
        }
       
        const response = await apiClient.delete<CommentDeleteResponse>(`/projects/${idProject}/tasks/${taskId}/comments/${commentId}`);

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

export interface CommentEditResponse {
    status: number;
    timestamp: string;
    data: Comment;
}

export const editComment = async (taskId:string,commentId:String ,newComment:string): Promise<CommentEditResponse> => {
    try {
        const projectRoleStore = useProjectRoleStore()
        const idProject = projectRoleStore.idProject
        if (!idProject) {
            throw new Error("Project ID is not defined");
        }
       
        const response = await apiClient.put<CommentEditResponse>(`/projects/${idProject}/tasks/${taskId}/comments/${commentId}`,
            {text:newComment}
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

export const replyComment = async (taskId:string,commentId:String ,newReplyComment:string): Promise<CommentEditResponse> => {
    try {
        const projectRoleStore = useProjectRoleStore()
        const idProject = projectRoleStore.idProject
        if (!idProject) {
            throw new Error("Project ID is not defined");
        }
       
        const response = await apiClient.post<CommentEditResponse>(`/projects/${idProject}/tasks/${taskId}/comments/${commentId}/reply`,
            {text:newReplyComment}
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