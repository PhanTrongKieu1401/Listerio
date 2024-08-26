<template>
  <div
    class="select-none border-2 z-50 w-96 shadow-lg bg-white h-9/10 flex flex-col items-center border-gray-300 rounded-lg absolute pt-2"
    style="top: 75px">
    <img src="../../../../assets/img/atlassian.png" alt="atlassian" class="w-3/4 min-w-11 select-none px-0 pt-8 pb-4" />
    <div class="flex flex-col items-center w-full font-apple select-text">
      <span class="text-gray-800 text-center strong text-base font-semibold flex items-center">
        Email address verified
        <i class="fa-solid fa-circle-check px-1 text-xs text-green-600 mt-1"></i>
      </span>
      <span class="text-gray-800 text-center strong text-xs font-semibold flex items-center">
        Finish setting up your account
      </span>

      <form @submit.prevent="handleSubmit" class="flex flex-col items-center mt-4 w-full">
        <span class="font-apple text-xs w-3/4 text-left mb-1 font-medium text-gray-500">Email address</span>
        <span class="font-apple text-sm font-bold w-3/4 text-left">{{
          email
        }}</span>
        <span class="font-apple text-xs w-3/4 text-left mb-1 mt-2 font-medium text-gray-500">User name</span>
        <input type="text" placeholder="Enter user name" required v-model="username"
          class="border-2 border-gray-300 rounded px-2 py-1 w-3/4 font-normal focus:outline-none focus:border-blue-500 placeholder-gray-700 text-sm placeholder-opacity-80 h-10" />

        <span class="font-apple text-xs w-3/4 text-left mt-2 font-medium text-gray-500">Create Password</span>

        <div class="relative w-3/4">
          <input :type="showPassword1 ? 'text' : 'password'" placeholder="Create Password" required v-model="password"
            class="border-2 border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-500 placeholder-gray-700 placeholder-opacity-80 mt-2 h-10 text-sm" />
          <span @click="togglePassword(1)"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-300"
            style="margin-top: 4px">
            <i :class="showPassword1
                ? 'fas fa-eye text-sm'
                : 'fas fa-eye-slash text-sm'
              " style="font-size: 1rem"></i>
          </span>
        </div>

        <span class="font-apple text-xs w-3/4 text-left mt-2 font-medium text-gray-500">Confirm Password</span>

        <div class="relative w-3/4">
          <input :type="showPassword2 ? 'text' : 'password'" placeholder="Confirm Password" required
            v-model="confirmPassword"
            class="border-2 border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-500 placeholder-gray-700 placeholder-opacity-80 mt-2 h-10 text-sm" />
          <span @click="togglePassword(2)"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-300"
            style="margin-top: 4px">
            <i :class="showPassword2
                ? 'fas fa-eye text-sm'
                : 'fas fa-eye-slash text-sm'
              " style="font-size: 1rem"></i>
          </span>
        </div>

        <div class="w-3/4 mt-2">
          <span class="text-center text-xs">
            By signing up, I accept the Atlassian
            <span class="text-[#2f66e6] hover:underline cursor-pointer">Cloud Terms of Service</span>
            and acknowledge the
            <span class="text-[#2f66e6] hover:underline cursor-pointer">Privacy Policy</span>
          </span>
        </div>
        <div v-if="errorMessage" class="text-red-500 text-sm mt-2">
          {{ errorMessage }}
        </div>
        <div v-if="successMessage" class="text-blue-500 text-sm mt-2">
          {{ successMessage }}
        </div>
        <button :disabled="loading" type="submit"
          class="select-none bg-[#2d66e6] text-white rounded px-4 py-1 mt-4 w-3/4 hover:bg-[#1c4cb8] h-10 font-medium flex items-center justify-center">
          <span v-if="loading" class="loader"></span>
          <span v-else>Continue</span>
        </button>
      </form>

      <footer class="w-full flex flex-col items-center mt-4 space-y-2">
        <hr class="border-t-2 border-gray-300 w-3/4 mb-5" />
        <img src="../../../../assets/img/atlassian.png" alt="atlassian" class="max-h-6 select-none grayscale" />
        <span class="text-center text-xs pt-4">One account for Jira, Confluence, Trello and
          <span class="text-[#2f66e6] hover:underline cursor-pointer">more</span>.
        </span>

        <div class="flex flex-col items-center">
          <span class="text-center text-xs leading-3 pt-0">This site is protected by reCAPTCHA and the Google
            <span class="text-[#2f66e6] hover:underline cursor-pointer">Privacy</span>.
          </span>
          <span class="text-center text-xs p-0">
            <span class="text-[#2f66e6] hover:underline cursor-pointer">Policy</span>
            and
            <span class="text-[#2f66e6] hover:underline cursor-pointer">Term of Service</span>
            apply
          </span>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRegisAccountStore, useValidateOtpRegisStore } from '../../../../stores/authStores/regisStore';
import { createPassWord } from '../../../../api/register';
import "@fortawesome/fontawesome-free/css/all.css";

// Reactive state
const router = useRouter();
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const loading = ref(false);
const successMessage = ref("");
const username = ref("");
const email = useRegisAccountStore().email?.toString() || "";
const registerKey = useValidateOtpRegisStore().registerKey?.toString() || "";

// Handle form submission
const handleSubmit = async () => {
  loading.value = true;
  errorMessage.value = "";
  try {
    await createPassWord({
      registerKey: registerKey,
      email: email,
      username: username.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    });

    // Clear state and navigate
    useRegisAccountStore().email = null;
    useValidateOtpRegisStore().registerKey = null;
    router.push("/author");
  } catch (error: any) {
    console.error("Password reset failed:", error);
    console.log("Error message:", error.message);
    errorMessage.value = error.message || "Invalid reset attempt.";
  } finally {
    loading.value = false;
  }
};

// Toggle password visibility
const showPassword1 = ref(false);
const showPassword2 = ref(false);

const togglePassword = (field: number) => {
  if (field === 1) {
    showPassword1.value = !showPassword1.value;
  } else if (field === 2) {
    showPassword2.value = !showPassword2.value;
  }
};
</script>

<style scoped>
@import "index.scss";
</style>
