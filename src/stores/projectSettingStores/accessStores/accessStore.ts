// 
import { defineStore } from 'pinia';
import { fetchAllUserByProjects } from '../../../api/project';

interface UserProjectState {
  userProjects: any[] ;
  error: string | null;
}

export const useUserProjectStore = defineStore('userProjects', {
  state: (): UserProjectState => ({
    userProjects: [],
    error: null,
  }),
  actions: {
    async loadUserProjects() {
      try {
        const response = await fetchAllUserByProjects();
        this.userProjects = response.data; 
        this.error = null;
      } catch (error: any) {
        this.error = error.message;
      }
    },
  },
});