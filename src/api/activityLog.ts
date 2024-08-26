import apiClient from "../api/index";


export interface ActivityLog {
    id: string,
    action: string,
    taskId: string,
    sprintId: string,
    userId: string,
    createdAt: string,
}



export interface ActivityLogResponse {
    status: number;
    timestamp: string;
    data: Comment[];
}


export const getAllActivityLogForUser = async (): Promise<ActivityLogResponse> => {
    try {
        
        const response = await apiClient.get<ActivityLogResponse>(`/users/logs`);
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