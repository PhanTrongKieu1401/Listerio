<template>
    <div class="flex">
      <MainNavbar />
    <!-- Sidebar -->
    <SidebarIssueType :isCollapsed="false" />

    <!-- Main Content -->
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts" setup>
import MainNavbar from '../../components/shared/MainNavbar/index.vue';


</script>