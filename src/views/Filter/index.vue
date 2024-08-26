<template>

    <div class="">
        <div class="mt-20 ml-8 px-8 py-0 ">
            <div class=" flex flex-col justify-around">

                <div class="flex justify-between ">
                    <span class="font-ui text-2xl font-semibold text-text-dark-thin">Issues</span>

                    <div class="flex items-center">
                        <div class="flex space-x-2 text-text-dark-thin mr-2">
                            <i
                                class="fa-solid fa-bolt bg-white hover:bg-gray-200 rounded w-8 h-8 flex items-center justify-center cursor-pointer transition-colors duration-150"></i>
                            <i
                                class="fa-regular fa-star bg-white hover:bg-gray-200 rounded w-8 h-8 flex items-center justify-center cursor-pointer transition-colors duration-150"></i>
                            <i
                                class="fa-solid fa-share-nodes bg-white hover:bg-gray-200 rounded w-8 h-8 flex items-center justify-center cursor-pointer transition-colors duration-150"></i>
                            <i
                                class="fa-solid fa-up-right-and-down-left-from-center bg-white hover:bg-gray-200 rounded w-8 h-8 flex items-center justify-center cursor-pointer transition-colors duration-150"></i>
                        </div>

                        <button
                            class="bg-gray-100 font-medium font-apple text-sm text-text-dark-thin hover:bg-gray-200 px-4 py-2 rounded h-9 flex items-center">
                            Complete sprint
                        </button>

                        <button
                            class="bg-gray-100 text-sm text-text-dark-thin hover:bg-gray-200 rounded h-9 w-9 flex px-2 items-center justify-center ml-2">
                            <i class="fa-solid fa-ellipsis text-xl"></i>
                        </button>
                    </div>
                </div>

                <div class="flex mt-4 items-center">
                    <div class="relative inline-block mr-2">
                        <input type="text" v-model="searchQuery" placeholder="Search issues" @keydown.enter="setSearch"
                            class="font-apple placeholder:font-light placeholder:text-gray-700 custom-input w-[224px] h-[32px] border border-gray-600 rounded py-2 pl-2 pr-10 text-text-dark hover:border-blue-600" />
                        <i v-if="searchQuery" @click="clearSearch"
                            class="fa-solid fa-x absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"></i>
                        <i v-else
                            class="fa-solid fa-magnifying-glass absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"></i>
                    </div>
                    <div class="font-apple text-sm text-text-dark-thin font-semibold flex">
                        <!-- <div class="relative">

                            <button v-if="selectedProject && selectedProject.id !== ''"
                                @click.stop="toggleDropdownProject"
                                class="bg-blue-100 bg-opacity-80 text-blue-600 transition-colors duration-300 ease-in-out h-[32px] rounded px-3 mx-1 flex items-center justify-center">
                                <div class="flex items-center ">
                                    <span class="font-bold">Project = </span>
                                    <span class="text-sm ml-1"> {{ selectedProject.title }}</span>
                                    <i class="fa-solid fa-chevron-down ml-2 text-xs"></i>
                                </div>
                            </button>

                            <button v-else @click.stop="toggleDropdownProject"
                                class="bg-gray-200 bg-opacity-60 hover:bg-gray-300 hover:bg-opacity-80 transition-colors duration-300 ease-in-out h-[32px] rounded px-3 mx-1 flex items-center justify-center">
                                <span class="flex items-center ">
                                    Project
                                    <i class="fa-solid fa-chevron-down ml-2 text-xs"></i>
                                </span>
                            </button>
                            <div v-if="isDowndropProject" ref="dropdownProject"
                                class="z-30 bg-white absolute w-[300px] left-0 top-[40px] rounded border border-blur">
                                <div v-for="project in projects" :key=project.id>
                                    <div @click="selectProject({ id: project.id, title: project.title })"
                                        class="h-[32px] flex items-center pl-4 my-1 cursor-pointer border-l-[3px] border-white hover:border-blue-500 hover:bg-gray-200 hover:bg-opacity-60">
                                        <img src="../../assets/img/project_logo.svg" alt="project" class="w-4 h-4 mt-1">
                                        <span class="font-apple text-sm text-text-dark-thin font-normal ml-2">{{
                                            project.title }}</span>
                                    </div>
                                </div>
                            </div>
                        </div> -->

                        <div class="relative">
                            <button v-if="selectedType && selectedType.trim() !== ''" @click.stop="toggleDropdownType"
                                class="bg-blue-100 bg-opacity-80 text-blue-600 transition-colors duration-300 ease-in-out h-[32px] rounded px-3 mx-1 flex items-center justify-center">
                                <div class="flex items-center ">
                                    <span class="font-bold">Type = </span>
                                    <span class="text-sm ml-1"> {{ selectedType }}</span>
                                    <i class="fa-solid fa-chevron-down ml-2 text-xs"></i>
                                </div>
                            </button>
                            <button v-else @click.stop="toggleDropdownType"
                                :class="{ 'bg-blue-100 text-blue-600': isDropdownType, 'bg-gray-200 bg-opacity-60 hover:bg-gray-300 hover:bg-opacity-80': !isDropdownType }"
                                class=" transition-colors duration-300 ease-in-out h-[32px] rounded px-3 mx-1 flex items-center justify-center">
                                <span class="flex items-center ">
                                    Type
                                    <i class="fa-solid fa-chevron-down ml-2 text-xs"></i>
                                </span>
                            </button>
                            <div v-if="isDropdownType" ref="dropdownType"
                                class="z-30 bg-white absolute w-[300px] left-0 top-[40px] rounded border shadow-lg border-blur">

                                <div class="my-2 text-[11px] font-semibold font-apple">
                                    <div @click="selectType('Story')"
                                        class="h-[32px] flex items-center pl-4 cursor-pointer border-l-[3px] border-white hover:border-blue-500 hover:bg-gray-200 hover:bg-opacity-60">
                                        <div
                                            class="bg-green-500 w-4 h-4 rounded flex items-center justify-center p-0 mr-2">
                                            <i class="fa-solid fa-bookmark text-white text-[8px]"></i>
                                        </div>
                                        <span class="font-apple text-sm text-text-dark-thin font-normal">Story</span>
                                    </div>
                                    <div @click="selectType('Bug')"
                                        class="h-[32px] flex items-center pl-4 cursor-pointer border-l-[3px] border-white hover:border-blue-500 hover:bg-gray-200 hover:bg-opacity-60">
                                        <div
                                            class="bg-red-500 w-4 h-4 rounded flex items-center justify-center p-0 mr-2">
                                            <i class="fa-solid fa-circle text-white mt-[2px] text-[7px]"></i>
                                        </div>
                                        <span class="font-apple text-sm text-text-dark-thin font-normal">Bug</span>

                                    </div>
                                    <div @click="selectType('Task')"
                                        class="h-[32px] flex items-center pl-4 cursor-pointer border-l-[3px] border-white hover:border-blue-500 hover:bg-gray-200 hover:bg-opacity-60">
                                        <div class="w-4 h-4 p-0 flex items-center justify-center mr-2">
                                            <i class="fa-solid fa-square-check text-blue-400 text-base"></i>
                                        </div>
                                        <span class="font-apple text-sm text-text-dark-thin font-normal">Task</span>
                                    </div>

                                </div>
                            </div>
                        </div>


                        <div class="relative">
                            <button v-if="selectedStatus && selectedStatus.trim() !== ''"
                                @click.stop="toggleDropdownStatus"
                                class="bg-blue-100 bg-opacity-80 text-blue-600 transition-colors duration-300 ease-in-out h-[32px] rounded px-3 mx-1 flex items-center justify-center">
                                <div class="flex items-center ">
                                    <span class="font-bold">Status = </span>
                                    <span class="text-sm ml-1"> {{ selectedStatus }}</span>
                                    <i class="fa-solid fa-chevron-down ml-2 text-xs"></i>
                                </div>
                            </button>
                            <button v-else @click.stop="toggleDropdownStatus"
                                :class="{ 'bg-blue-100 text-blue-600': isDropdownStatus, 'bg-gray-200 bg-opacity-60 hover:bg-gray-300 hover:bg-opacity-80': !isDropdownStatus }"
                                class=" transition-colors duration-300 ease-in-out h-[32px] rounded px-3 mx-1 flex items-center justify-center">
                                <span class="flex items-center ">
                                    Status
                                    <i class="fa-solid fa-chevron-down ml-2 text-xs"></i>
                                </span>
                            </button>
                            <div v-if="isDropdownStatus" ref="dropdownStatus"
                                class="z-30 bg-white absolute w-[300px] left-0 top-[40px] rounded border shadow-lg border-blur">
                                <div class="my-2 text-[11px] font-semibold font-apple">
                                    <div @click="selectStatus('TODO')"
                                        class="h-[28px] flex items-center pl-4 cursor-pointer border-l-[3px] border-white hover:border-blue-500 hover:bg-gray-200 hover:bg-opacity-60">

                                        <span class="text-gray-500 font-bold bg-gray-100 px-1 rounded">TODO</span>
                                    </div>
                                    <div @click="selectStatus('IN_PROGRESS')"
                                        class="h-[28px] flex items-center pl-4 cursor-pointer border-l-[3px] border-white hover:border-blue-500 hover:bg-gray-200 hover:bg-opacity-60">

                                        <span class="text-blue-500 font-bold bg-blue-100 px-1 rounded">IN
                                            PROGRESS</span>
                                    </div>
                                    <div @click="selectStatus('READY_FOR_TEST')"
                                        class="h-[28px] flex items-center pl-4 cursor-pointer border-l-[3px] border-white hover:border-blue-500 hover:bg-gray-200 hover:bg-opacity-60">
                                        <span class="text-purple-600 font-bold bg-purple-100 px-1 rounded">READY FOR
                                            TEST</span>
                                    </div>
                                    <div @click="selectStatus('DONE')"
                                        class="h-[28px] flex items-center pl-4 cursor-pointer border-l-[3px] border-white hover:border-blue-500 hover:bg-gray-200 hover:bg-opacity-70">
                                        <span class="text-green-600 font-bold bg-green-100 px-1 rounded">DONE</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="relative">
                            <button v-if="selectedUser && selectedUser.id !== ''" @click.stop="toggleDropdownAssignee"
                                class="bg-blue-100 bg-opacity-80 text-blue-600 transition-colors duration-300 ease-in-out h-[32px] rounded px-3 mx-1 flex items-center justify-center">
                                <div class="flex items-center ">
                                    <span class="font-bold">Assignee = </span>
                                    <span class="text-sm ml-1"> {{ selectedUser.fullname }}</span>
                                    <i class="fa-solid fa-chevron-down ml-2 text-xs"></i>
                                </div>
                            </button>
                            <button v-else @click.stop="toggleDropdownAssignee"
                                :class="{ 'bg-blue-100 text-blue-600': isDropdownAssignee, 'bg-gray-200 bg-opacity-60 hover:bg-gray-300 hover:bg-opacity-80': !isDropdownAssignee }"
                                class=" transition-colors duration-300 ease-in-out h-[32px] rounded px-3 mx-1 flex items-center justify-center">
                                <span class="flex items-center ">
                                    Assignee
                                    <i class="fa-solid fa-chevron-down ml-2 text-xs"></i>
                                </span>
                            </button>
                            <div v-if="isDropdownAssignee" ref="dropdownAssignee"
                                class="z-30 bg-white absolute w-[300px] left-0 top-[40px] rounded border shadow-lg border-blur">
                                <div class="my-2 text-[11px] font-semibold font-apple">
                                    <div>
                                        <div @click="selectUser({ id: userDetail.id, fullname: userDetail.userName })"
                                            class="h-[32px] flex items-center pl-4 my-1 cursor-pointer border-l-[3px] border-white hover:border-blue-500 hover:bg-gray-200 hover:bg-opacity-60">
                                            <div
                                                class="rounded-full w-6 h-6 flex items-center justify-center text-base bg-[#39a3bf]  font-medium ">
                                                {{ userDetail.userName.charAt(0).toUpperCase() }}
                                            </div>
                                            <span class="text-sm font-ui font-normal ml-2">Current user</span>

                                        </div>
                                        <div @click="selectUser({ id: '1', fullname: 'Unassigned' })"
                                            class="h-[32px] flex items-center pl-4 my-1 cursor-pointer border-l-[3px] border-white hover:border-blue-500 hover:bg-gray-200 hover:bg-opacity-60">
                                            <div
                                                class="rounded-full w-6 h-6 flex items-center justify-center bg-gray-400  font-medium mt-1">
                                                <i class="fa-solid fa-user text-white text-base"></i>
                                            </div>
                                            <span class="text-sm font-ui font-normal ml-2">Unassigned</span>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="isLoading" class="loading-container ">
                    <!-- <div class="loader"></div> -->
                    <a-spin size="large" class="mb-[400px]" />
                </div>
                <div v-else>
                    <div class="mt-6 flex ">
                        <div class="w-[274px] h-[450px] bg-gray-200 bg-opacity-70 rounded p-[2px]">
                            <div class="font-apple text-sm text-text-dark-thin font-medium flex justify-between">
                                <button
                                    class=" hover:bg-gray-300 hover:bg-opacity-70 transition-colors duration-300 ease-in-out h-[32px] rounded px-3 mx-1 flex items-center justify-center">
                                    <span class="flex items-center">
                                        Created
                                        <i class="fa-solid fa-chevron-down ml-2 text-xs"></i>
                                    </span>
                                </button>

                                <div class="flex">
                                    <div v-if="!isSort">
                                        <button @click="revertSort"
                                            class="hover:bg-gray-300 hover:bg-opacity-70 transition-colors duration-300 ease-in-out h-[32px] rounded px-3  flex items-center justify-center">
                                            <i class="fa-solid fa-arrow-down-wide-short mt-1 text-sm "></i>
                                        </button>
                                    </div>
                                    <div class="" v-else>
                                        <button @click="revertSort"
                                            class="hover:bg-gray-300 hover:bg-opacity-70 transition-colors duration-300 ease-in-out h-[32px] rounded px-3  flex items-center justify-center">
                                            <i class="fa-solid fa-arrow-up-short-wide mt-1 text-sm"></i>
                                        </button>
                                    </div>
                                    <button @click="resetData"
                                        class="hover:bg-gray-300 hover:bg-opacity-70 transition-colors duration-300 ease-in-out h-[32px] rounded px-3  flex items-center justify-center">
                                        <i class="fa-solid fa-arrows-rotate mt-1 text-sm"></i>
                                    </button>
                                </div>

                            </div>
                            <div class="my-1 w-full h-full overflow-y-auto">
                                <div v-if="_.size(tasks) == 0">
                                    <div class="w-full h-full flex flex-col items-center justify-center mt-20">
                                        <img src="../../assets/img/search-no-results.svg" alt="" class="w-[160px] mb-2">
                                        <span
                                            class="w-[200px] text-sm font-apple text-text-dark-thin flex items-center justify-center text-center">
                                            No issues were found matching your search
                                        </span>
                                    </div>
                                </div>
                                <div v-else>
                                    <div v-for="task in tasks" :key="task?.id" class="last:border-b ">
                                        <item-task :id="task?.id" :point="task?.point" :title="task?.title"
                                            @click="selectTask(task.id)" :curSelectedTaskId="selectedTaskId"
                                            :username="task?.userResponse?.username" :keyText="task?.keyProjectTask"
                                            :tooltip-title="task?.userResponse?.lastName" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex-1 ">

                            <task :taskId="selectedTaskId" @updateTitle="handleTitleUpdate" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import task from "../../components/taskDetail/index.vue";
import { filterTask } from '../../api/task';
import { fetchAllProjects, fetchAllUserByProjects } from '../../api/project';
import itemTask from "../../components/shared/searchTask/index.vue";
import { useGetUserDetailStore } from '../../stores/projectStores/userStore/user';
import { getAllTypeProject } from '../../api/taskType';
import _ from 'lodash';

const searchQuery = ref<string>("");
const isLoading = ref(false);
const tasks = ref<any[]>([]);
const projects = ref<any[]>([]);
const users = ref<any[]>([]);
const isDowndropProject = ref(false);
const isDropdownType = ref(false);
const isDropdownStatus = ref(false);
const isDropdownAssignee = ref(false);
const taskIdReady = ref(false);
const isSort = ref(false);
const selectedTaskId = ref<string>("");
const selectedUser = ref<{ id: string; fullname: string }>({
    id: '',
    fullname: '',
});
const selectedStatus = ref<string>("");
const selectedType = ref<string>("");
// const selectedProject = ref<{ id: string; title: string }>({
//     id: '',
//     title: ''
// });
const typeProjects = ref<any[]>([]);
const userDetailStore = useGetUserDetailStore();
const userDetail = ref<any>(null);



const dropdownType = ref<HTMLElement | null>(null);
const dropdownStatus = ref<HTMLElement | null>(null);
const dropdownAssignee = ref<HTMLElement | null>(null);
const dropdownProject = ref<HTMLElement | null>(null);
const searchValue = ref<string>("");
const idUserQuery = ref<string>("");

const clearSearch = () => {
    searchQuery.value = "";
};

watch(searchQuery, async (newValue) => {

    if (newValue === '') {
        searchValue.value = '';
        await fetchAllIssues();
    }
});

function closeAllDropdowns() {
    isDropdownType.value = false;
    isDropdownStatus.value = false;
    isDropdownAssignee.value = false;
    isDowndropProject.value = false;
}

// function toggleDropdownProject() {
//     if (!isDowndropProject.value) {
//         closeAllDropdowns();
//     }
//     isDowndropProject.value = !isDowndropProject.value;
// }

function toggleDropdownType() {
    if (!isDropdownType.value) {
        closeAllDropdowns();
    }
    isDropdownType.value = !isDropdownType.value;
}

function toggleDropdownStatus() {
    if (!isDropdownStatus.value) {
        closeAllDropdowns();
    }
    isDropdownStatus.value = !isDropdownStatus.value;
}

function handleTitleUpdate(payload: { taskId: string, newTitle: string }) {
    // resetData()
    tasks.value = tasks.value.map((task) => {
        if (task.id === payload.taskId) {
            task.title = payload.newTitle;
        }
        return task;
    });
}

function toggleDropdownAssignee() {
    if (!isDropdownAssignee.value) {
        closeAllDropdowns();
    }
    isDropdownAssignee.value = !isDropdownAssignee.value;
}
// function selectProject(project: { id: string; title: string }) {
//     if (selectedProject.value.id == project.id) {
//         selectedProject.value = { id: '', title: '' };
//         isDowndropProject.value = false;
//         return;
//     }
//     selectedProject.value = project;
//     isDowndropProject.value = false;
// }
async function selectStatus(status: string) {
    if (selectedStatus.value == status) {
        selectedStatus.value = "";
        isDropdownStatus.value = false;
        await fetchAllIssues();
        return;
    }
    selectedStatus.value = status;
    await fetchAllIssues();
    isDropdownStatus.value = false;
}
function selectType(type: string) {
    if (selectedType.value == type) {
        selectedType.value = "";
        isDropdownType.value = false;
        return;
    }
    selectedType.value = type;
    isDropdownType.value = false;
}
async function selectUser(user: { id: string; fullname: string }) {
    if (selectedUser.value.id == user.id) {
        selectedUser.value.id = '';
        selectedUser.value.fullname = '';
        isDropdownAssignee.value = false;
        idUserQuery.value = '';
        await fetchAllIssues();
        return;
    }
    idUserQuery.value = user.id;
    selectedUser.value = user;
    isDropdownAssignee.value = false;
    await fetchAllIssues();
}

function selectTask(taskId: string) {
    selectedTaskId.value = taskId;

}
const handleClickOutside = (event: MouseEvent) => {
    if (dropdownType.value && !dropdownType.value.contains(event.target as Node)) {
        isDropdownType.value = false;

    }
    if (dropdownStatus.value && !dropdownStatus.value.contains(event.target as Node)) {
        isDropdownStatus.value = false;
    }
    if (dropdownAssignee.value && !dropdownAssignee.value.contains(event.target as Node)) {
        isDropdownAssignee.value = false;
    }
    if (dropdownProject.value && !dropdownProject.value.contains(event.target as Node)) {
        isDowndropProject.value = false;
    }
};

const setSearch = async () => {
    searchValue.value = searchQuery.value;
    await fetchAllIssues();
};
async function fetchAllUser() {
    const usersResponse = await fetchAllUserByProjects();
    users.value = usersResponse.data;

}
async function fetchProjectData() {
    const projectsResponse = await fetchAllProjects();
    projects.value = projectsResponse.data;
}
async function fetchAllIssues() {
    isLoading.value = true;
    try {
        const tasksResponse = await filterTask({ search: searchValue.value, status: selectedStatus.value,assignee: idUserQuery.value });
        tasks.value = tasksResponse.data;
        if (_.size(tasks.value) > 0) {
            selectTask(tasks.value[0]?.id);
        }
    } catch (error) {
        console.error("Failed to fetch project", error);
    } finally {
        isLoading.value = false;
    }
}
async function fetchAllTypeProject() {
    const typeProjectResponse = await getAllTypeProject();

    typeProjects.value = typeProjectResponse.data.map(project => {
        // Chuyển đổi image URL của mỗi project
        const fileIdMatch = project.image.match(/\/d\/(.*?)\//);
        if (fileIdMatch && fileIdMatch[1]) {
            const fileId = fileIdMatch[1];
            project.image = `https://drive.google.com/uc?export=view&id=${fileId}`;
        }
        return project;
    });

    console.log(typeProjects.value[0].image, 'typeProjects');
}

async function resetData() {
    isLoading.value = true;

    // Create a function that returns a promise that resolves after a delay
    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    try {
        // Start the data fetching and delay promises
        const fetchPromises = [
            fetchAllUser(),
            fetchAllIssues(),
            fetchProjectData(),
            fetchAllTypeProject(),
        ];

        // Track start time
        const startTime = Date.now();

        // Wait for the data fetching to complete
        await Promise.all(fetchPromises);

        // Calculate elapsed time
        const elapsedTime = Date.now() - startTime;


        // If the elapsed time is less than 500ms, add a delay
        if (elapsedTime < 500) {
            await delay(500 - elapsedTime);
        }
    } catch (error) {
        console.error("Failed to fetch project", error);
    } finally {
        isLoading.value = false;
    }
}
function revertSort() {
    tasks.value = tasks.value.reverse();
    isSort.value = !isSort.value;
}


onMounted(async () => {
    isLoading.value = true;
    try {
        await fetchAllUser();
        await fetchAllIssues();
        await fetchProjectData();
        await fetchAllTypeProject();
        if (tasks.value.length > 0) {
            selectedTaskId.value = tasks.value[0]?.id;

            await nextTick();
            taskIdReady.value = true;
        }
        userDetail.value = {
            id: userDetailStore.id,
            userName: userDetailStore.username,
        }

    }
    catch (error) {
        console.error("Failed to fetch project", error);
    } finally {
        isLoading.value = false;
    }

});
onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});

</script>


<style scoped>
@import "index.scss";
</style>