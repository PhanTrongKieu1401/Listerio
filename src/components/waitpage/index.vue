<template>

  <div v-if="isLoading" class="loading-container">
    <!-- <div class="loader-button"></div> -->
    <a-spin size="large" />
  </div>
  <div v-else>
    <div class="flex mt-10 justify-center h-screen w-full relative">
      <!-- <img src="../../assets/img/bg_auth.svg" alt="Background" class="absolute inset-0 w-full h-full object-cover z-10"> -->
      <!-- <div class="select-none border-2 z-50 w-96 shadow-lg bg-white h-4/5 flex flex-col items-center border-gray-300 rounded-lg mt-8 absolute bottom-8 pt-2"> -->
      <div class="flex flex-col items-center">
        <div class="w-56 min-w-11 px-0 py-10 select-none">
          <!-- !fix -->
          <div class="flex items-center justify-center">
            <svg
              fill="none"
              height="28"
              viewBox="0 0 28 32"
              focusable="false"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#357DE8"
                d="M7.967 21.323H5.748C2.401 21.323 0 19.273 0 16.271h11.933c.618 0 1.018.44 1.018 1.062V29.34c-2.983 0-4.984-2.416-4.984-5.784zm5.894-5.967h-2.22c-3.346 0-5.747-2.013-5.747-5.015h11.932c.618 0 1.055.402 1.055 1.025v12.007c-2.983 0-5.02-2.416-5.02-5.784zm5.93-5.93h-2.22c-3.347 0-5.748-2.05-5.748-5.052h11.933c.618 0 1.019.439 1.019 1.025v12.007c-2.983 0-4.984-2.416-4.984-5.784z"
              ></path>
            </svg>
            <!-- mr-[80px] -->
            <span class="ml-2 text-blue-800 text-2xl font-bold">Todo List</span>
          </div>
        </div>

        <div class="flex flex-col items-center w-full font-apple select-text">
          <span
            v-if="isAccess === UserActionStatus.LOGGED_ACCEPTED"
            class="text-gray-800 text-center strong text-3xl font-semibold"
          >
            Join Your Group
          </span>
          <span
            v-else-if="isAccess === UserActionStatus.ACCEPTED"
            class="text-gray-800 text-center strong text-3xl font-semibold"
          >
            Login To Join Your Group
          </span>
          <span
            v-else-if="isAccess === UserActionStatus.UNREGISTERED"
            class="text-gray-800 text-center strong text-3xl font-semibold"
          >
            Sign Up To Join Your Group
          </span>

          <div>
            <div class="w-full flex items-center justify-center">
              <span class="w-3/4 mt-5 text-center text-gray-600">
                You have confirmed your participation in project
              </span>
            </div>
            <div class="w-full flex items-center justify-center">
              <span class="w-3/4 mt-5 text-center text-gray-600">
                Email address:
                <span class="font-semibold text-slate-950 ml-2">
                  {{ data?.email }}
                </span>
              </span>
            </div>

            <div class="w-full flex items-center justify-center">
              <span
                v-if="isAccess === UserActionStatus.LOGGED_ACCEPTED"
                class="w-3/4 mt-8 mb-3 text-center text-gray-500 text-sm"
              >
                You have logged in to the todo list with the account with the
                above email, please click the button below to enter the project
              </span>
              <span
                v-else-if="isAccess === UserActionStatus.ACCEPTED"
                class="w-3/4 mt-8 mb-3 text-center text-gray-500 text-sm"
              >
                You need to log in to todo list with the account with the above
                email to access the project
              </span>
              <span
                v-else-if="isAccess === UserActionStatus.UNREGISTERED"
                class="w-3/4 mt-8 mb-3 text-center text-gray-500 text-sm"
              >
                You need to register to the todo list with the account with the
                above email. And you need to access the previous email again!
              </span>
            </div>
          </div>

          <button
            v-if="isAccess === UserActionStatus.LOGGED_ACCEPTED"
            :disabled="loading"
            @click="handleGoProject()"
            class="select-none bg-[#2d66e6] text-white rounded px-4 py-1 mt-4 w-3/5 hover:bg-[#1c4cb8] h-11 font-medium flex items-center justify-center cursor-pointer"
          >
            <span v-if="loading" class="loader"></span>
            <span v-else>Go to Group</span>
          </button>
          <button
            v-else-if="isAccess === UserActionStatus.ACCEPTED"
            @click="handleGoLogin()"
            class="select-none bg-[#2d66e6] text-white rounded px-4 py-1 mt-4 w-3/5 hover:bg-[#1c4cb8] h-11 font-medium flex items-center justify-center cursor-pointer"
          >
            <span>Go to Login</span>
          </button>

          <button
            v-else-if="isAccess === UserActionStatus.UNREGISTERED"
            @click="handleGoRegister()"
            class="select-none bg-[#2d66e6] text-white rounded px-4 py-1 mt-4 w-3/5 hover:bg-[#1c4cb8] h-11 font-medium flex items-center justify-center cursor-pointer"
          >
            <span>Go to register</span>
          </button>

          <footer class="w-full flex flex-col items-center mt-8 space-y-2">
            <hr class="border-t-2 border-gray-300 w-3/5 mb-5" />

            <ul class="flex items-center justify-center space-x-2">
              <li class="list-none text-xs hover:underline cursor-pointer">
                Privacy Policy
              </li>
              <span class="text-l leading-none">•</span>
              <li class="list-none text-xs hover:underline cursor-pointer">
                User Notice
              </li>
            </ul>

            <div class="flex flex-col items-center">
              <span class="text-center text-xs leading-3 pt-0"
                >This site is protected by reCAPTCHA and the Google
                <span class="text-[#2f66e6] hover:underline cursor-pointer"
                  >Privacy</span
                >.
              </span>
              <span class="text-center text-xs p-0">
                <span class="text-[#2f66e6] hover:underline cursor-pointer"
                  >Policy</span
                >
                and
                <span class="text-[#2f66e6] hover:underline cursor-pointer"
                  >Term of Service</span
                >
                apply
              </span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { acceptInvite } from "../../api/projectUser";
import { useProjectRoleStore } from "../../stores/projectStores/projectStore";
import { UserActionStatus } from "../../utils/constants/enum";
import "@fortawesome/fontawesome-free/css/all.css";

interface DataType {
  email: string;
  status: string;
  projectId: string;
}

// Khai báo các biến
const route = useRoute();
const router = useRouter();
const isLoading = ref(true);
const isAccess = ref<string>();
const loading = ref(false);
const data = ref<DataType | undefined>(undefined);

const email = route.query.email as string;
const id = route.query.id as string;

const handleGoLogin = () => {
  router.replace("/author");
};

const handleGoRegister = () => {
  if (data.value && data.value.email) {
    router.replace({
      path: "/author/register",
      query: { email: data.value.email },
    });
  } else {
    console.error("Email is not defined");
  }
};

const handleGoProject = async () => {
  loading.value = true;
  try {
    const projectRoleStore = useProjectRoleStore();
    await projectRoleStore.loadProjectRole(id);
    router.replace("/mainpage");
  } catch (error) {
    console.error("Error loading project role:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  isLoading.value = true;
  try {
    const response = await acceptInvite(email, id);
    data.value = response.data;
    isAccess.value = response.data.status;
  } catch (error) {
    isAccess.value = UserActionStatus.UNREGISTERED;
    console.error("Failed to fetch invite:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style>
@import "index.scss";
</style>
