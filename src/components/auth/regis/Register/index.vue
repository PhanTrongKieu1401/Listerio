<template>
  <div
    class="select-none border-2 z-50 w-96 shadow-lg bg-white h-3/4 flex flex-col items-center border-gray-300 rounded-lg absolute  pt-2"
    style="top:150px">
    <img src="../../../../assets/img/atlassian.png" alt="atlassian" class="w-3/4 min-w-11 select-none px-0 py-10">

    <div class="flex flex-col items-center w-full font-apple select-text">
      <span class="text-gray-800 text-center strong text-lg font-semibold">Sign up to continue</span>
      <form @submit.prevent="handleRegis" class="flex flex-col items-center mt-4 w-full">
        <input type="text" placeholder="Enter your email" v-model="email"
          class="border-2 border-gray-300 rounded px-2 py-1 w-3/4 font-normal focus:outline-none focus:border-blue-500 placeholder-gray-700 text-sm placeholder-opacity-80 h-10">
        
        <div class="w-3/4 mt-2">
          <span class="text-center text-xs">
            By signing up, I accept the Atlassian
            <span class="text-[#2f66e6] hover:underline cursor-pointer">Cloud Terms of Service</span>
            and acknowledge the
            <span class="text-[#2f66e6] hover:underline cursor-pointer">Privacy Policy</span>
          </span>
        </div>

        <div v-if="errorMessage" class="text-red-500 mt-2 text-xs w-3/4 text-left font-apple flex-1">{{ errorMessage }}
        </div>

        <button :disabled="loading" type="submit"
          class="select-none bg-[#2d66e6] text-white rounded px-4 py-1 mt-4 w-3/4 hover:bg-[#1c4cb8] h-10 font-medium flex items-center justify-center">
          <span v-if="loading" class="loader"></span>
          <span v-else>Sign up</span>
        </button>

      </form>

      <div class="flex items-center mt-4 mb-0 space-x-2">
        <router-link to="/author/" class="list-none text-[#2f66e6] text-sm hover:underline cursor-pointer mb-0">
          Already have an Atlassian account? Log in
        </router-link>
      </div>

      <footer class="w-full flex flex-col items-center mt-4 space-y-2">
        <hr class="border-t-2 border-gray-300 w-3/4 mb-5">
        <img src="../../../../assets/img/atlassian.png" alt="atlassian" class="max-h-6 select-none grayscale">
        <span class="text-center text-xs pt-4">One account for Jira, Confluence, Trello and
          <span class="text-[#2f66e6] hover:underline cursor-pointer">more</span>.
        </span>

        <div class="flex flex-col items-center ">
          <span class="text-center text-xs leading-3 pt-0">This site is protected by reCAPTCHA and the Google
            <span class="text-[#2f66e6] hover:underline cursor-pointer">Privacy</span>.
          </span>
          <span class="text-center text-xs p-0">
            <span class="text-[#2f66e6] hover:underline cursor-pointer">Policy</span>
            and <span class="text-[#2f66e6] hover:underline cursor-pointer">Term of Service</span> apply
          </span>
        </div>

      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useRegisAccountStore } from '../../../../stores/authStores/regisStore';

// Reactive state
const router = useRouter();
const route = useRoute();

const emailInvite = route.query.email as string;;
console.log("emailInvite", emailInvite)
const regisStore = useRegisAccountStore();
const email = ref(emailInvite || '');
const errorMessage = ref('');
const loading = ref(false);

// Handle registration
const handleRegis = async () => {
  loading.value = true;
  errorMessage.value = '';
  try {
    await regisStore.regisAccount(email.value);
    const response = regisStore.data
    console.log("handleRegis", regisStore.data)

    if(response === "UNREGISTERED") {
      console.log("(handleRegis) UNREGISTERED")
      router.push('/author/validate');

    }else if(response === "INACTIVE") {
      console.log("(handleRegis) INACTIVE")
      router.push('/author/regisform')

    }else if(response === "ACTIVE") {
      console.log("(handleRegis) ACTIVE")
      router.push('/author/redirect-login')
    }
    
  } catch (error: any) {
    console.log('Error message:', error.message);
    errorMessage.value = 'An error occurred.';
  } finally {
    loading.value = false;
  }
};
</script>


<style scoped>
@import 'index.scss';
</style>