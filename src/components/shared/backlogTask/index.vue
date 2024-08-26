<template>
  <div
    class="w-full min-h-10 flex justify-between bg-white hover:bg-gray-100 group border-x border-t border-gray-300 items-center cursor-pointer hover:border-gray-300">
    <div class="flex ml-4 items-center">
      <div class="w-6 h-6 p-1 flex items-center">
        <input type="checkbox" id="checkbox"
          class="h-3 w-3 border-gray-300 rounded opacity-0 group-hover:opacity-100 transition-opacity">
      </div>

      <div class="flex items-center cursor-pointer ml-1 min-w-24">
        <i class="fa-solid fa-square-check text-blue-400 ml-1"></i>
        <span class="text-xs font-medium font-apple text-text-dark ml-1">
          {{ props.keyProjectTask }}
        </span>
      </div>


      <div v-if="!showEditTitle" class="flex items-center text-sm font-ui text-text-dark-thin ml-4 mb-1 cursor-pointer">
        <span class="hover:underline">{{ displayTitle }}</span>
        <button @click.stop="toggleEditTitle"
          class="hover:bg-gray-300 w-5 h-5 flex items-center justify-center rounded ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <i class="fa-solid fa-pen text-xs mt-1"></i>
        </button>
      </div>
      <div v-else class="relative ml-4" ref="popupEditTitle">
        <input v-model="inputTitle" type="text"
          class="min-w-[300px] rounded px-2 h-[34px] text-xs placeholder-transparent border-2 border-blue-400 input-field"
          @input="validateTitle" />
        <div class="absolute right-0 top-[36px] z-20 ml-1">
          <button @click="confirmTitle" class="h-8 w-8 rounded border bg-white hover:bg-gray-200 mr-1 shadow-lg">
            <i class="fa-solid fa-check"></i>
          </button>
          <button @click="cancelEditTitle" class="h-8 w-8 rounded border bg-white hover:bg-gray-200 shadow-lg">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

    </div>

    <div class="flex justify-between items-center min-w-[350px] text-text-dark-thin relative">
      <button @click.stop="toggleDropdown" :class="buttonClasses"
        class="text-xs font-bold font-ui bg-opacity-50 px-1 rounded">
        <span :class="statusClasses">{{ replaceUnderscores(selectedStatus) }}
          <i class="fa-solid fa-chevron-down ml-1 text-xs w-4"></i></span>
      </button>

      <!-- Dropdown Menu -->
      <div v-if="showDropdown" ref="dropdownMenu"
        class="absolute top-[28px] left-0 mt-1 w-[200px] bg-white border border-gray-300 rounded shadow-lg z-10">
        <div class="my-2 text-[11px] font-semibold font-apple">
          <div @click="selectStatus('TODO')" :class="itemClasses(TaskStatus.TODO)"
            class="h-[28px] flex items-center pl-4 cursor-pointer border-l-4 border-white hover:border-blue-500 hover:bg-gray-200">
            <span class="text-gray-500 font-bold bg-gray-100 px-1 rounded">TODO</span>
          </div>
          <div @click="selectStatus('IN_PROGRESS')" :class="itemClasses(TaskStatus.IN_PROGRESS)"
            class="h-[28px] flex items-center pl-4 cursor-pointer border-l-4 border-white hover:border-blue-500 hover:bg-gray-200">
            <span class="text-blue-500 font-bold bg-blue-100 px-1 rounded">IN PROGRESS</span>
          </div>
          <div v-if="selectedStatus != TaskStatus.TODO" @click="selectStatus('READY_FOR_TEST')"
            :class="itemClasses(TaskStatus.DONE)"
            class="h-[28px] flex items-center pl-4 cursor-pointer border-l-4 border-white hover:border-blue-500 hover:bg-gray-200">
            <span class="text-purple-600 font-bold bg-purple-100 px-1 rounded">READY FOR TEST</span>
          </div>
          <div v-if="selectedStatus != TaskStatus.TODO" @click="selectStatus('DONE')"
            :class="itemClasses(TaskStatus.DONE)"
            class="h-[28px] flex items-center pl-4 cursor-pointer border-l-4 border-white hover:border-blue-500 hover:bg-gray-200">
            <span class="text-green-600 font-bold bg-green-100 px-1 rounded">DONE</span>
          </div>
        </div>
        <div class="border-b border-gray-600 opacity-30 mb-0"></div>
        <button class="hover:bg-gray-200 w-full flex justify-start items-center h-12">
          <span class="font-apple text-text-dark-thin text-sm font-semibold px-3">View workflow</span>
        </button>
      </div>

      <div class="flex items-center justify-between min-w-[150px]">
        <div v-if="!showEditNumber" @click.stop="toggleEditNumber"
          class="select-none rounded-full text-xs bg-gray-200 bg-opacity-70 hover:bg-gray-300 w-5 h-5 flex items-center justify-center">
          {{ handleDisplayNumber(displayValue) }}
        </div>
        <div v-else class="relative ml-10 select-none " ref="popupEditNumber">
          <input v-model="inputValue" type="number"
            class="w-[80px] border-2 border-blue-400 rounded p-2 h-8  relative text-xs input-field" min="0" max="5"
            @input="validateInput" />
          <div class="absolute left-0 top-[36px] z-20 ml-1">
            <button @click="confirmValue" class="h-8 w-8 rounded border bg-white hover:bg-gray-200 mr-1 shadow-lg">
              <i class="fa-solid fa-check"></i>
            </button>
            <button @click="cancelEdit" class="h-8 w-8 rounded border bg-white hover:bg-gray-200 shadow-lg">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        <div class="flex items-center relative mr-2">
          <div v-if="currentUserAssign === '1'">
            <a-tooltip placement="bottom">
              <template #title>
                Unassigned
              </template>


              <button @click.stop="toggleDropdownAssignee" class="w-6 h-6 rounded-full bg-gray-500 mr-4">
                <i class="fa-solid fa-user text-white text-sm mr-[1px]"></i>
              </button>
            </a-tooltip>


          </div>
          <div v-else @click.stop="toggleDropdownAssignee">

            <a-tooltip placement="bottom">
              <template #title>
                {{ username }}
              </template>


              <div
                class="w-6 h-6 mt-1 mr-4 flex text-center items-center justify-center bg-[#39a3bf] bg-opacity-90 text-[#1e3d5f] text-opacity-80 font-semibold rounded-full text-sm cursor-pointer">
                {{ username?.charAt(0).toUpperCase() }}
              </div>
            </a-tooltip>

          </div>
          <!-- Assignee Dropdown Menu -->
          <div v-if="showDropdownAssignee" ref="dropdownMenuAssignee"
            class="absolute top-[28px] right-[50px] mt-1 w-[300px]  bg-white border border-gray-300 rounded shadow-lg z-10">

            <div class="border-2 border-blue-600 rounded h-10 m-2 flex items-center">

              <div class="ml-2">

                <button @click.stop="toggleDropdownAssignee" class="w-7 h-7 rounded-full bg-gray-500 mr-1">
                  <i class="fa-solid fa-user text-white text-sm mr-[1px]"></i>
                </button>
                <span class="font-ui ">
                  Unassigned
                </span>

              </div>
            </div>
            <div>
              <div class="my-2 text-[11px] font-semibold font-apple">
                <div @click="assignUser('1', 'Unassigned')"
                  class="h-[45px] hover:bg-gray-100 transition flex items-center pl-2 border-l-4 border-white hover:border-l-4 hover:border-blue-500">
                  <button class="w-8 h-8 rounded-full bg-gray-500 ">
                    <i class="fa-solid fa-user text-white text-lg "></i>
                  </button>
                  <span class="font-ui ml-2">
                    <span class="text-sm font-medium">Unassigned</span>
                  </span>
                </div>

                <div v-for="user in allUsers" :key="user.id" @click="assignUser(user.id, user.username)"
                  class="h-[45px] hover:bg-gray-100 transition flex items-center pl-2 border-l-4 border-white hover:border-l-4 hover:border-blue-500">
                  <div
                    class="w-8 h-8 p-0 flex text-center items-center justify-center bg-[#39a3bf] bg-opacity-90 text-[#1e3d5f]  font-semibold  rounded-full text-lg cursor-pointer">

                    {{ user.username?.charAt(0).toUpperCase() }}
                  </div>
                  <div class="flex flex-col ml-2 font-ui text-text-dark-thin">
                    <span class="text-sm font-medium">{{ user.username }}</span>
                    <span class="text-xs font-normal">{{ user.email }}</span>
                  </div>
                </div>



              </div>

            </div>
          </div>


          <a-dropdown :trigger="['click']">
            <button
              class="opacity-0 group-hover:bg-gray-200 group-hover:opacity-100 transition-opacity rounded h-8 w-8 ml-4">
              <i class="fa-solid fa-ellipsis text-xl hover:bg-gray-300 w-full h-full rounded pt-1"></i>
            </button>
            <template #overlay>
              <a-menu @click="handleMenuClick">
                <a-menu-item key="0">
                  <span>Issue Detail</span>
                </a-menu-item>
                <hr>
                <a-menu-item key="1">
                  <a href="">Add flag</a>
                </a-menu-item>
                <a-menu-item key="2">
                  <a href="">Add label</a>
                </a-menu-item>
                <a-menu-item key="3">
                  <a href="">Link issue</a>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="5">Delete</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
    </div>
    <taskDetailModal :isVisible="isModalVisible" :onClose="hideModal" :taskId="props.id"></taskDetailModal>


    <a-modal title="Start another task" v-model:open="isOpenModalDrop" @ok="handleOk" @cancel="handleCancel">
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
          <span class="text-slate-900 mb-4 text-left w-full">Due date task <span class="text-red-500">*</span></span>
        </div>
        <a-date-picker class="mb-4 w-[300px]" v-model:value="valueDate" :disabled-date="disabledDate" />
      </div>
      <template #footer>
        <a-button key="back" @click="handleCancel">Cancel</a-button>
        <a-button key="submit" type="primary" :loading="loadingModel" @click="handleOk">Submit</a-button>
      </template>
    </a-modal>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'BacklogTask',

});
</script>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { updateStatusTask, updatePointTask, updateTitleTask ,updateStartDateDueDateTask} from '../../../api/task';
import { SprintStatus, TaskStatus } from '../../../utils/constants/enum';
import { replaceUnderscores } from '../../../utils/normalizeName';
import { fetchAllUserByProjects } from '../../../api/project';
import { message } from 'ant-design-vue';
import { deleteTask } from '../../../api/task';
import { assignTaskForUser } from '../../../api/user';
import taskDetailModal from "../../mainpage/modal/taskDetailModal/index.vue";
import dayjs, { Dayjs } from "dayjs";


// Props definition
const props = defineProps<{
  // key: string;
  id: string;
  title: string;
  point: number;
  status: string;
  sprintId: string | null;
  sprintStatus: string;
  userId: string;
  username: string;
  keyProjectTask: string;
}>();

// watch (() => props.id, (newVal, oldVal) => {
//   inputValue.value = newVal;
//   displayValue.value = newVal;
// });
// Reactive state variables
const showDropdown = ref(false);
const showDropdownAssignee = ref(false);
const selectedStatus = ref(props.status || TaskStatus.TODO);
const showEditTitle = ref(false);
const inputTitle = ref(props.title);
const displayTitle = ref(props.title);
const showEditNumber = ref(false);
const inputValue = ref(props.point);
const displayValue = ref(props.point);
const dropdownMenu = ref<HTMLElement | null>(null);
const dropdownMenuAssignee = ref<HTMLElement | null>(null);
const popupEditNumber = ref<HTMLElement | null>(null);
const popupEditTitle = ref<HTMLElement | null>(null);
const isLoading = ref(false);
const allUsers = ref<any[]>([]);
const username = ref(props.username);
const currentUserAssign = ref(props.userId);
const isOpenModalDrop = ref(false);

const emit = defineEmits<{
  (e: 'statusUpdated', id: string, sprintId: any, status: string): void;
  (e: 'taskDeleted', id: string): void;
  (e: 'taskAssigned', id: string, newAssgin: any): void;
}>();

const titleModel = ref<string>('');
const updateTask = ref<{
  title: string;
  taskId: string;
  sprintId: string|null;
  oldStatus: string;
  newStatus: string;
} | null>(null);
const isModalVisible = ref(false);
const dateFormat = "YYYY-MM-DD";
const loadingModel = ref<boolean>(false);
const valueDate = ref<Dayjs>();
  const disabledDate = (current: Dayjs) => {
  const tomorrow = dayjs().startOf("day").add(2, "day");
  return current && current < tomorrow;
};

const handleCancel = () => {
  isOpenModalDrop.value = false;
};

const handleOk = async () => {
  loadingModel.value = true;

  try {
    if (valueDate.value) {
      const formattedDate = valueDate.value.format(dateFormat);

      await updateStartDateDueDateTask(
        updateTask.value?.sprintId,
        updateTask.value?.taskId,
        formattedDate
      );
      await updateStatusTask(props.id, 'IN_PROGRESS');
      selectedStatus.value = 'IN_PROGRESS';
      showDropdown.value = false;
      emit('statusUpdated', props.id, props.sprintId, 'IN_PROGRESS');

      // Gọi updateStatus sau khi updateStartDateDueDateTask thành công
      // updateStatus(
      //   updateTask.value?.oldStatus,
      //   updateTask.value?.newStatus,
      //   updateTask.value?.taskId
      // );
    }
  } catch (error) {
    message.error("Update failed " + error);
    console.error("Update failed:", error);
  } finally {
    // Đảm bảo rằng loadingModel luôn được đặt thành false
    loadingModel.value = false;
    isOpenModalDrop.value = false;
  }
};

const showModal = () => {
  isModalVisible.value = true;
};

const hideModal = () => {
  isModalVisible.value = false;
};

// Computed classes
const buttonClasses = computed(() => {
  switch (selectedStatus.value) {
    case TaskStatus.IN_PROGRESS:
      return 'bg-blue-100 hover:bg-blue-200';
    case TaskStatus.DONE:
      return 'bg-green-100 hover:bg-green-200';
    case TaskStatus.READY_FOR_TEST:
      return 'bg-purple-100 hover:bg-purple-200';
    default:
      return 'bg-gray-200 hover:bg-gray-300';
  }
});

const statusClasses = computed(() => {
  switch (selectedStatus.value) {
    case TaskStatus.IN_PROGRESS:
      return 'text-blue-500';
    case TaskStatus.DONE:
      return 'text-green-600';
    case TaskStatus.READY_FOR_TEST:
      return 'text-purple-600';
    default:
      return 'text-gray-500';
  }
});

const itemClasses = (status: string) => {
  return computed(() => {
    switch (status) {
      case TaskStatus.IN_PROGRESS:
        return 'hover:bg-gray-100 transition border-l-4 border-white hover:border-l-4 hover:border-blue-500';
      case TaskStatus.DONE:
        return 'hover:bg-gray-100 transition border-l-4 border-white hover:border-l-4 hover:border-green-500';
      case TaskStatus.READY_FOR_TEST:
        return 'hover:bg-gray-100 transition border-l-4 border-white hover:border-l-4 hover:border-green-500';
      default:
        return 'hover:bg-gray-100 transition border-l-4 border-white hover:border-l-4 hover:border-gray-500';
    }
  });
};

const handleDisplayNumber = (curValue: number) => {
  if (curValue == null || curValue == 0) {
    return '-'
  } else {
    return curValue
  }
};

async function assignUser(userId: string, newUsername: string) {
  try {
    const response = await assignTaskForUser(userId, props.id);
    username.value = newUsername;
    currentUserAssign.value = userId;
    emit('taskAssigned', props.id, response.data);

  } catch (error: any) {
    console.error(error);
    message.error('User already assigned to this task.');
  } finally {
    showDropdownAssignee.value = false;
  }
}

const openModalDrop = () => {
  isOpenModalDrop.value = true;
};

async function selectStatus(status: string) {
  if (selectedStatus.value == 'TODO'){
    if(status == 'IN_PROGRESS'){
      updateTask.value = {
        title: props.title,
        taskId: props.id,
        sprintId: props.sprintId,
        oldStatus: selectedStatus.value,
        newStatus: status,
      };
      titleModel.value = props.title;
      openModalDrop();
      return;
    }

  }

  if (props.sprintStatus !== SprintStatus.START) {
    message.error('You can only change status of task in a started sprint.');
    return;

  }
  isLoading.value = true; // Start loading

  try {
    await updateStatusTask(props.id, status);
    selectedStatus.value = status;
    showDropdown.value = false;
    emit('statusUpdated', props.id, props.sprintId, status);
  } catch (error: any) {
    if (error.message) {

    }
  } finally {
    isLoading.value = false; // Stop loading
  }
}

const toggleDropdown = () => showDropdown.value = !showDropdown.value;
const toggleDropdownAssignee = () => showDropdownAssignee.value = !showDropdownAssignee.value;
const toggleEditNumber = () => showEditNumber.value = !showEditNumber.value;
const toggleEditTitle = () => showEditTitle.value = !showEditTitle.value;

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownMenu.value && !dropdownMenu.value.contains(event.target as Node)) {
    showDropdown.value = false;
  }
  if (dropdownMenuAssignee.value && !dropdownMenuAssignee.value.contains(event.target as Node)) {
    showDropdownAssignee.value = false;
  }
  if (popupEditNumber.value && !popupEditNumber.value.contains(event.target as Node)) {
    showEditNumber.value = false;
  }
  if (popupEditTitle.value && !popupEditTitle.value.contains(event.target as Node)) {
    showEditTitle.value = false;
  }
};


async function confirmValue() {
  try {
    let value1 = inputValue.value > 5 ? 5 : inputValue.value;
    await updatePointTask(props.id, value1);
    displayValue.value = value1;
    toggleEditNumber(); // Close the input field
  } catch (error: any) {
    if (error.message) {
      console.log(error.message);
    }
  }

};


const cancelEdit = () => {
  toggleEditNumber(); // Close the input field without saving changes
};

async function confirmTitle() {
  try {

    if (inputTitle.value.length > 0) {
      await updateTitleTask(props.id, inputTitle.value);
      displayTitle.value = inputTitle.value;
    }
    toggleEditTitle();
  } catch (error: any) {
    if (error.message) {
      console.log(error.message);
    }
  } finally {

  }

};

const cancelEditTitle = () => {
  toggleEditTitle();
};

const validateTitle = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.value.length > 30) {
    input.value = input.value.slice(0, 30);
  }
};

const validateInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (Number(input.value) > 5) {
    input.value = '5'; // Set to 5 if exceeds
  }
};
const handleMenuClick = async ({ key }: { key: string }) => {
  if (key === '5') {

    try {
      await deleteTask(props.id)
      emit('taskDeleted', props.id);
      // message.success('Task deleted successfully!');

    } catch (error: any) {
      message.error('Failed to delete task.');
      console.error(error);
    }
  }

  if (key === '0') {
    showModal();
  }
}

async function loadUserInfo() {

  try {
    const response = await fetchAllUserByProjects();
    allUsers.value = response.data;

  } catch (error: any) {
    console.error(error);
  }
}

onMounted(() => {
  loadUserInfo();
});
// Lifecycle hook
onMounted(() => {
  document.addEventListener('click', handleClickOutside);

});
</script>

<style scoped>
@import 'index.scss'
</style>
