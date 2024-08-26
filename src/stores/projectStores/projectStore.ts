// src/store/projects.ts
import { defineStore } from 'pinia';
import { fetchAllProjects, fetchProjectRole, fetchCreateProject } from '../../api/project';

interface ProjectState {
  projects: any[] ; 
  error: string | null;
}

interface ProjectRoleState {
  project: {} ; 
  title: string | null;
  idProject: string | null;
  roleUser: string | null;
  error: string | null;
}

//createProject
export const useCreateProjectStore = defineStore('createProject', {
  state: (): ProjectRoleState => ({
    project: {},
    idProject: localStorage.getItem('idProject') || null,
    roleUser: localStorage.getItem('roleUser') || null,
    title: "",
    error: null,
  }),
  actions: {

    async createProject(credentials: { title: string }) {
      try {
        const response = await fetchCreateProject(credentials);
        this.idProject = response.data.id;
        this.project = response.data; 
        this.error = null;

        localStorage.setItem('idProject', this.idProject);
        localStorage.setItem('roleUser', "ADMIN");
      } catch (error: any) {
        this.error = error.message;
      }
    },
  },
});

// getAllProject
export const useProjectStore = defineStore('projects', {
  state: (): ProjectState => ({
    projects: JSON.parse(localStorage.getItem('projects') || '[]'),
    error: null,
  }),
  actions: {
    async loadProjects() {
      try {
        const response = await fetchAllProjects();
        this.projects = response.data; 
        this.error = null;

        localStorage.setItem('projects', JSON.stringify(this.projects));

          
      } catch (error: any) {
        this.error = error.message;
      }
    },
  },
});

// getDetailProjectRole
export const useProjectRoleStore = defineStore('projectRole', {
  state: (): ProjectRoleState => ({
    project: {},
    idProject: localStorage.getItem('idProject') || null,
    roleUser: localStorage.getItem('roleUser') || null,
    title: localStorage.getItem('titleProject') || null,
    error: null,
  }),
  actions: {
    async loadProjectRole(id: string) {
      try {
        const response = await fetchProjectRole(id);
        this.idProject = response.data.id;
        this.title = response.data.title;
        this.roleUser = response.data.roleUser;
        this.project = response.data; 
        this.error = null;

        localStorage.setItem('titleProject', this.title);
        localStorage.setItem('idProject', this.idProject);
        localStorage.setItem('roleUser', this.roleUser);
      } catch (error: any) {
        this.error = error.message;
      }
    },
  },
});