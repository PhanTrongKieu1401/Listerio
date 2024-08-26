import { defineStore } from 'pinia';
import { login } from '../../api/auth';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenLifeTime: string | null;
  refreshTokenLifeTime: string | null;
  loginTimestamp: number | null;
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    accessTokenLifeTime: localStorage.getItem('accessTokenLifeTime') || null,
    refreshTokenLifeTime: localStorage.getItem('refreshTokenLifeTime') || null,
    loginTimestamp: localStorage.getItem('loginTimestamp') ? Number(localStorage.getItem('loginTimestamp')) : null,
    error: null,
  }),
  actions: {
    async login(credentials: { username: string; password: string }) {
      try {
        const response = await login(credentials);
        this.loginTimestamp = response.timestamp;
        this.accessToken = response.data.accessToken;
        this.refreshToken = response.data.refreshToken;
        this.accessTokenLifeTime = response.data.accessTokenLifeTime;
        this.refreshTokenLifeTime = response.data.refreshTokenLifeTime;
        this.error = null;

        localStorage.setItem('accessToken', this.accessToken);
        localStorage.setItem('refreshToken', this.refreshToken);
        localStorage.setItem('loginTimestamp', String(this.loginTimestamp));
        localStorage.setItem('accessTokenLifeTime', this.accessTokenLifeTime || '');
        localStorage.setItem('refreshTokenLifeTime', this.refreshTokenLifeTime || '');
      } catch (error: any) {
        this.error = error.message;
      }
    },
    logout() {
      this.loginTimestamp = null;
      this.accessToken = null;
      this.refreshToken = null;
      this.accessTokenLifeTime = null;
      this.refreshTokenLifeTime = null;
    },
    isLoggedIn(): boolean {
      return !!this.accessToken; 
    }
  },
});