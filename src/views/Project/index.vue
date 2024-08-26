<template>
  <div class="flex">
    <Sidebar :isCollapsed="isSidebarCollapsed" @toggleSidebar="toggleSidebar" 
    :currentRoute="currentRoute"/>

    <div class="flex-1 transition-all duration-300"
      :class="{ 'ml-20': isSidebarCollapsed, 'ml-64': !isSidebarCollapsed }">
      <router-view />
    </div>
    
  </div>
</template>


<script setup lang="ts">
import { ref, computed} from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from '../../components/shared/Sidebar/index.vue';

const isSidebarCollapsed = ref(false);
const route = useRoute()
const currentRoute = computed(() => route.path)


function toggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
}
</script>