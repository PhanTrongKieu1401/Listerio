<template>
    <div>
        <div v-if="isLoading" class="loading-container">
            <!-- <div class="loader"></div> -->
            <a-spin size="large" />
        </div>
        <div v-else>
            <div class="mt-24 px-8 py-0 select-none">
                <div class="min-h-[130px] flex flex-col justify-around ">
                    <div class="font-ui font-normal text-text-dark mb-2">
                        <span class="cursor-pointer hover:underline">Projects </span>
                        <span class="px-1">/</span>
                        <span class="cursor-pointer hover:underline"> {{titleProject}}</span>
                    </div>

                    <div class="flex justify-between mb-8">
                        <span class="font-ui text-2xl font-semibold text-text-dark-thin">Backlog</span>
                        <div class="flex items-center">
                            <div class="flex space-x-2 text-text-dark-thin mr-2">

                                <i
                                    class="fa-solid fa-share-nodes bg-white hover:bg-gray-200 rounded w-8 h-8 flex items-center justify-center cursor-pointer transition-colors duration-150"></i>
                                <i
                                    class="fa-solid fa-up-right-and-down-left-from-center bg-white hover:bg-gray-200 rounded w-8 h-8 flex items-center justify-center cursor-pointer transition-colors duration-150"></i>
                            </div>



                            <button
                                class="bg-gray-100 text-sm text-text-dark-thin hover:bg-gray-200 rounded h-9 w-9 flex px-2 items-center justify-center ml-1">
                                <i class="fa-solid fa-ellipsis text-xl"></i>
                            </button>
                        </div>
                    </div>

                    <div class="flex mb-0">
                        <div class="relative inline-block mr-6">
                            <input type="text" v-model="searchQuery" placeholder="Search"
                                class="custom-input w-[224px] min-h-[36px] border border-gray-500 rounded py-2 font-light pl-2 pr-10 placeholder-gray-400 hover:border-blue-600" />
                            <i v-if="searchQuery" @click="clearSearch"
                                class="fa-solid fa-x absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"></i>
                            <i v-else
                                class="fa-solid fa-magnifying-glass absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"></i>
                        </div>

                        <div class="flex items-center mr-6">
                            <a-button shape="circle" class="w-9 h-9 flex items-center justify-center -mr-2"
                                style="border: none; padding: 0">
                                <img class="w-8 h-8 rounded-full mx-auto"
                                    src="https://secure.gravatar.com/avatar/b135b1cb057c7e8230e8d0d5a3eba119?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FLH-4.png"
                                    alt="" width="36" height="36" />
                            </a-button>
                            <a-button shape="circle" class="w-9 h-9 flex items-center justify-center"
                                style="border: none; padding: 0">
                                <img class="w-8 h-8 rounded-full mx-auto cursor-pointer"
                                    src="../../assets/img/logo_no_text.png" alt="" width="36" height="36" />
                            </a-button>


                            <button @click="openModal"
                                class="bg-gray-100 text-sm rounded-full  hover:bg-slate-300 h-9 w-9 flex px-2 items-center justify-center ml-2">
                                <i class="fa-solid fa-user-plus text-gray-500"></i>
                            </button>
                            <AddPeopleModal :visible="isModalVisible" @update:visible="isModalVisible = $event" />

                        </div>
                    </div>
                </div>
                <div class="h-[480px] overflow-y-auto mt-4">
                    <div v-for="sprint in sprints " :key="sprint.id"
                        class="flex flex-col my-6 bg-gray-100 bg-opacity-70 cursor-pointer rounded">
                        <div class=" rounded flex flex-col mt-4 ">
                            <div class="flex justify-between font-apple text-text-dark-thin text-sm">
                                <div class="font-semibold flex items-center">
                                    <div class="w-5 h-5 p-1 flex items-center ml-4">
                                        <input type="checkbox" id="checkbox" class="h-3 w-3  border-gray-300 rounded ">
                                    </div>
                                    <button @click="toggleSprint(sprint.id)">
                                        <i v-if="!isSprintNotVisible[sprint.id]"
                                            class="fa-solid fa-chevron-down ml-1 text-xs mr-2"></i>
                                        <i v-else class="fa-solid fa-chevron-right ml-1 text-xs mr-2"></i>
                                    </button>
                                    <span>{{ sprint.title }}</span>
                                    <span class="font-apple text-xs text-[#626F86] font-normal ml-2">
                                        ( {{ countTasksForSprint(sprint.id) }}
                                        issues)
                                    </span>
                                </div>
                                <div class="flex">
                                    <button v-if="sprint.status === SprintStatus.TODO"
                                        class="h-8 font-medium bg-gray-200 bg-opacity-70 hover:bg-gray-300  rounded mr-2">
                                        <startSprintModal @sprintStarted="handleSprintUpdated" :sprintId="sprint.id"
                                            :sprintStartDate="sprint.startDate" :sprintEndDate="sprint.endDate"
                                            :countIssue="countTasksForSprint(sprint.id)" :sprintName="sprint.title" />
                                    </button>
                                    <button v-else-if="sprint.status === SprintStatus.START"
                                        class="h-8 font-medium bg-gray-200 bg-opacity-70 hover:bg-gray-300  rounded mr-2">
                                        <completeSprintModal :doneIssue="countTasksForSprint(sprint.id)"
                                            :countIssue="countIssueForSprint(sprint.id)"
                                            :onCompleteSprint="() => completeSprint(sprint.id)" :sprintId="sprint.id" />

                                    </button>
                                    <button @click.stop="toggleSprintDropdown(sprint.id)"
                                        class="bg-gray-200 bg-opacity-70 hover:bg-gray-300 transition-opacity rounded h-8 w-8  mr-2 relative ">
                                        <i class="fa-solid fa-ellipsis text-xl z-50  pt-1"></i>
                                        <div v-if="activeDropdown === sprint.id" ref="dropdownSprint" @click.stop
                                            class="ml-[-90px] mt-2  bg-white border border-gray-200 rounded shadow-lg  w-[120px] min-h-[40px]">

                                            <button
                                                class="h-[40px] w-full flex items-center justify-start hover:bg-gray-200 relative ">
                                                <deleteSprintModal @sprintDeleted="handleSprintDeleted"
                                                    :sprintId="sprint.id" :sprintName="sprint.title" />

                                            </button>
                                            <div
                                                class="h-[40px] w-full flex items-center justify-start hover:bg-gray-200 relative ">
                                                <updateSprintModal @updateSprintInfo="handleSprintUpdated"
                                                    :sprintId="sprint.id" :sprintStartDate="sprint.startDate"
                                                    :sprintEndDate="sprint.endDate" :sprintName="sprint.title" />
                                            </div>

                                        </div>

                                    </button>
                                </div>
                            </div>

                        </div>

                        <div v-show="!isSprintNotVisible[sprint.id]" class="m-2 ">
                            <div @drop="onDrop($event, sprint.id)" @dragenter.prevent @dragover.prevent>

                                <div class="last:border-b last:border-gray-300"
                                    @dragenter="handleDragEnter($event, index, sprint.id)"
                                  
                                    v-for="(task, index) in getTasksForSprint(sprint.id)" :key="task.id">
                                    <div v-if="dragIndex[sprint.id] === index" class="h-[2px] bg-blue-500"></div>

                                    <BacklogTask :id="task.id" :username="task.userResponse.username"
                                        @task-deleted="handleTaskDeleted" :title="task.title || ''"
                                        :status="task.status || ''" :point="task.point || 0"
                                        :userId="task.userResponse.id || ''" :keyProjectTask="task.keyProjectTask || ''"
                                        :sprintStatus = "sprint.status"
                                        @taskAssigned="handleTaskAssigned" :sprintId="sprint.id || ''" draggable="true"
                                        @statusUpdated="handleStatusUpdated" @dragstart="startDrag($event, task)" 
                                        @dragend="resetDragIndex"/>
                                </div>
                                


                                <div v-if="countTasksForSprint(sprint.id) == 0" @dragenter="handleDragEnter($event,0,sprint)">
                                    <div
                                        class="w-full min-h-12 border-2 border-dashed border-gray-300 rounded flex justify-center items-center">

                                        <span class="text-xs text-gray-500 ">Plant a sprint by dragging issues
                                            here</span>

                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>


                    <div class="flex flex-col  cursor-pointer rounded mt-2">
                        <div class=" rounded flex flex-col mt-4">
                            <div class="flex justify-between font-apple text-text-dark-thin text-sm">
                                <div class="font-semibold flex items-center">
                                    <div class="w-5 h-5 p-1 flex items-center ml-4">
                                        <input type="checkbox" id="checkbox" class="h-3 w-3  border-gray-300 rounded ">
                                    </div>
                                    <button @click="toggleBacklog">
                                        <i v-if="isBacklogVisible"
                                            class="fa-solid fa-chevron-down ml-1 text-xs mr-2"></i>
                                        <i v-else class="fa-solid fa-chevron-right ml-1 text-xs mr-2"></i>
                                    </button>
                                    <span>Backlog</span>
                                    <span class="font-apple text-xs text-[#626F86] font-normal ml-2">
                                        ( {{ countTasksForSprint(null) }}
                                        issues)</span>
                                </div>
                                <div class="flex">
                                    <button @click="createSprint"
                                        class="h-8 font-medium bg-gray-200 bg-opacity-70 hover:bg-gray-300 px-3 rounded mr-2">
                                        Create sprint
                                    </button>

                                </div>
                            </div>
                        </div>

                        <div v-show="isBacklogVisible" class="mt-2 mx-2">

                            <div class="min-h-[30px] pb-1" @drop="onDrop($event, null)" @dragover.prevent>

                                <div class="last:border-b last:border-gray-300"
                                    v-for="(task, index) in getTaskBacklog()" :key="task.id"
                                    @dragenter="handleDragEnter($event, index, null)" @dragenter.prevent
                                    
                                   >

                                    <div v-if="dragIndex[-1] === index" class="h-[2px] bg-blue-500 "></div>
                                    <BacklogTask :id="task.id" :status="task.status || ''" :title="task.title || ''"
                                        :point="task.point || 0" :sprintId="'' || null" @taskDeleted="handleTaskDeleted"
                                        :userId="task.userResponse.id" :username="task.userResponse.username"
                                        :keyProjectTask="task.keyProjectTask || ''" draggable="true"
                                        :sprintStatus="''"
                                        @task-assigned="handleTaskAssigned" @statusUpdated="handleStatusUpdated"
                                        @dragstart="startDrag($event, task)"  @dragend="resetDragIndex"/>
                                    
                                        
                                </div>
                                <div 
                                    v-if="dragIndex[-1] === getTaskBacklog().length" 
                                    class="h-[20px] bg-blue-500" 
                                    @dragenter="handleDragEnter($event, getTaskBacklog().length, null)" 
                                    @dragenter.prevent 
                                    >
                                    </div>

                                <div v-if="countTasksForSprint(null) == 0">
                                    <div
                                        class="w-full min-h-12 border-2 border-dashed border-gray-300 rounded flex justify-center items-center">
                                        <span class="text-xs text-gray-500 ">Plant a sprint by dragging issues
                                            here</span>
                                    </div>
                                </div>
                            </div>

                            <button v-if="!isCreateTask" @click.stop="toggleTask(true)"
                                class="w-full h-10 hover:bg-gray-200 py-1 mb-3 rounded text-sm font-apple text-text-dark-thin flex items-center justify-start">
                                <div>
                                    <i class="fa-solid fa-plus font-semibold p-2"></i>
                                    <span class="ml font-medium">Create issue</span>
                                </div>
                            </button>

                            <div v-else ref="taskDiv"
                                class="w-full min-h-10 flex justify-between items-center cursor-pointer border-2 border-blue-500">
                                <div class="flex ml-4 items-center w-full">
                                    <div class="w-6 h-6 p-1 flex items-center">

                                    </div>
                                    <div
                                        class="flex items-center cursor-pointer ml-1 min-w-10 py-1 rounded hover:bg-gray-200">
                                        <i class="fa-solid fa-square-check text-blue-400 ml-1 "></i>
                                        <i class="fa-solid fa-chevron-down text-xs ml-2 "></i>
                                    </div>
                                    <input type="text" placeholder="What needs to be done?" v-model="inputCreateTask"
                                        @keydown.enter="handleEnterKey"
                                        class="flex-grow ml-4 p-1 border-none font-ui  text-text-dark-thin input-create-task placeholder:font-ui">
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            

        </div>
    </div>

    <!-- <div class="min-h-10"></div> -->

</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import BacklogTask from '../shared/backlogTask/index.vue';
import { Sprint, fetchSprintProject } from '../../api/project';
import { createNewSprint, changeStartToCompleteSprint } from '../../api/sprint';
import { fetchAllTask, Task, createNewTask } from '../../api/task';
import { updateSprintTask } from '../../api/task';
import { SprintStatus, sortSprints } from '../../utils/constants/enum';
import completeSprintModal from '../mainpage/modal/completeSprintModal/index.vue';
import startSprintModal from '../mainpage/modal/startSprintModal/index.vue';
import updateSprintModal from '../mainpage/modal/updateSprintModal/index.vue';
import deleteSprintModal from '../mainpage/modal/deleteSprintModal/index.vue';
import AddPeopleModal from '../mainpage/modal/addPeopleModal/index.vue';
import {useProjectRoleStore} from '../../stores/projectStores/projectStore';
// import { cloneDeep } from 'lodash';

// interface BacklogTask {
//     id: string;
//     title: string;
//     point: number;
//     keyProjectTask: string;
//     userId: string;
//     sprintId: string;
// }
const projectRoleStore = useProjectRoleStore()
const titleProject = projectRoleStore.title
const isSprintNotVisible = ref<Record<string, boolean>>({});
const isCreateTask = ref(false);
const activeDropdown = ref<string | null>(null);
const isBacklogVisible = ref(true);
const searchQuery = ref<string>("");
const isLoading = ref(true);
const isModalVisible = ref(false);
const inputCreateTask = ref("");
const isDraggingOver = ref(false);
// const statusSprintSearch = ref<string>("");
const sprints = ref<Sprint[]>([]);
// const allUser = ref<any[]>([]);
const data = ref<Map<string | null, any[]>>(new Map());
const dragIndex = ref<Record<any, number>>({});
const dropdownSprint = ref<HTMLElement | null>(null);
const taskDiv = ref<HTMLElement | null>(null);
// const userProjectStore = useUserProjectStore();
const hoverIndex = ref(-1);



const toggleTask = (state: boolean) => {
    isCreateTask.value = state;
};



function toggleSprint(sprintId: string) {
    isSprintNotVisible.value[sprintId] = !isSprintNotVisible.value[sprintId];
}

function toggleBacklog() {
    isBacklogVisible.value = !isBacklogVisible.value;
}

const clearSearch = () => {
    searchQuery.value = "";
};

const getTasksForSprint = (sprintId: string) => {
    return data.value.get(sprintId) || [];
};
const getTaskBacklog = () => {
    return data.value.get(null) || [];
};
// hàm mở model
const openModal = () => {
    isModalVisible.value = true;
};

// Functions

function startDrag(event: DragEvent, task: any) {
    console.log(task);
    event.dataTransfer!.dropEffect = "move";
    event.dataTransfer!.effectAllowed = "move";
    event.dataTransfer!.setData("taskId", task.id);
    event.dataTransfer!.setData("sprint", task.sprintDetailResponse.sprintId);
}
const handleDragEnter = (event: DragEvent, taskIndex: number, sprintId: any) => {
    event.preventDefault();
    dragIndex.value = {};
    dragIndex.value[sprintId] = taskIndex;
    
};

// const handleTailDragEnter = (event: DragEvent, sprintId: any) => {
//     event.preventDefault();
//     dragIndex.value = {};
//     dragIndex.value[sprintId] = -1;
// };

// const handleDragOver = (sprintId: any) => {
//     // dragIndex.value[sprintId] = -1;
// };
async function onDrop(event: DragEvent, newSprint: any) {

    hoverIndex.value = -1;
    isDraggingOver.value = false;
    const taskId = event.dataTransfer!.getData("taskId");
    const oldSprint = event.dataTransfer!.getData("sprint");

    const oldTasks =
        oldSprint != "null"
            ? data.value.get(oldSprint) || []
            : data.value.get(null) || [];
    const newTasks = data.value.get(newSprint) || [];
    console.log("old sprint:", oldTasks);
    console.log("new sprint:", newTasks);

    const taskIndex = oldTasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
        const [task] = oldTasks.splice(taskIndex, 1);

        // If the task is dropped into the same sprint
        if (oldSprint === newSprint ) {
            // Determine the insert index within the same sprint
            const insertIndex = dragIndex.value[newSprint] !== undefined && dragIndex.value[newSprint] !== null
                ? dragIndex.value[newSprint]
                : newTasks.length;

            // If the insertIndex is after the original task index, decrement it to adjust for the removed task
            const adjustedIndex = insertIndex > taskIndex ? (insertIndex - 1) : insertIndex;

            // Insert the task at the adjusted index
            newTasks.splice(adjustedIndex, 0, task);

            // Update the new tasks array for the sprint
            data.value.set(newSprint, newTasks);

        } else {
            // Handle moving task to a different sprint
            task.sprintDetailResponse.sprintId = newSprint;

            const insertIndex = dragIndex.value[newSprint] !== undefined && dragIndex.value[newSprint] !== null
                ? dragIndex.value[newSprint]
                : newTasks.length;

            // Insert the task into the new sprint at the specified index
            newTasks.splice(insertIndex, 0, task);

            // Update the tasks arrays for both sprints
            data.value.set(newSprint, newTasks);
            data.value.set(oldSprint, oldTasks);

            // Update the task's sprint on the backend
            await updateSprintTask(taskId, newSprint);
        }
    }
    resetDragIndex()
}

function resetDragIndex() {
    setTimeout(() => {
        dragIndex.value = {};
    }, 50);
}
async function createNewBacklogTask(title: string) {
    try {

        const response = await createNewTask(title);

        const newTask = response.data;
        newTask.sprintDetailResponse.sprintId = null;
        const tasks = data.value.get(null) || [];
        tasks.push(newTask);
        data.value.set(null, tasks);

    } catch (error) {
        console.error("Failed to create new task", error);
    }
}

const handleEnterKey = () => {
    if (inputCreateTask.value.trim()) {
        createNewBacklogTask(inputCreateTask.value);
        inputCreateTask.value = "";
    }
    isCreateTask.value = false;
};


async function createSprint() {
    try {
        const createSprintResponse = await createNewSprint();
        const newSprint = createSprintResponse.data;
        sprints.value.push(newSprint);
        data.value.set(newSprint.id, []);


    } catch (error) {
        console.error("Failed to create new sprint", error);
    }
}

const handleClickOutside = (event: MouseEvent) => {
    if (taskDiv.value && !taskDiv.value.contains(event.target as Node)) {
        isCreateTask.value = false;
    }
    if (dropdownSprint.value && !dropdownSprint.value.contains(event.target as Node)) {
        activeDropdown.value = null;
    }
 
};

// async function loadAllUserProject() {
//     try {
//         await userProjectStore.loadUserProjects();
//         allUser.value = userProjectStore.userProjects;
//         console.log("all user:", allUser.value);
//     } catch (error) {
//         console.error("Failed to load user projects", error);
//     }
// }

function toggleSprintDropdown(id: string) {

    if (activeDropdown.value === id) {
        activeDropdown.value = null;
    } else {
        activeDropdown.value = id;
    }
    // activeDropdown.value != id;
}

function countTasksForSprint(sprintId: string | null) {
    return (data.value.get(sprintId) || []).length;
}

function countIssueForSprint(sprintId: string | null) {
    const tasks = data.value.get(sprintId) || [];
    return {
        done: computed(() => tasks.filter(task => task.status === "DONE").length),
        notDone: computed(() => tasks.filter(task => task.status !== "DONE").length)
    };
}

const handleSprintUpdated = (sprintId: string ) => {
    toggleSprintDropdown(sprintId);
    fetchAllData();
};

const handleSprintDeleted = async (deletedSprintId: string) => {

    const allSprintTasks = data.value.get(deletedSprintId) || []
    const sprint = sprints.value.find(sprint => sprint.id === deletedSprintId);

    if (!sprint) {
        return;
    }

    isLoading.value = true;
    try {
        const allBacklogTasks = data.value.get(null) || [];

        const updatePromises = allSprintTasks.map(async (task) => {

            await updateSprintTask(task.id, null);
            const taskIndex = allSprintTasks.findIndex(t => t.id === task.id);
            if (taskIndex !== -1) {
                allSprintTasks.splice(taskIndex, 1);
            }
            task.status = "TODO";

            task.sprintDetailResponse.sprintId = null;
            allBacklogTasks.push(task);
        });

        await Promise.all(updatePromises);

        // Cập nhật data.value với các nhiệm vụ mới
        data.value.set(null, allBacklogTasks);
        data.value.delete(deletedSprintId);
        sprints.value = sprints.value.filter(s => s.id !== deletedSprintId);


    } catch (error) {
        console.error("Failed to complete sprint", error);
    } finally {
        isLoading.value = false;
        toggleSprintDropdown(sprint.id);
    }

};

async function handleTaskAssigned(taskId: String, newAssgin: any) {

    data.value.forEach((tasks) => {
        const taskIndex = tasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
            tasks[taskIndex].userResponse = newAssgin;
            console.log("tasks[taskIndex]", tasks[taskIndex]);

        }
    });

    // fetchAllData();
}

async function completeSprint(sprintId: string) {
    const tasks = data.value.get(sprintId) || []
    const notDoneTasks = tasks.filter(task => task.status !== "DONE");
    const sprint = sprints.value.find(sprint => sprint.id === sprintId);
    if (!sprint) {
        return;
    }

    isLoading.value = true;
    try {
        const allBacklogTasks = data.value.get(null) || [];

        const updatePromises = notDoneTasks.map(async (task) => {
            await updateSprintTask(task.id, null);

            const taskIndex = tasks.findIndex(t => t.id === task.id);
            if (taskIndex !== -1) {
                tasks.splice(taskIndex, 1);
            }

            allBacklogTasks.push(task);
        });
        updatePromises.push(
            (async () => {
                await changeStartToCompleteSprint(sprintId);
            })()
        );
        await Promise.all(updatePromises);

        // Cập nhật data.value với các nhiệm vụ mới
        data.value.set(null, allBacklogTasks);
        data.value.set(sprintId, tasks);
        sprints.value = sprints.value.filter(s => s.id !== sprintId);

    } catch (error) {
        console.error("Failed to complete sprint", error);
    } finally {
        isLoading.value = false;
    }

}

function handleTaskDeleted(id: string) {
    data.value.forEach((tasks) => {
        const taskIndex = tasks.findIndex((task) => task.id === id);
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
        }
    });
}

function handleStatusUpdated(id: string, sprintId: string, status: string) {
    const tasks = data.value.get(sprintId) || [];
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.status = status;
    }
    data.value.set(sprintId, tasks);
}

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
});

async function fetchAllData() {
    isLoading.value = true;
    try {
        //loadAllUserProject();
        const tasksResponse = await fetchAllTask();
        console.log("(tasksResponse)", tasksResponse);
        const map = new Map<string, Task[]>();
        tasksResponse.data.forEach((task: any) => {
            if (!map.has(task.sprintDetailResponse.sprintId)) {
                map.set(task.sprintDetailResponse.sprintId, []);
            }
            map.get(task.sprintDetailResponse.sprintId)!.push(task);
        });

        data.value = map;
        console.log("data", data.value);

        const sprintResponse = await fetchSprintProject();
        const filteredSprints = (sprintResponse.data as Sprint[]).filter(sprint => sprint.status !== SprintStatus.COMPLETE);
        const sortedSprints = sortSprints(filteredSprints);
        sprints.value = sortedSprints;
        sprints.value.forEach((sprint) => {
            dragIndex.value[sprint.id] = -1;
        });
    } catch (error) {
        console.error("Failed to fetch tasks", error);
    } finally {
        isLoading.value = false;
    }
}

onMounted(async () => {
    fetchAllData();

});


</script>

<style scoped>
@import "index.scss";
</style>
