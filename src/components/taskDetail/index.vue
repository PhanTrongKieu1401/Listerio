<template>
  <div class="mt-0 px-10 py-0 ml-10">
    <div v-if="isLoading" class="loading-container">
      <!-- <div class="loader"></div> -->
      <a-spin size="large" class="mb-[400px]" />
    </div>
    <div v-else class="mt-2">
      <!-- <div class="w-full flex justify-end font-apple text-sm text-text-dark-thin">{{ props.currentTaskIndex }} of {{ props.totalTasks }}</div> -->
      <div class="flex mt-2">
        <div class="mr-10 w-[60%]">
          <div class="pr-10 h-[500px] w-full overflow-y-auto">
            <div class="">
              <div class="font-ui text-gray-400 flex items-center hover:cursor-pointer relative">
                <div @click="toggleDropdownLabel"
                  class="w-6 h-6 hover:bg-gray-200 rounded flex items-center justify-center mt-1">
                  <!-- <i class="fa-solid fa-square-check text-blue-400 "></i> -->
                  <div v-html="iconContent" class="ml-2"></div>
                </div>
                <div v-if="isDropdownLabel" ref="dropdownLabel"
                  class="z-30 bg-white absolute w-[150px] left-0 top-[40px] rounded border shadow-lg border-blur">
                  <div class="my-2 text-[11px] font-semibold font-apple">
                    <div @click="handleChangeType('STORY')"
                      class="h-[32px] flex items-center pl-4 cursor-pointer border-l-[3px] border-white hover:border-blue-500 hover:bg-gray-200 hover:bg-opacity-60">
                      <div class="bg-green-500 w-4 h-4 rounded flex items-center justify-center p-0 mr-2">
                        <i class="fa-solid fa-bookmark text-white text-[8px]"></i>
                      </div>
                      <span class="font-apple text-sm text-text-dark-thin font-normal">Story</span>
                    </div>
                    <div @click="handleChangeType('BUG')"
                      class="h-[32px] flex items-center pl-4 cursor-pointer border-l-[3px] border-white hover:border-blue-500 hover:bg-gray-200 hover:bg-opacity-60">
                      <div class="bg-red-500 w-4 h-4 rounded flex items-center justify-center p-0 mr-2">
                        <i class="fa-solid fa-circle text-white mt-[2px] text-[7px]"></i>
                      </div>
                      <span class="font-apple text-sm text-text-dark-thin font-normal">Bug</span>
                    </div>
                    <div @click="handleChangeType('TASK')"
                      class="h-[32px] flex items-center pl-4 cursor-pointer border-l-[3px] border-white hover:border-blue-500 hover:bg-gray-200 hover:bg-opacity-60">
                      <div class="w-4 h-4 p-0 flex items-center justify-center mr-2">
                        <i class="fa-solid fa-square-check text-blue-400 text-base"></i>
                      </div>
                      <span class="font-apple text-sm text-text-dark-thin font-normal">Task</span>
                    </div>
                  </div>
                </div>
                <span class="text-sm text-text-dark ml-1 hover:underline">{{
                  task.keyProjectTask
                }}</span>
              </div>

              <div v-if="!isDropdownTitle" @click.stop="toggleDropdownTitle"
                class="font-apple text-text-dark-thin text-2xl font-semibold p-2 my-2 cursor-text hover:bg-gray-200">
                <span>{{ task.title }}</span>
              </div>
              <div v-else class="relative my-2 h-10 select-none w-full" ref="dropdownTitle">
                <input type="text" @input="validateTitle" v-model="inputTitle" 
                  class="w-full border-2 h-full border-blue-400 rounded p-2 relative font-apple text-text-dark-thin text-2xl font-medium input-field" />
                <div class="absolute right-0 top-[45px] z-20 ml-1">
                  <button @click="confirmTitle"
                    class="h-8 w-8 rounded border bg-white hover:bg-gray-200 mr-1 shadow-lg">
                    <i class="fa-solid fa-check"></i>
                  </button>
                  <button @click="cancelEditTitle" class="h-8 w-8 rounded border bg-white hover:bg-gray-200 shadow-lg">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="mt-2">
              <div class="mb-2">
                <span class="text-text-dark-thin text-base font-ui font-medium">Description</span>
              </div>

              <div style="scroll-margin-bottom: 75pt">
                <div style="margin-bottom: 24px">
                  <div style="margin-bottom: 24px">
                    <div style="margin-bottom: 24px">
                      <button v-if="!isEditing" @click="isEditing = true">
                        <span class="font-apple text-text-dark text-sm">{{
                          value_des ? value_des : "Add Description..."
                        }}</span>
                      </button>
                      <div v-else>
                        <a-textarea v-model:value="value_des" placeholder="Add Description..." allow-clear show-count
                          :maxlength="100" />
                        <div class="mt-2">
                          <button @click="saveEdit"
                            class="bg-blue-600 hover:bg-blue-700 h-8 font-apple text-sm rounded text-white px-3 font-semibold">
                            Save
                          </button>
                          <button @click="isEditing = false"
                            class="hover:bg-gray-200 h-8 font-apple text-sm rounded text-text-dark-thin px-3 font-semibold ml-2">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="block">
              <div class="mb-2">
                <span class="text-text-dark-thin text-base font-ui font-medium">Activity</span>
              </div>
              <div class="flex flex-col h-[90px]" @keydown="handleKeydown">
                <div class="flex items-center w-full">
                  <div
                    class="w-8 h-8 mt-1 flex text-center items-center justify-center bg-[#39a3bf] bg-opacity-90 text-[#1e3d5f] text-opacity-80 font-semibold rounded-full cursor-pointer">
                    {{ userName?.charAt(0).toUpperCase() }}
                  </div>

                  <div class="flex-1 w-full ml-6 flex flex-col">
                    <input ref="commentInput" type="text"
                      class="w-full border border-gray-400 rounded h-10 px-4 font-ui" placeholder="Add a comment..."
                      @keydown.enter="handleEnter" />
                  </div>
                </div>
                <div class="ml-16 font-ui text-text-dark text-xs mt-2">
                  <span class="font-bold">Pro tip:</span>
                  press <span class="font-bold">M</span> to comment
                </div>
              </div>
              <div>
                <div v-for="comment in allComment" :key="comment.id" class="flex flex-col min-h-[80px] mt-2">
                  <div class="flex">
                    <div
                      class="w-8 h-8 flex text-center items-center justify-center bg-[#39a3bf] bg-opacity-90 text-[#1e3d5f] text-opacity-80 font-semibold rounded-full cursor-pointer">
                      {{ comment.username.charAt(0).toUpperCase() }}
                    </div>
                    <div class="ml-4 flex flex-col flex-1">
                      <div class="">
                        <span class="font-ui text-text-dark text-sm font-semibold">{{ comment.username }}</span>
                        <span class="font-ui text-sm text-text-dark ml-4">{{
                          formatDate(comment.createdAt)
                        }}</span>
                        <span v-if="comment.createdAt !== comment.lastUpdatedAt"
                          class="font-ui text-sm text-text-dark ml-4 mb-2 font-medium">Edited</span>
                      </div>

                      <div v-if="isOpenEditMap[comment.id] === false" clas="flex">
                        <span class="font-apple text-text-dark-thin text-sm mt-1 flex">{{ comment.text }}</span>
                        <div v-if="isReplyComment[comment.id]" class="my-4">
                          <div class="flex">
                            <div
                              class="w-6 h-6 flex text-center items-center justify-center bg-[#39a3bf] bg-opacity-90 text-[#1e3d5f] text-sm text-opacity-80 font-semibold rounded-full cursor-pointer">
                              {{ userName?.charAt(0).toUpperCase() }}
                            </div>
                            <input v-model="replyText" type="text" @keydown.enter="handleReplyComment(comment.id)"
                              class="rounded border border-gray-400 flex-1 ml-3 px-4 h-8" />
                          </div>
                          <div class="mx-1 my-3 font-apple text-sm h-8 font-medium ml-10">
                            <button @click="handleReplyComment(comment.id)"
                              class="text-white bg-blue-600 hover:bg-blue-800 h-full rounded px-3">
                              Save
                            </button>
                            <button @click="toggleReplyComment(comment.id)"
                              class="text-text-dark h-full ml-2 hover:bg-gray-200 px-3 rounded">
                              Cancel
                            </button>
                          </div>
                        </div>
                        <div v-else class="flex mt-2">
                          <div>
                            <div v-if="comment.userId === userId">
                              <span @click="toggleEditComment(comment.id)"
                                class="mr-2 font-apple text-text-dark-thin text-sm font-semibold cursor-pointer hover:underline">
                                Edit
                              </span>

                              <deleteCommentModal :commentId="comment.id" :deleteComment="deleteCommentById"
                                class="mr-3" />
                            </div>
                          </div>

                          <div class="">
                            <div v-if="!isReplyComment[comment.id]">
                              <span @click="toggleReplyComment(comment.id)"
                                class="font-apple text-text-dark-thin text-sm font-semibold cursor-pointer hover:underline">
                                Reply
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div v-else class="min-h-8 my-2 w-full">
                        <input type="text" class="w-full border border-gray-400 rounded h-10 px-4 font-ui"
                          v-model="comment.text" @keydown.enter="saveEditComment(comment.id)" />
                        <div class="mx-1 my-3 font-apple text-sm h-8 font-medium">
                          <button @click="saveEditComment(comment.id)"
                            class="text-white bg-blue-600 hover:bg-blue-800 h-full rounded px-3">
                            Save
                          </button>
                          <button @click="handleCancel(comment.id)"
                            class="text-text-dark h-full ml-2 hover:bg-gray-200 px-3 rounded">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mt-4">
                    <div v-for="child in comment.children" :key="child.id"
                      class="flex flex-col min-h-[80px] mt-2 ml-12">
                      <div class="flex">
                        <div
                          class="w-6 h-6 flex text-sm text-center items-center justify-center bg-[#39a3bf] bg-opacity-90 text-[#1e3d5f] text-opacity-80 font-semibold rounded-full cursor-pointer">
                          {{ child.username.charAt(0).toUpperCase() }}
                        </div>
                        <div class="ml-4 flex flex-col flex-1">
                          <div>
                            <span class="font-ui text-text-dark text-sm font-semibold">{{ child.username }}</span>
                            <span class="font-ui text-sm text-text-dark ml-4">{{
                              formatDate(child.createdAt)
                            }}</span>
                            <span v-if="child.createdAt !== child.lastUpdatedAt"
                              class="font-ui text-sm text-text-dark ml-4 mb-2 font-medium">Edited</span>
                          </div>
                          <div v-if="!isOpenEditMap[child.id]">
                            <span class="font-apple text-text-dark-thin text-sm mt-1 flex">{{ child.text }}</span>
                            <div class="flex mt-1">
                              <div v-if="child.userId === userId">
                                <span @click="toggleEditComment(child.id)"
                                  class="mr-2 font-apple text-text-dark-thin text-sm font-semibold cursor-pointer hover:underline">
                                  Edit
                                </span>
                                <deleteCommentModal :commentId="child.id" :deleteComment="deleteCommentById"
                                  class="mr-3" />
                              </div>
                              <button @click="toggleReplyComment(comment.id)"
                                class="font-apple text-text-dark-thin text-sm font-semibold cursor-pointer hover:underline">
                                Reply
                              </button>
                            </div>
                          </div>
                          <div v-else class="min-h-8 my-2 w-full">
                            <input v-model="child.text" type="text" @keydown.enter="saveCHildEditComment(child.id, comment.id)"
                              class="w-full border border-gray-400 rounded h-10 px-4 font-ui" />
                            <div class="mx-1 my-3 font-apple text-sm h-8 font-medium">
                              <button @click="
                                saveCHildEditComment(child.id, comment.id)
                                " class="text-white bg-blue-600 hover:bg-blue-800 h-full rounded px-3">
                                Save
                              </button>
                              <button @click="handleCancel(child.id)"
                                class="text-text-dark h-full ml-2 hover:bg-gray-200 px-3 rounded">
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto">
          <div>
            <div class="mb-4">
              <div class="flex items-center justify-end">
                <div class="flex space-x-2 text-text-dark-thin mr-2">
                  <i
                    class="fa-regular fa-thumbs-up bg-white hover:bg-gray-200 rounded w-8 h-8 flex items-center justify-center cursor-pointer transition-colors duration-150"></i>
                  <i
                    class="fa-solid fa-up-right-and-down-left-from-center bg-white hover:bg-gray-200 rounded w-8 h-8 flex items-center justify-center cursor-pointer transition-colors duration-150"></i>
                </div>

                <button
                  class="text-sm text-text-dark-thin hover:bg-gray-200 rounded h-9 w-9 flex px-2 items-center justify-center">
                  <i class="fa-solid fa-ellipsis text-xl"></i>
                </button>
              </div>
            </div>
            <div class="block relative">
              <button @click.stop="toggleDropdownStatus"
                :class="`${buttonClasses} transition-colors duration-300 ease-in-out h-[32px] rounded px-3 py-2 mx-1 flex items-center justify-center`">
                <span class="flex items-center text-sm font-apple font-medium">
                  {{ replaceUnderscores(task.status) }}
                  <i class="fa-solid fa-chevron-down ml-2 text-xs"></i>
                </span>
              </button>
              <div v-if="isDropdownStatus" ref="dropdownStatus"
                class="z-30 bg-white absolute w-[220px] left-0 top-[40px] rounded border shadow-lg border-blur">
                <div class="my-2 text-[11px] font-semibold font-apple">
                  <div @click="selectStatus('TODO')"
                    class="h-[28px] flex items-center pl-4 cursor-pointer border-l-[3px] border-white hover:border-blue-500 hover:bg-gray-200 hover:bg-opacity-60">
                    <span class="text-gray-500 font-bold bg-gray-100 px-1 rounded">TODO</span>
                  </div>
                  <div @click="selectStatus('IN_PROGRESS')"
                    class="h-[28px] flex items-center pl-4 cursor-pointer border-l-[3px] border-white hover:border-blue-500 hover:bg-gray-200 hover:bg-opacity-60">
                    <span class="text-blue-500 font-bold bg-blue-100 px-1 rounded">IN PROGRESS</span>
                  </div>
                  <div v-if="task.status != 'TODO'" @click="selectStatus('READY_FOR_TEST')"
                    class="h-[28px] flex items-center pl-4 cursor-pointer border-l-[3px] border-white hover:border-blue-500 hover:bg-gray-200 hover:bg-opacity-60">
                    <span class="text-purple-600 font-bold bg-purple-100 px-1 rounded">READY FOR TEST</span>
                  </div>
                  <div v-if="task.status != 'TODO'" @click="selectStatus('DONE')"
                    class="h-[28px] flex items-center pl-4 cursor-pointer border-l-[3px] border-white hover:border-blue-500 hover:bg-gray-200 hover:bg-opacity-70">
                    <span class="text-green-600 font-bold bg-green-100 px-1 rounded">DONE</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button v-if="!isDropdownDetail" @click="toggleDropdownDetail"
                class="h-12 w-full border border-gray-300 hover:bg-gray-200 rounded mt-4">
                <div class="flex items-center justify-between px-4 h-full">
                  <span class="text-text-dark font-ui text-sm">Details</span>
                  <i class="fa-solid fa-chevron-down text-xs"></i>
                </div>
              </button>
              <div v-else class="h-[250px] w-full border border-gray-300 rounded mt-4 flex flex-col">
                <button @click="toggleDropdownDetail"
                  class="border-b border-gray-300 w-full h-12 bg-gray-200 hover:bg-gray-300 rounded-t">
                  <div class="flex items-center justify-between px-4 h-full">
                    <span class="text-text-dark font-ui text-sm">Details</span>
                    <i class="fa-solid fa-chevron-up text-xs"></i>
                  </div>
                </button>
                <div class="py-3 px-4 flex-1 flex text-text-dark text-sm font-ui">
                  <div class="flex flex-col justify-between">
                    <div>Assignee</div>
                    <div>Labels</div>
                    <div>Sprint</div>
                    <div>Reporter</div>
                  </div>
                  <div class="ml-20 flex flex-col justify-between w-full font-ui">
                    <div v-if="task.userResponse.id != '1'"
                      class="font-apple text-text-dark-thin text-sm flex items-center w-full hover:bg-gray-200 rounded px-2 h-7">
                      <div
                        class="rounded-full bg-[#39a3bf] w-6 h-6 text-gray-800 font-xl font-semibold flex items-center justify-center">
                        {{ task.userResponse.username.charAt(0).toUpperCase() }}
                      </div>
                      <span class="ml-2">{{ task.userResponse.username }}</span>
                    </div>
                    <div v-else
                      class="font-apple text-text-dark-thin text-sm flex items-center w-full hover:bg-gray-200 rounded px-2 h-7">
                      <div
                        class="rounded-full w-6 h-6 bg-gray-500 font-xl font-semibold flex items-center justify-center">
                        <i class="fa-solid fa-user text-white text-sm"></i>
                      </div>
                      <span class="ml-2">Unassigned</span>
                    </div>

                    <div class="px-2 hover:bg-gray-200 h-7 rounded flex items-center">
                      None
                    </div>
                    <div v-if="task.sprintDetailResponse.sprintTitle != ''"
                      class="px-2 hover:bg-gray-200 text-blue-500 h-7 rounded flex items-center hover:underline cursor-pointer">
                      {{ task.sprintDetailResponse.sprintTitle }}
                    </div>
                    <div v-else
                      class="px-2 hover:bg-gray-200 text-blue-500 h-7 rounded flex items-center hover:underline cursor-pointer">
                      Backlog
                    </div>
                    <div
                      class="font-apple text-text-dark-thin text-sm flex items-center w-full hover:bg-gray-200 rounded px-2 h-7">
                      <div v-if="task.userResponse.id != '1'"
                        class="font-apple text-text-dark-thin text-sm flex items-center w-full hover:bg-gray-200 rounded  h-7">
                        <div
                          class="rounded-full bg-[#39a3bf] w-6 h-6 text-gray-800 font-xl font-semibold flex items-center justify-center">
                          {{
                            task.userResponse.username.charAt(0).toUpperCase()
                          }}
                        </div>
                        <span class="ml-2">{{
                          task.userResponse.username
                        }}</span>
                      </div>
                      <div v-else
                        class="font-apple text-text-dark-thin text-sm flex items-center w-full hover:bg-gray-200 rounded  h-7">
                        <div
                          class="rounded-full w-6 h-6 bg-gray-500 font-xl font-semibold flex items-center justify-center">
                          <i class="fa-solid fa-user text-white text-sm"></i>
                        </div>
                        <span class="ml-2">Unassigned</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-4 ml-2">
              <div class="text-text-dark text-xs font-ui">
                <div class="py-1">Created July 10, 2024 at 11:35 AM</div>
                <div class="">Updated 12 minutes ago</div>
              </div>
              <div class="text-text-dark text-sm font-apple font-medium mt-2 hover:underline hover:cursor-pointer">
                <i class="fa-solid fa-gear mr-2"></i>
                <span>Configure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "TaskDetail",
}
</script>
<script lang="ts" setup>
import { onMounted, ref, watch, computed, onUnmounted } from "vue";

import "@fortawesome/fontawesome-free/css/all.css";
import {
  getTaskDetail,
  updateStatusTask,
  updateTitleTask,
} from "../../api/task";
import { replaceUnderscores } from "../../utils/normalizeName";
import {
  getAllCommentForTask,
  createCommentForTask,
  deleteComment,
  editComment,
  replyComment,
} from "../../api/commentTask";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { fetchProfile } from "../../api/profile";
import deleteCommentModal from "./deleteCommentModal.vue";
import { getAllTypeProject } from "../../api/taskType";
import {useGetUserDetailStore} from "../../stores/projectStores/userStore/user"

const task = ref<any>({
  id: "",
  title: "",
  point: 0,
  status: "",
  keyProjectTask: "",
  userId: "",
  userResponse: {
    id: "",
    username: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    role: "",
  },
  sprintDetailResponse: {
    sprintId: "",
    sprintTitle: "",
    sprintDescription: "",
    sprintStartDate: "",
    sprintEndDate: "",
  },
  sprintStatus: "",
});
const props = defineProps<{
  taskId: string;
}>();
const emit = defineEmits(["updateTitle"]);

// Reactive state
const value_des = ref("");
const isEditing = ref(false);
const isDropdownStatus = ref(false);
const isDropdownDetail = ref(false);
const isLoading = ref(false);
const isDropdownLabel = ref(false);
const isDropdownTitle = ref(false);
const inputTitle = ref(task.value.title);
const dropdownTitle = ref<HTMLElement | null>(null);
const dropdownStatus = ref<HTMLElement | null>(null);
const commentInput = ref<HTMLInputElement | null>(null);
const isOpenEditMap = ref<Record<string, boolean>>({});
const allComment = ref<any[]>([]);
const getUserDetailStore = useGetUserDetailStore()
const userId = ref("");
const userName = ref(getUserDetailStore.username)
const allTasks = ref<any[]>([]);
const isReplyComment = ref<Record<string, boolean>>({});
const replyText = ref("");

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

function formatDate(dateString: string): string {
  return dayjs(dateString)
    .tz("Asia/Ho_Chi_Minh") // Đặt múi giờ nếu cần
    .format("MMMM D, YYYY [at] h:mm A");
}

watch(
  () => props.taskId,
  (newTaskId) => {
    getInfoTaskDetail(newTaskId);
    getAllComment();
    if (commentInput.value) {
      commentInput.value.value = ""; // Xóa nội dung trong ô comment khi newTaskId thay đổi
    }
  }
);
const saveEdit = () => {
  if (!value_des.value) {
    return;
  }
  isEditing.value = false;
};

const toggleReplyComment = (commentId: string) => {
  isReplyComment.value[commentId] = !isReplyComment.value[commentId];
};
const toggleDropdownStatus = () => {
  isDropdownStatus.value = !isDropdownStatus.value;
};
async function selectStatus(status: string) {
  try {
    await updateStatusTask(task.value.id, status);
    // await updateTaskStatus(taskId, status);
    task.value.status = status;
  } catch (error) {
    console.log("Error message:", error);
  } finally {
    isDropdownStatus.value = false;
  }
}

const toggleEditComment = (commentId: string) => {
  isOpenEditMap.value[commentId] = !isOpenEditMap.value[commentId];
};
const handleKeydown = (event: KeyboardEvent) => {
  // Kiểm tra xem ô input có được focus không
  if (
    document.activeElement?.tagName !== "INPUT" &&
    document.activeElement !== commentInput.value
  ) {
    // Nếu ô input chưa được focus, kiểm tra phím "M"
    if (event.key === "m" || event.key === "M") {
      event.preventDefault();
      commentInput.value?.focus();
    }
  }
};

// Hàm để kiểm tra nếu ô input đã được focus và xóa event listener nếu đúng
const checkFocus = () => {
  if (document.activeElement === commentInput.value) {
    window.removeEventListener("keydown", handleKeydown);
    commentInput.value?.removeEventListener("focus", checkFocus);
  }
};

const setupListeners = () => {
  window.addEventListener("keydown", handleKeydown);
  commentInput.value?.addEventListener("focus", checkFocus);
};

setupListeners();

function handleCancel(commentId: string) {
  toggleEditComment(commentId);
}

const saveEditComment = async (commentId: string) => {
  try {
    const comment = allComment.value.find(
      (comment) => comment.id === commentId
    );
    if (comment) {
      const response = await editComment(props.taskId, commentId, comment.text);
      allComment.value = allComment.value.map((c) => {
        if (c.id === commentId) {
          return {
            ...c,
            text: response.data.text,
            lastUpdatedAt: response.data.lastUpdatedAt,
          };
        }
        return c;
      });
    }
  } catch (error) {
    console.log("Error message:", error);
  } finally {
    toggleEditComment(commentId);
  }
};

const saveCHildEditComment = async (commentId: string, parentId: string) => {
  try {
    const parentComment = allComment.value.find(
      (comment:any) => comment.id === parentId
    );
    const comment = parentComment.children.find(
      (comment :any) => comment.id === commentId
    );
    if (comment) {
      const response = await editComment(props.taskId, commentId, comment.text);
      allComment.value = allComment.value.map((c) => {
        if (c.id === parentId) {
          return {
            ...c,
            children: c.children.map((child:any) => {
              if (child.id === commentId) {
                return {
                  ...child,
                  text: response.data.text,
                  lastUpdatedAt: response.data.lastUpdatedAt,
                };
              }
              return child;
            }),
          };
        }
        return c;
      });
    }
  } catch (error) {
    console.log("Error message:", error);
  } finally {
    toggleEditComment(commentId);
  }
};

async function deleteCommentById(commentId: string) {
  try {
    await deleteComment(props.taskId, commentId);
    const parentCommentIndex = allComment.value.findIndex(
      (comment) => comment.id === commentId
    );

    if (parentCommentIndex !== -1) {
      allComment.value.splice(parentCommentIndex, 1);
    } else {
      allComment.value.forEach((parentComment) => {
        parentComment.children = parentComment.children.filter(
          (child:any) => child.id !== commentId
        );
      });
    }
    // message.success("Delete comment successfully");
  } catch (error) {
    console.log("Error message:", error);
  }
}

async function handleReplyComment(commentId: string) {
  try {
    const response = await replyComment(
      props.taskId,
      commentId,
      replyText.value
    );
    if (response) {
      const parentComment = allComment.value.find(
        (comment) => comment.id === commentId
      );

      if (parentComment) {
        // Thêm comment reply vào đầu danh sách con của comment cha
        parentComment.children.unshift({ ...response.data, children: [] });

        // Đóng cửa sổ chỉnh sửa và reply
        isOpenEditMap.value[response.data.id] = false;
        isReplyComment.value[commentId] = false;
      }
    }
  } catch (error) {
    console.log("Error message:", error);
  } finally {
    replyText.value = "";
    isReplyComment.value[commentId] = false;
  }
}

async function getAllType() {
  try {
    const response = await getAllTypeProject();
    allTasks.value = response.data;
    console.log("allTasks:", allTasks.value);
  } catch (error) {
    console.log("Error message:", error);
  }
}

async function confirmTitle() {
  try {
    if (inputTitle.value.length > 0) {
      await updateTitleTask(props.taskId, inputTitle.value);
      task.value.title = inputTitle.value;
      inputTitle.value = task.value.title;
      emit("updateTitle", { taskId: props.taskId, newTitle: inputTitle.value });
    }
    toggleDropdownTitle();
  } catch (error: any) {
    if (error.message) {
      console.log(error.message);
    }
  } finally {
  }
}

const iconContent = computed(() => {
  switch (task.value?.typeResponse?.title) {
    case "BUG":
      return `
            <div class="bg-red-500 w-4 h-4 rounded flex items-center justify-center p-0 mr-2">
              <i class="fa-solid fa-circle text-white mt-[2px] text-[7px]"></i>
            </div>`;

    case "STORY":
      return `
            <div class="bg-green-500 w-4 h-4 rounded flex items-center justify-center p-0 mr-2">
              <i class="fa-solid fa-bookmark text-white text-[8px]"></i>
            </div>`;
    default:
      return `
            <div class="w-4 h-4 p-0 flex items-center justify-center mr-2">
              <i class="fa-solid fa-square-check text-blue-400 text-base"></i>
            </div>`;
  }
});

const buttonClasses = computed(() => {
  switch (task.value.status) {
    case "DONE":
      return "bg-green-700 text-white";
    case "IN_PROGRESS":
      return "bg-blue-600 text-white";
    case "READY_FOR_TEST":
      return "bg-purple-600 text-white";
    default:
      return "bg-gray-200 bg-opacity-60 text-text-dark-thin"; // Default case
  }
});

const validateTitle = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.value.length > 10) {
    input.value = input.value.slice(0, 10);
  }
};

const cancelEditTitle = () => {
  toggleDropdownTitle();
};
function toggleDropdownDetail() {
  isDropdownDetail.value = !isDropdownDetail.value;
}
function toggleDropdownTitle() {
  isDropdownTitle.value = !isDropdownTitle.value;
}
function toggleDropdownLabel() {
  isDropdownLabel.value = !isDropdownLabel.value;
}
const handleClickOutside = (event: MouseEvent) => {
  if (
    dropdownTitle.value &&
    !dropdownTitle.value.contains(event.target as Node)
  ) {
    isDropdownTitle.value = false;
  }
  if (
    dropdownStatus.value &&
    !dropdownStatus.value.contains(event.target as Node)
  ) {
    isDropdownStatus.value = false;
  }
};

async function handleCreateComment(comment: string) {
  try {
    const response = await createCommentForTask(props.taskId, comment);
    if (response) {
      const newComment = { ...response.data, children: [] };
      allComment.value.unshift(newComment);
      isOpenEditMap.value[newComment.id] = false;
    }
  } catch (error) {
    console.log("Error message:", error);
  } finally {
    commentInput.value!.value = "";
  }
}

const handleEnter = async () => {
  if (commentInput.value) {
    const comment = commentInput.value.value.trim();

    if (comment) {
      await handleCreateComment(comment); // Gọi API với nội dung comment
    }
  }
};
async function getAllComment() {
  const response = await getAllCommentForTask(props.taskId);
  const comments = response.data;

  comments.forEach((comment) => {
    isOpenEditMap.value[comment.id] = false;
    isReplyComment.value[comment.id] = false;
  });

  const sortedComments = comments.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Tạo mảng cho comment gốc và comment con
  const parentComments = sortedComments.filter(
    (comment) => comment.parentId === null
  );
  const childComments = sortedComments.filter(
    (comment) => comment.parentId !== null
  );

  // Gán các comment vào allComment
  allComment.value = parentComments.map((parent) => {
    return {
      ...parent,
      children: childComments.filter((child) => child.parentId === parent.id),
    };
  });
}

async function handleChangeType(type:string) {
  try {
    console.log("type:", type);
  } catch (error) {
    console.log("Error message:", error);
  } finally {
    isDropdownLabel.value = false;
  }
}
async function getInfoTaskDetail(taskId: string) {
  const response = await getTaskDetail(taskId);
  task.value = response.data;
  console.log("task:", task.value);
}
async function getUserId() {
  const response = await fetchProfile();
  userId.value = response.data.id;
}
onMounted(async () => {
  isLoading.value = true;
  try {
    getAllType();
    getInfoTaskDetail(props.taskId);
    getAllComment();
    getUserId();
  } catch (error) {
    console.log("Error message:", error);
  } finally {
    isLoading.value = false;
  }
});

// Khi component bị hủy, đảm bảo event listener cũng bị xóa
onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

</script>


<style scoped>
@import "index.scss";
</style>
