<template>
  <div 
    class="flex flex-col justify-center items-center group w-[254px] h-[90px] bg-white hover:bg-gray-200 cursor-pointer my-1 border border-b-2 border-b-gray-300 rounded"
  >
    <div class="p-3 w-full h-full">
      <div class="w-full flex flex-col justify-between">
        <div class="flex justify-between relative">
          <div
            class="flex text-sm font-apple text-text-dark-thin ml-1 cursor-pointer"
          >
            <div
              v-if="!showEditTitle"
              class="flex items-center text-sm font-ui text-text-dark-thin mb-1 cursor-pointer"
            >
              <span class="hover:underline">{{ displayTitle }}</span>
              <button
                @click="toggleEditTitle"
                class="hover:bg-gray-300 w-5 h-5 flex items-center justify-center rounded ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <i class="fa-solid fa-pen text-xs mt-1"></i>
              </button>
            </div>
            <div v-else class="relative">
              <input
                v-model="inputTitle"
                type="text"
                class="min-w-[200px] rounded px-2 h-[28px] text-xs placeholder-transparent border-2 border-blue-400 input-field"
                @input="validateTitle"
              />
              <div class="absolute right-0 top-[36px] z-20 ml-1">
                <button
                  @click="confirmTitle"
                  class="h-8 w-8 rounded border bg-white hover:bg-gray-200 mr-1 shadow-lg"
                >
                  <i class="fa-solid fa-check"></i>
                </button>
                <button
                  @click="cancelEditTitle"
                  class="h-8 w-8 rounded border bg-white hover:bg-gray-200 shadow-lg"
                >
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
          </div>
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <i class="fa-solid fa-ellipsis text-xl"></i>
            </a>
            <template #overlay>
              <a-menu @click="handleMenuClick">
                <a-menu-item key="0">
                  <span>Issue detail</span>
                </a-menu-item>
                <hr />
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
        <div class="flex justify-between mt-4">
          <div class="flex items-center cursor-pointer">
            <i class="fa-solid fa-square-check text-blue-400 ml-1"></i>
            <span
              class="text-xs font-medium font-apple text-text-dark ml-2 mb-1"
              >{{ keyText }}</span
            >
          </div>
          <div class="flex items-center">
            <div
              v-if="!showEditNumber"
              @click.prevent="toggleEditNumber"
              class="select-none rounded-full text-xs bg-gray-200 bg-opacity-70 hover:bg-gray-300 w-5 h-5 flex items-center justify-center"
            >
              {{ handleDisplayNumber(displayValue) }}
            </div>
            <div v-else class="relative ml-10 select-none">
              <input
                v-model="inputValue"
                type="number"
                class="w-[80px] border-2 border-blue-400 rounded p-2 h-8 relative text-xs input-field"
                min="0"
                max="5"
                @input="validateInput"
              />
              <div class="absolute left-0 top-[36px] z-20 ml-1">
                <button
                  @click="confirmValue"
                  class="h-8 w-8 rounded border bg-white hover:bg-gray-200 mr-1 shadow-lg"
                >
                  <i class="fa-solid fa-check"></i>
                </button>
                <button
                  @click="cancelEdit"
                  class="h-8 w-8 rounded border bg-white hover:bg-gray-200 shadow-lg"
                >
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
            <a-tooltip class="ml-4 flex items-center" placement="bottom">
            

              <div v-if="props.userId === '1'">
                <a-tooltip placement="bottom">
                  <template #title> Unassigned </template>

                  <button
                    
                    class="w-6 h-6 rounded-full bg-gray-500 mr-2"
                  >
                    <i class="fa-solid fa-user text-white text-sm mr-[1px]"></i>
                  </button>
                </a-tooltip>
              </div>
              <div v-else >
                <a-tooltip placement="bottom">
                  <template #title>
                    {{ props.tooltipTitle }}
                  </template>

                  <div
                    class="w-6 h-6 mt-1 mr-2 flex text-center items-center justify-center bg-[#39a3bf] bg-opacity-90 text-[#1e3d5f] text-opacity-80 font-semibold rounded-full text-sm cursor-pointer"
                  >
                    {{ props.tooltipTitle.charAt(0).toUpperCase() }}
                  </div>
                </a-tooltip>
              </div>
            </a-tooltip>
          </div>
        </div>
      </div>
    </div>
    <taskDetailModal :isVisible="isModalVisible" :onClose="hideModal" :taskId="props.id"></taskDetailModal>
  </div>
  
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  updatePointTask,
  updateTitleTask,
  deleteTask,
} from "../../../api/task";
import { message } from "ant-design-vue";
export default defineComponent({
  name: "ItemTask",
});
</script>

<script setup lang="ts">
import { ref } from "vue";
import taskDetailModal from "../../mainpage/modal/taskDetailModal/index.vue";

const props = defineProps<{
  id: string;
  title: string;
  keyText: string;
  tooltipTitle: string;
  userId: string;
  point: number;
}>();

const emit = defineEmits<{
  (e: "taskDeleted", id: string): void;
}>();
const inputValue = ref(props.point);
const displayValue = ref(props.point);
const inputTitle = ref(props.title);
const displayTitle = ref(props.title);

const showEditNumber = ref(false);
const showEditTitle = ref(false);

const toggleEditNumber = () => (showEditNumber.value = !showEditNumber.value);
const toggleEditTitle = () => (showEditTitle.value = !showEditTitle.value);
const isModalVisible = ref(false);

const showModal = () => {
  isModalVisible.value = true;
};

const hideModal = () => {
  isModalVisible.value = false;
};


async function confirmValue() {
  try {
    let value1 = inputValue.value > 5 ? 5 : inputValue.value;
    await updatePointTask(props.id, value1);
    displayValue.value = value1;
    toggleEditNumber(); // Close the input field
  } catch (error: any) {
    console.log(error.message || error);
  }
}

const handleDisplayNumber = (curValue: number) => {
  if (curValue == null || curValue == 0) {
    return "-";
  } else {
    return curValue;
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
    console.log(error.message || error);
  }
}

const cancelEditTitle = () => {
  toggleEditTitle();
};

const validateTitle = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.value.length > 10) {
    input.value = input.value.slice(0, 10);
  }
};

const validateInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (Number(input.value) > 5) {
    input.value = "5"; // Set to 5 if exceeds
  }
};

const handleMenuClick = async ({ key }: { key: string }) => {
  if (key === "5") {
    console.log("(key)", key);
    console.log("(id)", props.id);
    try {
      await deleteTask(props.id);
      emit("taskDeleted", props.id);
      // message.success("Task deleted successfully!");
    } catch (error: any) {
      message.error("Failed to delete task.");
      console.error(error);
    }
  }

  if(key==="0"){
    showModal();
  }
};
</script>

<style scoped>
@import "index.scss";
</style>
