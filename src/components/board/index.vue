<template>
  <!-- Loading Spinner -->
  <div v-if="isLoading" class="loading-container">
    <!-- <div class="loader"></div> -->
    <a-spin size="large" />
  </div>
  <div v-else>
    <div class="mt-24 px-8 py-0 select-none">
      <div class="min-h-[150px] flex flex-col justify-around">
        <div class="font-ui font-normal text-text-dark mb-2">
          <router-link to="/allproject" class="cursor-pointer hover:underline">Projects </router-link>
          <span class="px-1">/</span>
          <span class="cursor-pointer hover:underline"> {{titleProject}}</span>
        </div>

        <div class="flex justify-between mb-12">
          <span class="font-ui text-2xl font-semibold text-text-dark-thin">BOARD</span>
          <div class="flex items-center">
            <div class="flex space-x-2 text-text-dark-thin mr-2">
              <i
                class="fa-solid fa-bolt bg-white hover:bg-gray-200 rounded w-8 h-8 flex items-center justify-center cursor-pointer transition-colors duration-150"></i>
              <i
                class="fa-regular fa-star bg-white hover:bg-gray-200 rounded w-8 h-8 flex items-center justify-center cursor-pointer transition-colors duration-150"></i>
              <i @click="openModalShare"
                class="fa-solid fa-share-nodes bg-white hover:bg-gray-200 rounded w-8 h-8 flex items-center justify-center cursor-pointer transition-colors duration-150"></i>
              <i
                class="fa-solid fa-up-right-and-down-left-from-center bg-white hover:bg-gray-200 rounded w-8 h-8 flex items-center justify-center cursor-pointer transition-colors duration-150"></i>
            </div>

            <ShareModal :visible="isModalShareVisible" @update:visible="isModalShareVisible = $event" />

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
            <a-button shape="circle" class="w-9 h-9 flex items-center justify-center" style="border: none; padding: 0">
              <img class="w-8 h-8 rounded-full mx-auto cursor-pointer" src="../../assets/img/logo_no_text.png" alt=""
                width="36" height="36" />
            </a-button>

            <button @click="openModal"
              class="select-none bg-gray-100 text-sm rounded-full hover:bg-slate-300  h-9 w-9 flex px-2 items-center justify-center ml-2">
              <i class="fa-solid fa-user-plus text-gray-500 "></i>
            </button>
            <AddPeopleModal :visible="isModalVisible" @update:visible="isModalVisible = $event" class="select-none"/>

            <div class="relative ml-2">
              <button v-if="selectedSprint && selectedSprint.id !== ''" @click.stop="toggleDropdownSprint"
                class="bg-blue-100 bg-opacity-80 text-blue-600 transition-colors duration-300 ease-in-out h-[32px] rounded px-3 mx-1 flex items-center justify-center">
                <div class="flex items-center ">
                  <span class="font-bold mr-1">Sprint </span> =
                  <span class="text-sm ml-1"> {{ selectedSprint.title }}</span>
                  <i class="fa-solid fa-chevron-down ml-2 text-xs"></i>
                </div>
              </button>
              <button v-else @click.stop="toggleDropdownSprint"
                :class="{ 'bg-blue-100 text-blue-600': isDropdownSprint, 'bg-gray-200 bg-opacity-60 hover:bg-gray-300 hover:bg-opacity-80': !isDropdownSprint }"
                class=" transition-colors duration-300 ease-in-out h-[32px] rounded px-3 mx-1 flex items-center justify-center">
                <span class="flex items-center font-apple text-sm text-dark-thin font-medium">
                  Sprint
                  <i class="fa-solid fa-chevron-down ml-2 text-xs"></i>
                </span>
              </button>
              <div v-if="isDropdownSprint" ref="dropdownSprint"
                class="z-30 bg-white absolute w-[200px] left-0 top-[40px] py-2 rounded border shadow-lg border-blur">
                <div v-for="sprint in sprints" :key="sprint.id" class="w-full h-8 flex items-center">
                  <div @click="selectSprint(sprint.id, sprint.title)"
                    class="cursor-pointer hover:bg-gray-200 w-full py-2">
                    <span class="  font-ui text-text-dark-thin text-sm px-4 py-2">{{ sprint.title }}</span>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex w-[70]">
        <div class="flex  gap-6 mt-10 overflow-x-auto">
          <div class="w-[260px] min-h-[180px] bg-gray-100 bg-opacity-70 rounded flex flex-col"
            @drop="onDrop($event, TaskStatus.TODO)" @dragenter.prevent @dragover.prevent>
            <div class="h-12 py-4 flex justify-between items-center group">
              <span
                class="rounded text-xs text-[#626F86] font-semibold font-apple ml-2 pl-3 py-1 hover:bg-gray-200 hover:cursor-pointer flex-grow">
                TO DO
              </span>
              <button
                class="text-sm text-text-dark-thin hover:bg-gray-200 rounded h-9 w-9 flex px-2 mr-2 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <i class="fa-solid fa-ellipsis text-xl"></i>
              </button>
            </div>

            <!-- Container for item-task, positioned right under the header -->
            <div class="mt-0 m-1 flex flex-col items-center min-h-[100px]">
              <item-task v-for="task in data.get(TaskStatus.TODO)" @taskDeleted="handleTaskDeleted"
              :key="task?.id" :id="task?.id" :point="task?.point"
                :userId="task.userResponse.id || ''"
                :title="task?.title" :keyText="task?.keyProjectTask" :tooltip-title="task?.userResponse?.username"
                draggable="true" @dragstart="startDrag($event, task)" />
            </div>
          </div>

          <div class="w-[260px] min-h-[180px] bg-gray-100 bg-opacity-70 rounded flex flex-col"
            @drop="onDrop($event, TaskStatus.IN_PROGRESS)" @dragenter.prevent @dragover.prevent>
            <div class="h-12 py-4 flex justify-between items-center group">
              <span
                class="rounded text-xs text-[#626F86] font-semibold font-apple ml-2 pl-3 py-1 hover:bg-gray-200 hover:cursor-pointer flex-grow">
                IN PROGRESS
              </span>
              <button
                class="text-sm text-text-dark-thin hover:bg-gray-200 rounded h-9 w-9 flex px-2 mr-2 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <i class="fa-solid fa-ellipsis text-xl"></i>
              </button>
            </div>

            <!-- Container for item-task, positioned right under the header -->
            <div class="mt-0 m-1 flex flex-col items-center min-h-[100px]">
              <item-task v-for="task in data.get(TaskStatus.IN_PROGRESS)" @taskDeleted="handleTaskDeleted"
              :key="task?.id" :id="task?.id"
                :point="task?.point" :title="task?.title" :keyText="task?.keyProjectTask"
                :userId="task.userResponse.id || ''"
                :tooltip-title="task?.userResponse?.username" draggable="true" @dragstart="startDrag($event, task)" />
            </div>
          </div>

          <div class="w-[260px] min-h-[180px] bg-gray-100 bg-opacity-70 rounded flex flex-col"
            @drop="onDrop($event, TaskStatus.READY_FOR_TEST)" @dragenter.prevent @dragover.prevent>
            <div class="h-12 py-4 flex justify-between items-center group">
              <span
                class="rounded text-xs text-[#626F86] font-semibold font-apple ml-2 pl-3 py-1 hover:bg-gray-200 hover:cursor-pointer flex-grow">
                READY FOR TEST
              </span>
              <button
                class="text-sm text-text-dark-thin hover:bg-gray-200 rounded h-9 w-9 flex px-2 mr-2 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <i class="fa-solid fa-ellipsis text-xl"></i>
              </button>
            </div>

            <!-- Container for item-task, positioned right under the header -->
            <div class="mt-0 m-1 flex flex-col items-center min-h-[100px]">
              <item-task v-for="task in data.get(TaskStatus.READY_FOR_TEST)" @taskDeleted="handleTaskDeleted"
              :key="task?.id" :id="task?.id"
                :point="task?.point" :title="task?.title" :keyText="task?.keyProjectTask"
                :userId="task.userResponse.id || ''"
                :tooltip-title="task?.userResponse?.username" draggable="true" @dragstart="startDrag($event, task)" />
            </div>
          </div>

          <div class="w-[260px] min-h-[180px] bg-gray-100 bg-opacity-70 rounded flex flex-col"
            @drop="onDrop($event, TaskStatus.DONE)" @dragenter.prevent @dragover.prevent>
            <div class="h-12 py-4 flex justify-between items-center group">
              <span
                class="rounded text-xs text-[#626F86] font-semibold font-apple ml-2 pl-3 py-1 hover:bg-gray-200 hover:cursor-pointer flex-grow">
                DONE
              </span>
              <button
                class="text-sm text-text-dark-thin hover:bg-gray-200 rounded h-9 w-9 flex px-2 mr-2 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <i class="fa-solid fa-ellipsis text-xl"></i>
              </button>
            </div>

            <!-- Container for item-task, positioned right under the header -->
            <div class="mt-0 m-1 flex flex-col items-center min-h-[100px]">
              <item-task v-for="task in data.get(TaskStatus.DONE)" @taskDeleted="handleTaskDeleted"
              :key="task?.id" :id="task?.id" :point="task?.point"
                :title="task?.title" :keyText="task?.keyProjectTask" 
                :tooltip-title="task?.userResponse?.username"
                :userId="task.userResponse.id || ''"
                draggable="true" @dragstart="startDrag($event, task)" />
            </div>
          </div>


          <a-modal title="Start another task" v-model:open="open" @ok="handleOk" @cancel="handleCancel">
            <div class="w-full">
              <div>

              </div>
              <div class="mt-1">
                <span class="text-slate-900 mb-4 text-left w-full">
                  Required fields are marked with an asterisk.
                  <span class="text-red-500">*</span></span>
              </div>
              <div class="mb-2 mt-4">
                <span class="text-slate-900 mb-4 text-left w-full">Task name <span class="text-red-500">*</span></span>
              </div>
              <a-input disabled class="w-[300px]" v-model:value="titleModel" placeholder="Name" />
              <div class="mb-2 mt-4">
                <span class="text-slate-900 mb-4 text-left w-full">Due date task <span
                    class="text-red-500">*</span></span>
              </div>
              <a-date-picker class="mb-4 w-[300px]" v-model:value="valueDate" :disabled-date="disabledDate" />
            </div>
            <template #footer>
              <a-button key="back" @click="handleCancel">Cancel</a-button>
              <a-button key="submit" type="primary" :loading="loadingModel" @click="handleOk">Submit</a-button>
            </template>
          </a-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import ItemTask from "../shared/ItemTask/index.vue";
import {
  fetchAllTask,
  updateStatusTask,
  updateStartDateDueDateTask,
} from "../../api/task";
import { TaskStatus } from "../../utils/constants/enum";
import AddPeopleModal from "../mainpage/modal/addPeopleModal/index.vue";
import { fetchSprintProject } from "../../api/project";
import ShareModal from "../mainpage/modal/shareModal/index.vue";
import { message } from "ant-design-vue";
import dayjs, { Dayjs } from "dayjs";
import {useProjectRoleStore} from '../../stores/projectStores/projectStore';


const projectRoleStore = useProjectRoleStore()
const titleProject = projectRoleStore.title
const isModalVisible = ref(false);
const isModalShareVisible = ref(false);
const searchQuery = ref<string>("");
const titleModel = ref<string>("");
const open = ref<boolean>(false);
const data = ref<Map<string, any[]>>(new Map());
const sprints = ref<any[]>([]);
const isLoading = ref(true);
const isDropdownSprint = ref(false);
const selectedSprint = ref<{ id: string, title: string }>({
  id: "",
  title: "",
});
const updateTask = ref<{
  title: string;
  taskId: string;
  sprintId: string;
  oldStatus: string;
  newStatus: string;
} | null>(null);


const dateFormat = "YYYY-MM-DD";
const loadingModel = ref<boolean>(false);
const valueDate = ref<Dayjs>();
// Hàm xóa truy vấn tìm kiếm
const clearSearch = () => {
  searchQuery.value = "";
};

// Hàm mở modal
const openModal = () => {
  isModalVisible.value = true;
};
function toggleDropdownSprint() {
  isDropdownSprint.value = !isDropdownSprint.value;
}

const selectSprint = (id: string, title: string) => {
  if (id === selectedSprint.value.id) {
    selectedSprint.value = { id: "", title: "" };
    searchAllTask(null);
    isDropdownSprint.value = false;
    return;
  }
  selectedSprint.value = { id, title };
  searchAllTask(id);
  isDropdownSprint.value = false;
};
const openModalShare = () => {
  isModalShareVisible.value = true;
}

// Hàm xử lý kéo nhiệm vụ
const startDrag = (event: DragEvent, task: any) => {
  console.log(task);
  event.dataTransfer!.dropEffect = "move";
  event.dataTransfer!.effectAllowed = "move";
  event.dataTransfer!.setData("taskId", task.id);
  event.dataTransfer!.setData("status", task.status);
  event.dataTransfer!.setData("title", task.title);
  event.dataTransfer!.setData("sprintId", task.sprintDetailResponse.sprintId);
};


// Hàm xử lý thả nhiệm vụ
const onDrop = (event: DragEvent, newStatus: string) => {
  const taskId = event.dataTransfer!.getData("taskId");
  const oldStatus = event.dataTransfer!.getData("status");
  const title = event.dataTransfer!.getData("title");
  const sprintId = event.dataTransfer!.getData("sprintId");

  if (oldStatus === TaskStatus.TODO) {
    if (newStatus != TaskStatus.IN_PROGRESS) {
      console.log("errror");
      message.error("You need to change status from Todo to In progress!");
    } else {
      updateTask.value = { title, taskId, sprintId, oldStatus, newStatus };
      titleModel.value = title;
      open.value = true;
    }
  } else {
    updateStatus(oldStatus, newStatus, taskId);
  }
};
const handleTaskDeleted = (id: string) => {
  data.value.forEach((tasks) => {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
    }
  });
};

function updateStatus(oldStatus: any, newStatus: any , taskId: any) {
  const oldTasks = data.value.get(oldStatus) || [];
  const newTasks = data.value.get(newStatus) || [];

  const taskIndex = oldTasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    try {
      updateStatusTask(taskId, newStatus);
      const [task] = oldTasks.splice(taskIndex, 1); // Xóa nhiệm vụ khỏi trạng thái cũ
      if (task) {
        task.status = newStatus; // Cập nhật trạng thái của nhiệm vụ
        newTasks.push(task); // Thêm nhiệm vụ vào trạng thái mới
        data.value.set(oldStatus, oldTasks); // Cập nhật danh sách trạng thái cũ
        data.value.set(newStatus, newTasks); // Cập nhật danh sách trạng thái mới
      }
    } catch (error) {
      console.error("Failed to update task status", error);
    }
  }
}



const handleOk = async () => {
  loadingModel.value = true;

  try {
    if (valueDate.value) {
      const formattedDate = valueDate.value.format(dateFormat);
      console.log("updateStartDateDueDateTask", updateTask.value);
      console.log("date", formattedDate);

      // Đợi kết quả từ updateStartDateDueDateTask
      const updateResponse = await updateStartDateDueDateTask(
        updateTask.value?.sprintId,
        updateTask.value?.taskId,
        formattedDate
      );

      console.log("updateResponse", updateResponse);

      // Gọi updateStatus sau khi updateStartDateDueDateTask thành công
      updateStatus(
        updateTask.value?.oldStatus,
        updateTask.value?.newStatus,
        updateTask.value?.taskId
      );
    }
  } catch (error) {
    message.error("Update failed " + error);
    console.error("Update failed:", error);
  } finally {
    // Đảm bảo rằng loadingModel luôn được đặt thành false
    loadingModel.value = false;
    open.value = false;
  }
};

const handleCancel = () => {
  open.value = false;
};

async function loadSPrint() {
  isLoading.value = true;
  try {
    const response = await fetchSprintProject();
    const sprintFilter = response.data.filter((sprint) => sprint.status !== "COMPLETE");
    sprints.value = sprintFilter;
  } catch (error) {
    console.error("Failed to fetch sprints", error);
  } finally {
    isLoading.value = false;
  }
}

const disabledDate = (current: Dayjs) => {
  const tomorrow = dayjs().startOf("day").add(2, "day");
  return current && current < tomorrow;
};


async function searchAllTask(searchSprintId: string | null) {
  isLoading.value = true;
  try {
    const response = await fetchAllTask();
    const filteredTasks = response.data.filter(
      (task : any) => task.sprintDetailResponse.sprintId !== null && task.sprintDetailResponse.sprintId != "COMPLETE"
    );
    const map = new Map<string, any[]>();
    filteredTasks.forEach((task:any) => {
      if (task.sprintDetailResponse.sprintId !== "COMPLETE" ) {
        if (searchSprintId && task.sprintDetailResponse.sprintId !== searchSprintId) {
          return;
        }
        if (!map.has(task.status)) {
          map.set(task.status, []);
        }
        map.get(task.status)!.push(task);
      }
    });
    data.value = map;
  } catch (error) {
    console.error("Failed to fetch tasks", error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(async () => {
  isLoading.value = true;
  try {
    loadSPrint();
    await searchAllTask(null);
  } catch (error) {
    console.error("Failed to fetch tasks", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
@import "index.scss";
</style>
