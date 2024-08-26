<template>
  <div
    class="select-none border-2 z-50 w-96 shadow-lg bg-white h-3/4 flex flex-col items-center border-gray-300 rounded-lg absolute pt-2"
    style="top: 150px">
    <img src="../../../../assets/img/atlassian.png" alt="atlassian" class="w-3/4 min-w-11 select-none px-0 py-10" />

    <div class="flex flex-col items-center w-full font-apple select-text">
      <span class="text-gray-800 text-center strong text-lg font-semibold">
        Can't log in?
      </span>

      <form @submit.prevent="handleForgotPassword" class="flex flex-col items-center mt-4 w-full">
        <span class="font-apple text-xs w-3/4 text-left mb-1 font-medium text-gray-500">
          We'll send a OTP to
        </span>
        <input required v-model="email" type="text" placeholder="Enter your email"
          class="border-2 border-gray-300 rounded px-2 py-1 w-3/4 font-normal focus:outline-none focus:border-blue-500 placeholder-gray-700 text-sm placeholder-opacity-80 h-10" />
        <div v-if="errorMessage" class="text-red-500 mt-2 text-xs w-3/4 text-left font-apple flex-1">
          {{ errorMessage }}
        </div>
        <button :disabled="loading" type="submit"
          class="select-none bg-[#2d66e6] text-white rounded px-4 py-1 mt-4 w-3/4 hover:bg-[#1c4cb8] h-10 font-medium flex items-center justify-center">
          <span v-if="loading" class="loader"></span>
          <span v-else>Send OTP</span>
        </button>
      </form>

      <div class="flex items-center mt-4 mb-0 space-x-2">
        <router-link to="/author/" class="list-none text-[#2f66e6] text-sm hover:underline cursor-pointer mb-0">
          Return to log in
        </router-link>
      </div>

      <footer class="w-full flex flex-col items-center mt-4 space-y-2">
        <hr class="border-t-2 border-gray-300 w-3/4 mb-5" />
        <img src="../../../../assets/img/atlassian.png" alt="atlassian" class="max-h-6 select-none grayscale" />

        <span class="text-center text-xs pt-4">
          One account for Jira, Confluence, Trello and
          <span class="text-[#2f66e6] hover:underline cursor-pointer">
            more
          </span>.
        </span>

        <ul class="flex items-center justify-center space-x-2">
          <li class="list-none text-xs hover:underline cursor-pointer">
            Login help
          </li>
          <span class="text-l leading-none">•</span>
          <li class="list-none text-xs hover:underline cursor-pointer">
            Contact Support
          </li>
        </ul>

      </footer>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useForgotPasswordStore } from '../../../../stores/authStores/forgotStore';

// Initialize router and store
const router = useRouter();
const forgotPasswordStore = useForgotPasswordStore();

// Define reactive state
const email = ref('');
const errorMessage = ref('');
const loading = ref(false);

// Handle forgot password
const handleForgotPassword = async () => {
  loading.value = true;
  errorMessage.value = '';
  try {
    console.log('Attempting to login with:', { email: email.value });
    await forgotPasswordStore.forgotPassword(email.value);
    if (forgotPasswordStore.error) {
      errorMessage.value = forgotPasswordStore.error;
    } else {
      console.log('Password reset email sent successfully.');
      router.push('/author/validforgot');
    }
  } catch (error: any) {
    errorMessage.value =
      'An error occurred while requesting password reset.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@import 'index.scss';
</style>
