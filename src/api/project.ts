// src/api/projects.ts
import apiClient from "../api/index";
import { useProjectRoleStore } from '../stores/projectStores/projectStore'; 


//createProject
export interface CreateProjectRequest {
    title: string
}

export interface ProjectResponse {
    status: number;
    timestamp: string;
    data: {
        id: string;
        title: string;
        keyProject: string;
    }
}

export const fetchCreateProject = async (credentials: CreateProjectRequest): Promise<ProjectResponse> => {
    try {
      const response = await apiClient.post<ProjectResponse>(
        "/projects",
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

// getAllProject
export interface UserName {
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface ProjectInformation {
  id: string;
  title: String;
  keyProject: string;
  roleUser: string;
  userNameResponseList: UserName[]
}

export interface ProjectInformationResponse {
  status: number;
  timestamp: string;
  data: ProjectInformation[];
}

export const fetchAllProjects = async (): Promise<ProjectInformationResponse> => {
  try {
    const response = await apiClient.get<ProjectInformationResponse>("/projects");
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

// getAllUserByProjects
export interface UserProject {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    role: string;
  }
  
  export interface UserProjectResponse {
    status: number;
    timestamp: string;
    data: UserProject[];
  }

export const fetchAllUserByProjects = async (): Promise<UserProjectResponse> => {
    try {
      const projectRoleStore = useProjectRoleStore()
      const idProject = projectRoleStore.idProject
        
      if (!idProject) {
        throw new Error("Project ID is not defined");
      }
      const response = await apiClient.get<UserProjectResponse>(`/users/projects/${idProject}`);
     
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

// getProjectRole
export interface ProjectRoleResponse {
    status: number;
    timestamp: string;
    data: {
      id: string;
      title: string;
      keyProject: string;
      roleUser: string;
    };
}
  
export const fetchProjectRole = async (id: string): Promise<ProjectRoleResponse> => {
    try {
  
        // const projectRoleStore = useProjectRoleStore()
        // const idProject = projectRoleStore.idProject
        
        // if (!idProject) {
        //   throw new Error("Project ID is not defined");
        // }
  
        const response = await apiClient.get<ProjectRoleResponse>(`/projects/${id}`);
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
    
//getProjectDetail
export const fetchProjectDetail = async (): Promise<ProjectInformationResponse> => {
    try {
        const projectRoleStore = useProjectRoleStore()
        const idProject = projectRoleStore.idProject
        
        if (!idProject) {
          throw new Error("Project ID is not defined");
        }
        const response = await apiClient.get<ProjectInformationResponse>(`/projects/${idProject}/information`);
        console.log("fetchProjectDetail (response): ", response)
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
  


export interface Sprint{
    "id": string,
    "title": string,
    "status": string,
    "startDate": string,
    "endDate": string,
    "createdAt": string,
    "lastUpdatedAt": string,
}

export interface SprintProjectRequest {
  status: string;
}

export interface SprintProjectResponse {
  status: number;
  timestamp: string;
  data: Sprint[];
}


// export const fetchSprintProject = async (credentials: SprintProjectRequest): Promise<SprintProjectResponse> => {
  export const fetchSprintProject = async (): Promise<SprintProjectResponse> => {
  try {
      const projectRoleStore = useProjectRoleStore()
      const idProject = projectRoleStore.idProject
      if (!idProject) {
          throw new Error("Project ID is not defined");
      }
      const part = `/projects/${idProject}/sprints?status=${"TODO"}` 
      //: `/projects/${idProject}/sprints?status=${status}
      console.log("(fetchSprintProject)", part)
      const response = await apiClient.get<SprintProjectResponse>(
        // `/projects/${idProject}/sprints?status=${"TODO"}`,
        `/projects/${idProject}/sprints`,
        
      );
      console.log("(fetchSprintProject)", response)
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


//update Project
export interface UpdateProjectRequest {
  title: string,
  keyProject: string,
}

export interface ProjectResponse {
  status: number;
  timestamp: string;
  data: {
      id: string;
      title: string;
      keyProject: string;
  }
}

export const updateProject = async (credentials: UpdateProjectRequest, projectId: string): Promise<ProjectResponse> => {
  try {
    // const projectRoleStore = useProjectRoleStore()
    //   const idProject = projectRoleStore.idProject
    //   if (!idProject) {
    //       throw new Error("Project ID is not defined");
    //   }
    const response = await apiClient.put<ProjectResponse>(
      `/projects/${projectId}`,
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


export interface DeleteProjectResponse {
  status: number;
  timestamp: string;
  data: any
}

export const deleteProject = async ( projectId: string): Promise<DeleteProjectResponse> => {
  try {
    const response = await apiClient.delete<DeleteProjectResponse>(
      `/projects/${projectId}`,

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