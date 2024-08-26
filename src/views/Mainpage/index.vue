<template>

  <div >
    <MainNavbar />
    <div class="h-[700px]">>
    <router-view />
    </div>
  </div>

</template>

<script lang="ts" setup>
import MainNavbar from '../../components/shared/MainNavbar/index.vue';

</script>

<style scoped>
@import 'index.scss';
</style>
