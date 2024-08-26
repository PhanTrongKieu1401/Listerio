<template>
  <div class="h-[60px] fixed top-0 left-0 right-0 bg-white z-30 border-b border-black border-opacity-20">
    <div class="container mx-auto flex items-center h-full justify-between select-none">
      <div class="flex ml-[10px]">

        <div class="my-4 flex items-center">
          <!-- fix  -->
          <svg fill="none" height="28" viewBox="0 0 26 32" focusable="false" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg">
            <path fill="#357DE8"
              d="M7.967 21.323H5.748C2.401 21.323 0 19.273 0 16.271h11.933c.618 0 1.018.44 1.018 1.062V29.34c-2.983 0-4.984-2.416-4.984-5.784zm5.894-5.967h-2.22c-3.346 0-5.747-2.013-5.747-5.015h11.932c.618 0 1.055.402 1.055 1.025v12.007c-2.983 0-5.02-2.416-5.02-5.784zm5.93-5.93h-2.22c-3.347 0-5.748-2.05-5.748-5.052h11.933c.618 0 1.019.439 1.019 1.025v12.007c-2.983 0-4.984-2.416-4.984-5.784z">
            </path>
          </svg>
          <span class="ml-2 text-blue-800 text-xl mr-[80px] font-bold" style="margin-top: 6px">Todo List</span>
        </div>

        <ul class="ml-4 flex items-center relative">
          <li v-for="(button, index) in buttons" :key="index" class="font-apple font-medium px-1 relative">
            <button :class="['text-text-dark px-2 py-2 mt-4  rounded transition duration-300',
              activeModal === index
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                : 'hover:bg-gray-200',]" ref="buttonRefs" :data-index="index" @click="openModal(index, $event)">
              {{ button }}
              <i class="fas fa-chevron-down text-xs"></i>
            </button>

            <component :is="modalComponents[index]" v-if="activeModal === index" :isVisible="activeModal === index"
              @update:isVisible="closeModal"
              class="absolute top-[60px] left-0 min-w-[320px] transition-transform duration-300 modal" />
          </li>
        </ul>
      </div>
      <div class="flex items-center">
        <a-dropdown :trigger="['click']" placement="bottomRight">
          <button class=" text-gray-600 hover:text-gray-900 hover:bg-gray-200 w-8 h-8 rounded-full">
            <i class="fas fa-bell"></i>
          </button>
          <template #overlay>
            <a-menu class="w-[500px] ">
              <div class="px-6">
                <!-- header -->
                <div class="mt-2">
                  <span class="text-text-dark-thin font-apple text-2xl font-medium ">Notifications</span>
                </div>

                <!-- content -->
                <div class="mt-4 h-[400px] overflow-y-auto">
                  <span class="font-ui text-text-dark text-xs font-medium ">LATEST</span>
                  <div v-for="activityLog in allActivityLog" :key="activityLog.id" class="w-[75px]">
                    {{activityLog.action}}

                  </div>
                </div>
              </div>
            </a-menu>
          </template>
        </a-dropdown>

        <a-dropdown :trigger="['click']">
          <button class=" text-gray-600 hover:text-gray-900 hover:bg-gray-200 w-8 h-8 rounded-full">
            <i class="fas fa-user"></i>
          </button>
          <template #overlay>
            <a-menu>
              <div class="w-72 pl-3">
                <div class="w-72 h-4 text-xs text-gray-600 my-1.5 ">
                  <p>ACCOUNT</p>
                </div>
                <div class="flex flex-row my-2">
                  <div class="basis-1/6">
                    <div class="flex items-center justify-center mr-1.5">
                      <div
                        class="flex items-center justify-center w-10 h-10 bg-[#39a3bf]  rounded-full text-[#1e3d5f] text-xl font-bold">
                        {{ userDetail.username.charAt(0).toUpperCase() }}
                      </div>
                    </div>
                    <!-- <Avat class="bg-slate-700 text-white inset-x-0 rounded-full " style="font-size: 25px" :size="100">MH</Avat> -->
                  </div>
                  <div class="basis-5/6 flex flex-col ml-2">
                    <p class="text-base text-gray-600 mb-px">{{ userDetail.username }}</p>
                    <p class=" text-gray-600 text-xs">{{ userDetail.email }}</p>
                  </div>
                </div>
              </div>
              <a-menu-item key="0">
                <div class="flex justify-between items-center">
                  <a href="/mainpage" class="hover:text-current">Manage account</a>
                  <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </div>
              </a-menu-item>
              <hr>
              <a-menu-item key="1">
                <a href="/profile">Profile</a>
              </a-menu-item>
              <a-menu-item key="2">
                <a href="/mainpage">Notification</a>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="4" @click="handleLogout">Log out</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>

    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainNavbar',

});
</script>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import YourWorkModal from '../../mainpage/modal/YourWorkModal/index.vue';
import ProjectModal from '../../mainpage/modal/ProjectModal/index.vue';
import FilterModal from '../../mainpage/modal/FilterModal/index.vue';
import TeamModal from '../../mainpage/modal/TeamModal/index.vue';
import { useGetUserDetailStore } from '../../../stores/projectStores/userStore/user';
import { getAllActivityLogForUser } from '../../../api/activityLog';
import { useRouter } from 'vue-router';
import {useAuthStore} from '../../../stores/authStores/authStore'

const buttons = ["Your Work", "Projects", "Filters", "Teams"];
const activeModal = ref<number | null>(null);
const modalComponents = [YourWorkModal, ProjectModal, FilterModal, TeamModal];
const userDetail = ref<any>(null);
const allActivityLog = ref<any[]>([]);
const router = useRouter();
const authStore = useAuthStore();
function openModal(index: number, event: MouseEvent) {
  activeModal.value = index;
  event.stopPropagation();
  nextTick(() => {
    document.addEventListener("click", handleOutsideClick);
  });
}
function closeModal() {
  activeModal.value = null;
  document.removeEventListener("click", handleOutsideClick);
}

function handleOutsideClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const modals = document.querySelectorAll(".modal");
  const isClickInsideModal = Array.from(modals).some((modal) => modal.contains(target));
  if (!isClickInsideModal) {
    closeModal();
  }
}

async function getDetailUser() {
  const userStore = useGetUserDetailStore();

  await userStore.getDetailUser();
  userDetail.value = {
    id: userStore.id,
    username: userStore.username,
    firstName: userStore.firstName,
    middleName: userStore.middleName,
    lastName: userStore.lastName,
    email: userStore.email,
    phone: userStore.phone,
    dateOfBirth: userStore.dateOfBirth,
    gender: userStore.gender,
    address: userStore.address,
    error: userStore.error,
  };

}

const getAllActivityLog = async () => {
  try {
    const response = await getAllActivityLogForUser();
    allActivityLog.value = response.data;
    
  } catch (error) {
    console.log(error);
  }
};

const handleLogout = () => {
   // Get the router instance
  localStorage.clear(); // Clear all localStorage items
  authStore.logout();
  router.push('/author');
  
  
  
};
onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
  getDetailUser()
  getAllActivityLog()
});

onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
});
</script>
