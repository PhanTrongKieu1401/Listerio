<template>
  <div class="select-none border-2 z-50 w-96 shadow-lg bg-white h-9/10 flex flex-col items-center border-gray-300 rounded-lg bottom-10 absolute  pt-2" style="top:150px">
    <img src="../../../../assets/img/atlassian.png" alt="atlassian" class="w-3/4 min-w-11 select-none px-0 py-10">
    <div class="flex flex-col items-center w-full font-apple select-text">
      <span class="text-gray-800 text-center strong text-lg font-semibold">We've emailed you a code</span>
      <form @submit.prevent="handleValidate" class="flex flex-col items-center mt-4 w-full">
        <span class="list-none text-sm mb-0 font-apple w-3/4">To complete your account setup, enter the code we've sent to:</span>
        <div class="w-3/4 text-left mt-2">
          <span class="font-apple font-bold">{{ email }}</span>
        </div>
        <div class="flex justify-between w-4/5 mt-4">
          <input
            v-for="(digit, index) in code"
            :key="index"
            type="text"
            maxlength="1"
            class="code-input focus:border-blue-500"
            @input="moveToNext($event, index)"
            @keydown.backspace="moveToPrev($event, index)"
            v-model="digit.value"
            required
          />
        </div>
        <div v-if="errorMessage" class="text-red-500 mt-2 text-xs w-3/4 text-left font-apple flex-1">{{ errorMessage }}</div>
        <button :disabled="loading" type="submit" class="select-none bg-[#2d66e6] text-white rounded px-4 py-1 mt-4 w-3/4 hover:bg-[#1c4cb8] h-10 font-medium flex items-center justify-center">
          <span v-if="loading" class="loader"></span>
          <span v-else>Verify</span>
        </button>
      </form>
      <div class="flex items-center mt-4 mb-0 space-x-2">
        <span class="list-none text-[#2f66e6] text-sm hover:underline cursor-pointer mb-0">Didn't receive an email? Resend email</span>
      </div>
      <footer class="w-full flex flex-col items-center mt-4 space-y-2">
        <hr class="border-t-2 border-gray-300 w-3/4 mb-5">
        <img src="../../../../assets/img/atlassian.png" alt="atlassian" class="max-h-6 select-none grayscale">
        <span class="text-center text-xs pt-4">One account for Jira, Confluence, Trello and 
          <span class="text-[#2f66e6] hover:underline cursor-pointer">more</span>.
        </span>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useRegisAccountStore, useValidateOtpRegisStore } from '../../../../stores/authStores/regisStore';

const code = reactive([
  { value: '' },
  { value: '' },
  { value: '' },
  { value: '' },
  { value: '' },
  { value: '' },
]);

const regisAccountStore = useRegisAccountStore();
const email = regisAccountStore.email?.toString() || '';
const router = useRouter();
const validregisStore = useValidateOtpRegisStore();
const errorMessage = ref('');
const loading = ref(false);

const handleValidate = async () => {
  const otp = code.map((digit) => digit.value).join('');
  loading.value = true;
  errorMessage.value = '';
  try {
    console.log(email, otp);
    await validregisStore.validateOtp(email, otp);
    if (validregisStore.error) {
      errorMessage.value = validregisStore.error;
    } else {
      console.log('Otp successful.');
      router.push('/author/regisform');
    }
  } catch (error: any) {
    errorMessage.value = 'An error occurred while requesting password reset.';
  } finally {
    loading.value = false;
  }
};

const moveToNext = (event: Event, index: number) => {
  const input = event.target as HTMLInputElement;
  if (input.value.length > 1) {
    input.value = input.value.slice(0, 1);
  }
  code[index].value = input.value;
  if (input.value.length === 1 && index < code.length - 1) {
    const nextInput = input.nextElementSibling as HTMLInputElement;
    if (nextInput && nextInput.tagName === 'INPUT') {
      nextInput.focus();
    }
  }
};

const moveToPrev = (event: KeyboardEvent, index: number) => {
  const input = event.target as HTMLInputElement;
  if (input.value.length === 0 && event.key === 'Backspace') {
    const prevInput = input.previousElementSibling as HTMLInputElement;
    if (prevInput && prevInput.tagName === 'INPUT') {
      code[index].value = '';
      prevInput.focus();
      prevInput.value = '';
    }
  }
};

</script>

<style scoped>
@import 'index.scss';
</style>
