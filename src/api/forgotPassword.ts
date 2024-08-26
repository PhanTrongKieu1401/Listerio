import apiClient from "../api/index";

// Handle forgot password
interface ForgotPasswordRequest {
  email: string;
}

interface ForgotPasswordResponse {
  code: string;
  timestamp: number;
  data: any;
}

export const forgotPassword = async (
  credentials: ForgotPasswordRequest
): Promise<ForgotPasswordResponse> => {
  try {
    const response = await apiClient.post<ForgotPasswordResponse>(
      "/auth/forgot",
      credentials
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 400) {
        throw new Error("Invalid email or email format");
      } else if (error.response.status === 404) {
        throw new Error("Email does not exist");
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
    resetPasswordKey: string;
  };
}

export const validateOtpForgot = async (credentials: ValidateOtpRequest): Promise<string> => {
  try {
    const response = await apiClient.post<ValidateOtpResponse>(
      "/auth/reset-password/otp/validate",
      credentials
    );
    console.log(response.data);
    return response.data.data.resetPasswordKey;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 400 || error.response.status === 404) {
        throw new Error("OTP does not match");
      } else {
        throw new Error("An error occurred ");
      }
    } else {
      throw new Error("An error occurred while trying to validate OTP");
    }
  }
};

// Reset password
interface ResetPasswordRequest {
  email: string;
  resetPasswordKey: string;
  password: string;
  confirmPassword: string;
}

interface ResetPasswordResponse {
  code: string;
  timestamp: number;
  data: any;
}

export const resetPassWord = async (credentials: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
  try {
    const response = await apiClient.post<ResetPasswordResponse>(
      "/auth/reset-password",
      credentials
    );
    return response.data.data;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 400) {
        throw new Error("Invalid password or password confirmation");
      } else if (error.response.status === 404) {
        throw new Error("Email not found");
      } else {
        throw new Error("An error occurred while trying to reset the password");
      }
    } else {
      throw new Error("An error occurred while trying to reset the password");
    }
  }
};
