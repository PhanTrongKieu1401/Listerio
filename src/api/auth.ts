import apiClient from "../api/index";

export interface LoginResponse {
  code: string;
  timestamp: number;
  data: {
    accessToken: string;
    refreshToken: string;
    accessTokenLifeTime: string;
    refreshTokenLifeTime: string;
  };
}

export interface LoginRequest {
  username: string;
  password: string;
}

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>(
      "/auth/login",
      credentials
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      if (error.response.data.error.message.username) {
        
        throw new Error("Username must have beetwen 5 and 20 characters");
      } else {
      
        throw new Error("Username or password is invalid");}
      
    }
    throw new Error("An error occurred while trying to log in");
    //   if (error.response.status === 404) {
    //     throw new Error("User name does not exist");
    //   } else if (error.response.status === 400) {
    //     throw new Error("Invalid password");
    //   } else {
    //     throw new Error("An error occurred while trying to log in");
    //   }
    // } else {
    //   throw new Error("An error occurred while trying to log in");
    // }
  }
};
