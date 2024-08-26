<template>
    <div :class="{ 'w-8': props.isCollapsed, 'w-64': !props.isCollapsed }"
        class="z-20 fixed top-0 left-0 h-full bg-white border-r-4 border-gray-200 transition-all duration-300 flex flex-col">

        <!-- Sidebar content -->
        <button @click="$emit('toggleSidebar')"
            class="absolute right-[-25px] top-[100px] -translate-y-1/2 p-3 flex items-center justify-center">
            <span v-if="!props.isCollapsed"
                class="inline-flex items-center justify-center w-6 h-6 bg-white text-black border-2 border-gray-200 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300">
                <i class="fa-solid fa-chevron-left text-xs"></i>
            </span>
            <span v-else
                class="inline-flex items-center justify-center w-6 h-6 bg-white text-black border-2 border-gray-200 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300">
                <i class="fa-solid fa-chevron-right text-xs"></i>
            </span>
        </button>

        <div v-if="!isCollapsed" class="mt-20 flex flex-col items-start pl-4 flex-1">
            <!-- section1 -->
          
            <div class="flex px-4 py-2 h-[52px] bg-white items-center mr-8 mb-4">
                <img src="../../../assets/img/project_logo.svg" class="h-6 w-6">
                <span class="flex flex-col ml-4 items-start">
                    <span class="text-sm font-ui font-semibold text-text-dark-thin min-w-[120px]">
                        {{ titleProject }}</span>
                    <span class="text-xs text-[#626F86] font-ui">Software project</span>
                </span>
            </div>

            <!-- section2 -->
            <div class="w-full">
                <router-link to="/mainpage"
                    class="flex items-center px-4 py-1 hover:bg-blue-100 hover:bg-opacity-80 rounded-lg cursor-pointer mb-1 mr-2">
                    <div class="w-6 flex items-center justify-center">
                        <i class="fa-solid fa-arrow-left-long text-xl text-[#46546f]"></i>
                    </div>
                    <span class="ml-4 text-text-dark">Issue Type</span>

                </router-link>
                <hr>

                <div  class="w-full text-sm font-ui">
                    <router-link to="/issueType/bug"
                        class="flex items-center px-4 py-1 hover:bg-blue-100 hover:bg-opacity-80 rounded-lg cursor-pointer mb-1 mr-2">
                        <div class="bg-red-500 w-6 h-6 rounded-lg flex items-center justify-center mt-2">
                            <i class="fa-regular fa-circle text-white text-base"></i>
                        </div>
                        <span class="ml-4 text-text-dark">Bug</span>
                    </router-link>
                    <router-link to="/issueType/story"
                        class="flex items-center px-4 py-1 hover:bg-blue-100 hover:bg-opacity-80 rounded-lg cursor-pointer mb-1 mr-2">
                        <div class="w-6 h-6 bg-green-500 flex items-center justify-center rounded-md">
                            <i class="fas fa-bookmark text-white"></i>
                        </div>
                        <span class="ml-4 text-text-dark">Story</span>
                    </router-link>
                    <router-link to="/issueType/task"
                        class="flex items-center px-4 py-1 hover:bg-blue-100 hover:bg-opacity-80 rounded-lg cursor-pointer mb-1 mr-2">
                        <div class="w-6 h-6 bg-blue-400 flex items-center justify-center rounded-md">
                            <i class="fa-solid fa-check"></i>
                        </div>
                        <span class="ml-4 text-text-dark">Task</span>
                    </router-link>

                    
                    
                    
                    
                </div>

                <div
                    class="flex items-center px-4 py-1 hover:bg-blue-100 hover:bg-opacity-80 rounded-lg cursor-pointer mb-1 mr-2 mt-2">
                    <div class="w-6 flex items-center justify-center">
                        <i class="fa-solid fa-plus text-xl text-[#46546f]"></i>
                    </div>
                    <span class="ml-4 text-text-dark text-sm font-ui min-w-[150px]">Add Issue Type</span>
                </div>

                <button @click="toggleDevelopment"
                    class="w-full text-left px-2 py-2 text-gray-700 hover:bg-transparent flex items-center relative group">
                    <!-- Icon for expanded state -->
                    <i v-if="isDevelopmentVisible"
                        class="fa-solid fa-angle-down text-xs text-gray-500 absolute left-[-4px] top-1/2 transform -translate-y-1/2 opacity-100 transition-opacity"></i>
                    <!-- Icon for collapsed state -->
                    <i v-else
                        class="fa-solid fa-chevron-right text-xs text-gray-500 absolute left-[-4px] top-1/2 transform -translate-y-1/2 opacity-100 transition-opacity"></i>
                    <span class="text-xs font-[500] text-text-dark font-ui ml-2">DEVELOPMENT</span>
                </button>

                <div v-show="isDevelopmentVisible" class="w-full text-sm font-ui">
                    <div
                        class="flex items-center px-4 py-1 hover:bg-blue-100 hover:bg-opacity-80 rounded-lg cursor-pointer mb-1 mr-2">
                        <div class="w-6 flex items-center justify-center">
                            <i class="fa-solid fa-code text-lg text-[#46546f]"></i>
                        </div>
                        <span class="ml-4 text-text-dark">Code</span>
                    </div>
                </div>

                <div class="border-b border-gray-600 opacity-30 mb-0"></div>

                <div clas="w-full text-sm font-ui mt-1">
                    <router-link to="/projects/settings/access"
                        class=" flex items-center px-4 py-1 hover:bg-blue-100 hover:bg-opacity-80 rounded-lg cursor-pointer  mr-2 mt-2">
                        <div class="w-6 flex items-center justify-center">
                            <i class="fa-regular fa-file-lines text-2xl text-[#46546f] "></i>
                        </div>
                        <span class="ml-4 text-text-dark text-sm font-ui min-w-[150px]">Project pages</span>
                    </router-link>

                    <router-link to="/projects/settings/detail"
                        class="flex items-center px-4 py-1 hover:bg-blue-100 hover:bg-opacity-80 rounded-lg cursor-pointer mb-1 mr-2 ">
                        <div class="w-6 flex items-center justify-center">
                            <i class="fa-solid fa-gear text-xl text-[#46546f] "></i>
                        </div>
                        <span class="ml-4 text-text-dark text-sm font-ui min-w-[150px]">Project settings</span>

                    </router-link>

                </div>
            </div>

            <!-- section3 -->
            <div class="mt-auto p-4 text-center text-text-dark">
                <p class="font-ui text-xs min-w-[180px]">You're in a team-managed project</p>
                <p class="text-xs font-semibold cursor-pointer hover:underline">Learn more</p>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    name: 'Sidebar',

});
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { useProjectRoleStore} from '../../../stores/projectStores/projectStore';


const props = defineProps<{
  isCollapsed: boolean;
  currentRoute : string;
}>();

const projectRoleStore = useProjectRoleStore()
const titleProject = projectRoleStore.title

const isDevelopmentVisible = ref(true);



function toggleDevelopment() {
    isDevelopmentVisible.value = !isDevelopmentVisible.value;
}


</script>
