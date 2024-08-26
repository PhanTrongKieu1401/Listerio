
import apiClient from "../api/index";
// import { useProjectRoleStore } from '../stores/projectStores/projectStore'; 

// getProfile
export interface UserResponse {
    status: number;
    timestamp: string;
    data: {
      id: string;
      
      firstName: string;
      middleName: string;
      lastName: string;
      email: string;
      phone: string;
      dateOfBirth: string;
      gender: string;
      address: string;
    };
}
  
export const fetchProfile = async (): Promise<UserResponse> => {
    try {

        const response = await apiClient.get<UserResponse>("/users");
        console.log("fetchProfile (response): ", response)
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.error.message);
        } else {
          throw new Error("An error occurred while fetching projects");
        }
    }
};

//
export interface UpdateInformationRequest {
    firstName: string;
    middleName: string;
    lastName: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    address: string;
}

export const updateInformation = async (credentials: UpdateInformationRequest): Promise<UserResponse> => {
    try {

        const response = await apiClient.patch<UserResponse>("/users",
            credentials
        );
        console.log("updateInformation (response): ", response)
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.error.message);
        } else {
          throw new Error("An error occurred while fetching projects");
        }
    }
};