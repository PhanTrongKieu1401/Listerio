// src/store/projects.ts
import { defineStore } from 'pinia';
import {getCurrentUserDetail} from '../../../api/user';


interface UserDetailState {

    id: string | null,
    username: string | null,
    firstName: string | null,
    middleName: string | null,
    lastName: string | null,
    email: string | null,
    phone: string | null,
    dateOfBirth: string | null,
    gender: string | null,
    address: string | null,
    error: string | null,
}


export const useGetUserDetailStore = defineStore('getDetailUser', {
  state: (): UserDetailState => ({
    id: null|| localStorage.getItem('idUser'),
    username: null|| localStorage.getItem('userName'),
    firstName: null,
    middleName: null,
    lastName: null,
    email: null || localStorage.getItem('emailUser'),
    phone: null,
    dateOfBirth: null,
    gender: null,
    address: null,
    error: null,
  }),
  actions: {

    async getDetailUser() {
      try {
        const response = await getCurrentUserDetail();
        this.id = response.data.id;
        this.username = response.data.username;
        this.firstName = response.data.firstName;
        this.middleName = response.data.middleName;
        this.lastName = response.data.lastName;
        this.email = response.data.email;
        this.phone = response.data.phone;
        this.dateOfBirth = response.data.dateOfBirth;
        this.address = response.data.address;

        localStorage.setItem('idUser', this.id||'');
        localStorage.setItem('emailUser', this.email||'');
        localStorage.setItem('userName', this.username||'');
      } catch (error: any) {
        this.error = error.message;
      }
    },
  },
});
