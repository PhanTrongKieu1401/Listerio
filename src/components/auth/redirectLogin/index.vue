<template>
  <div
    class="select-none border-2 z-50 w-96 shadow-lg bg-white h-3/4 flex flex-col items-center border-gray-300 rounded-lg absolute  pt-2"
    style="top:150px">
    <img src="../../../assets/img/atlassian.png" alt="atlassian" class="w-3/4 min-w-11 select-none px-0 py-10">

    <div class="flex flex-col items-center w-full font-apple select-text">
      <span class="text-gray-800 text-center strong text-lg font-semibold">Login to continue</span>
      <div class="flex flex-col items-center mt-4 w-full">
        
        <div class="w-3/4 mt-2">
          <span class="text-center text-xs">
            Your email has been registered in the todo list. Do you want to continue using your account with this email to access the system?
          </span>
        </div>

        <div class="text-zinc-950 mt-2 text-2xs w-3/4 text-left font-apple flex-1 font-medium">
          {{email}}
        </div>

        <router-link to="/author" class="select-none bg-[#2d66e6] text-white rounded px-4 py-1 mt-4 w-3/4 hover:bg-[#1c4cb8] h-10 font-medium flex items-center justify-center">
          <span>Go to Login</span>
        </router-link>

      </div>

      <footer class="w-full flex flex-col items-center mt-4 space-y-2">
        <hr class="border-t-2 border-gray-300 w-3/4 mb-5">
        <img src="../../../assets/img/atlassian.png" alt="atlassian" class="max-h-6 select-none grayscale">
        <span class="text-center text-xs pt-4">One account for Jira, Confluence, Trello and
          <span class="text-[#2f66e6] hover:underline cursor-pointer">more</span>.
        </span>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRegisAccountStore } from '../../../stores/authStores/regisStore';


const regisAccountStore = useRegisAccountStore();
const email = regisAccountStore.email?.toString() || '';

</script>


<style scoped>
@import 'index.scss';
</style>