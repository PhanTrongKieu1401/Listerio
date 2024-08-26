import { defineStore } from 'pinia';
import { forgotPassword,validateOtpForgot} from '../../api/forgotPassword';

  //  
interface ForgotPasswordState {
  email: string | null;
  error: string | null;
}

export const useForgotPasswordStore = defineStore('forgotPassword', {
  state: (): ForgotPasswordState => ({
    email: null,
    error: null,
  }),
  actions: {
    async forgotPassword(email: string) {
      try {
        await forgotPassword({ email });
        this.email = email;
        this.error = null;
      } catch (error: any) {
        this.error = error.message;
      }
    },
  },
});

  //
interface validateOtpForgotSate {
  error: string | null;
  resetPasswordKey : string | null;
}

export const useValidateOtpStore = defineStore('validateOtpForogot', {
  state: (): validateOtpForgotSate => ({
    error: null,
    resetPasswordKey: null,
  }),
  actions: {
    async validateOtpForgot(email:string ,otp: string) {
      try {
        const resetPasswordKey = await validateOtpForgot({ email, otp });
        this.resetPasswordKey = resetPasswordKey;
        this.error = null;
      } catch (error: any) {
        this.error = error.message;
      }
    },
  },
});

  //
