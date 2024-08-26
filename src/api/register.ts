import apiClient from "../api/index";

// register account
interface RegisterRequest {
  email: string;
}

interface RegisterResponse {
  code: string;
  timestamp: number;
  data: any;
}

export const regisAccount = async (credentials: RegisterRequest): Promise<RegisterResponse> => {
  try {
    const response = await apiClient.post<RegisterResponse>(
      "/auth/register/email/validate",
      credentials
    );

    // if (response.data.data === "Account has been registered") {
    //   console.log(response.data.data);
    //   throw new Error("Account has already been registered");
    // }
    console.log(response.data.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 400) {
        throw new Error("Invalid email or email format");
      } else if (error.response.status === 409) {
        throw new Error("Email already exist");
      } else {
        throw new Error(
          "An error occurred while trying to request a password reset"
        );
      }
    } else {
      throw new Error(
        "An error occurred while trying to request a password reset"
      );
    }
  }
};

// validate OTP
interface ValidateOtpRequest {
  email: string;
  otp: string;
}

interface ValidateOtpResponse {
  code: string;
  timestamp: number;
  data: {
    registerKey: string;
  };
}

export const validateOtp = async (credentials: ValidateOtpRequest): Promise<string> => {
  try {
    const response = await apiClient.post<ValidateOtpResponse>(
      "/auth/register/otp/validate",
      credentials
    );
    console.log(response.data);
    return response.data.data.registerKey;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 400) {
        throw new Error("OTP does not match");
      } else {
        throw new Error("An error occurred while trying to validate OTP");
      }
    } else {
      throw new Error("An error occurred while trying to validate OTP");
    }
  }
};

// create password
interface CreatePasswordRequest {
  registerKey: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface CreatePasswordResponse {
  code: string;
  timestamp: number;
  data: any;
}

export const createPassWord = async (credentials: CreatePasswordRequest): Promise<CreatePasswordResponse> => {
  try {
    const response = await apiClient.post<CreatePasswordResponse>(
      "auth/register",
      credentials
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      if (error.response.data.error.message.username) {
        
        throw new Error("Username must have beetwen 5 and 20 characters");
      } else {
      
        throw new Error("Password or confim password is invalid");}
      }
      throw new Error("An error occurred while trying to create password");
  }
};
