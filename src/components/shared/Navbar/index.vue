<template>
  <div class="h-[10vh] fixed top-0 left-0 right-0 bg-white z-50 font-charlie flex">
    <img src="../../../assets/img/logo_no_text.png" alt="" class="h-full w-20">
    <div class="container mx-auto flex items-center h-full justify-between ml-20">
      <a href="" class="flex items-center space-x-1 select-none">
        <div class="my-4 flex items-center">
          <svg fill="none" height="28" viewBox="0 0 26 32" focusable="false" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg">
            <path fill="#357DE8"
              d="M7.967 21.323H5.748C2.401 21.323 0 19.273 0 16.271h11.933c.618 0 1.018.44 1.018 1.062V29.34c-2.983 0-4.984-2.416-4.984-5.784zm5.894-5.967h-2.22c-3.346 0-5.747-2.013-5.747-5.015h11.932c.618 0 1.055.402 1.055 1.025v12.007c-2.983 0-5.02-2.416-5.02-5.784zm5.93-5.93h-2.22c-3.347 0-5.748-2.05-5.748-5.052h11.933c.618 0 1.019.439 1.019 1.025v12.007c-2.983 0-4.984-2.416-4.984-5.784z">
            </path>
          </svg>
          <span class="ml-2 text-blue-800 text-xl mr-[80px] font-bold" style="margin-top: 6px">Todo List</span>
        </div>
      </a>

      <div class="flex items-center space-x-4 select-none">
        <button class="ml-4 bg-button-color text-white rounded-full px-8 py-3 font-bold hover:bg-button-color-hover">
          Get it free
        </button>
        <div class="h-full border-l-2 border-black mx-2" style="height: 24px;"></div>
        <button @click="goToAuthorPage"
          class="mr-0 bg-white text-button-color text-xs font-bold px-4 py-4 hover:bg-gray-100">
          Sign in
        </button>
      </div>

    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'navbar',

});
</script>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function goToAuthorPage() {
  router.push('/author');
}
</script>