<template>
    <div>
      <!-- Loading Spinner -->
      <!-- <div v-if="isLoading" class="loading-container">
        <div class="loader"></div>
      </div> -->
  
      <!-- Main Content (visible after loading is done) -->
      <div>
        <MainNavbar />
        <router-view />
        <ProfileHeader :profile="profile" />
        <div class="flex flex-row container">
            <div class="basis-1/3">
                <ProfileDetails :profile="profile" />
            </div>
            <div class="basis-2/3 ml-6">
                <WorkOn />
            </div>
        </div>
        <!-- <div class="flex flex-row">
            <div class="basis-1/3">
                
                <ProfileDetails />
            </div>
            
            <div class="container basis-2/3">
                <WorkOn />
            </div>
        </div> -->
        
        
      </div>
    </div>
  </template>
  
<script lang="ts" setup>
  import {  ref, onMounted } from 'vue';
  import MainNavbar from '../../components/shared/MainNavbar/index.vue';
  import ProfileHeader from '../../components/profile/profileHeader/index.vue';
  import ProfileDetails from '../../components/profile/profileDetails/index.vue';
  import WorkOn from '../../components/profile/workOn/index.vue';
  // import { useProjectStore } from '../../stores/projectStores/projectStore';
  import {fetchProfile} from "../../api/profile";
  
  export interface Profile {
      id: string;
      username: string;
      firstName: string;
      middleName: string;
      lastName: string;
      email: string;
      phone: string;
      dateOfBirth: string;
      gender: string;
      address: string;
  }

  const profile = ref<any>(null);

  onMounted(async () => {
    try {
      const response = await fetchProfile();
      profile.value = response.data
      console.info("profileDetail (response)", profile);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
    }
  });

  </script>
  
  <style scoped>
  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #fff;
  }
  
  .loader {
    border: 8px solid #f3f3f3; /* Light grey */
    border-top: 8px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .container {
  max-width: 1200px;
}
  </style>
  