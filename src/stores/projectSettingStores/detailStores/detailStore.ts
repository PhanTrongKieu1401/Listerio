// 
import { defineStore } from 'pinia';
import { fetchProjectDetail } from '../../../api/project';

interface ProjectDetailState {
  project: any[] ;
  error: string | null;
}

export const useProjectDetailStore = defineStore('projectDetail', {
  state: (): ProjectDetailState => ({
    project: [],
    error: null,
  }),
  actions: {
    async loadProjectDetail() {
      try {
        const response = await fetchProjectDetail();
        this.project = response.data; 
        this.error = null;
      } catch (error: any) {
        this.error = error.message;
      }
    },
  },
});