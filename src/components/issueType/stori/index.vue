<template>
  <SideBarIssueType
    :isCollapsed="isSidebarCollapsed"
    @toggleSidebar="toggleSidebar"
  />
  <div
    class="flex-1 transition-all duration-300"
    :class="{ 'ml-20': isSidebarCollapsed, 'ml-64': !isSidebarCollapsed }"
  >
    <div class="p-4 flex flex-col mx-72">
      <!-- Header -->
      <div class="flex items-center justify-between mt-24">
        <!-- Phần bên trái -->
        <div class="flex items-center flex-grow mt-0">
          <div
            class="w-8 h-8 bg-green-500 flex items-center justify-center rounded-md"
          >
            <i class="fas fa-bookmark text-white"></i>
          </div>

          <!-- Phần tiêu đề -->
          <div
            class="flex items-center justify-between ml-2 relative flex-grow h-11 transition-all duration-300"
          >
            <div
              v-if="!editingTitle"
              @click="startEditing('title')"
              class="text-2xl font-semibold px-3 pt-2 pb-2 ml-2 info my-1.5 w-full h-10 cursor-pointer hover:bg-gray-100 hover:bg-opacity-80"
            >
              {{ title }}
            </div>
            <div v-else class="relative flex items-center w-full">
              <input
                v-model="title"
                spellcheck="false"
                type="text"
                class="border-2 border-blue-500 rounded w-full h-10 text-sm focus:border-blue-500 pl-2"
                @blur="stopEditing"
                ref="titleInput"
                style="
                  border-color: #3b82f6 !important;
                  outline: none !important;
                "
              />
              <div class="absolute right-0 top-full mt-1 flex space-x-1">
                <button
                  @click="confirmEdit('title')"
                  class="h-8 w-8 rounded border bg-white hover:bg-gray-200 shadow"
                >
                  <i class="fa-solid fa-check"></i>
                </button>
                <button
                  @click="cancelEdit('title')"
                  class="h-8 w-8 rounded border bg-white hover:bg-gray-200 shadow"
                >
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Phần bên phải -->
        <div
          class="hover:bg-gray-100 hover:bg-opacity-80 rounded-lg cursor-pointer mb-1 mr-2 h-10 w-10 flex items-center justify-center"
          @click="openModal"
        >
          <i class="fa-solid fa-plus"></i>
          <AddLabelModal
            :visible="isModalVisible"
            @update:visible="isModalVisible = $event"
          />
        </div>
      </div>

      <!-- Trường mô tả -->
      <div class="flex items-center justify-between mt-4">
        <div
          v-if="!editingDescription"
          @click="startEditing('description')"
          class="text-slate-900 px-3 pt-2 pb-2 text-slate-400 ml-2 info my-1.5 w-full h-10 cursor-pointer hover:bg-gray-100 hover:bg-opacity-80"
        >
          {{ description }}
        </div>
        <div v-else class="relative flex items-center w-full">
          <input
            v-model="description"
            spellcheck="false"
            type="text"
            class="border-2 border-blue-500 rounded w-full h-10 text-sm focus:border-blue-500 pl-2"
            @blur="stopEditing"
            ref="descriptionInput"
            style="border-color: #3b82f6 !important; outline: none !important"
          />
          <div class="absolute right-0 top-full mt-1 flex space-x-1">
            <button
              @click="confirmEdit('description')"
              class="h-8 w-8 rounded border bg-white hover:bg-gray-200 shadow"
            >
              <i class="fa-solid fa-check"></i>
            </button>
            <button
              @click="cancelEdit('description')"
              class="h-8 w-8 rounded border bg-white hover:bg-gray-200 shadow"
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Danh sách items (List View) -->
      <div class="mt-6">
        <div
          v-for="item in listItems"
          :key="item.id"
          class="flex items-center p-4 border-b hover:bg-gray-100"
        >
          <input
            type="checkbox"
            class="mr-4 h-5 w-5 text-blue-500 border-gray-300 rounded"
          />
          <div>
            <div class="text-lg">{{ item.title }}</div>
            <div class="text-sm text-gray-500">{{ item.subtitle }}</div>
          </div>
        </div>
      </div>

      <!-- Nút hành động -->
      <div class="flex justify-end mt-6">
        <a-button class="mr-2">Delete</a-button>
        <a-button type="primary">Save changes</a-button>
      </div>
    </div>
  </div>
</template>
    
    <script setup>
import { ref, nextTick } from "vue";
import SideBarIssueType from "../../shared/SidebarIssueType/index.vue";
import AddLabelModal from "../../mainpage/modal/addLabelModal/index.vue";

const isEditing = ref(false);
const isHovered = ref(false);
const editingDescription = ref(false);
const editingTitle = ref(false);
const title = ref("Story");
const description = ref("Bugs track problems or errors.");
const isModalVisible = ref(false);
const isSidebarCollapsed = ref(false);

const inputField = ref(null);
const descriptionInput = ref(null);
const titleInput = ref(null);

const openModal = () => {
  isModalVisible.value = true;
};
const toggleEdit = () => {
  isEditing.value = !isEditing.value;
  isHovered.value = false;

  if (isEditing.value) {
    nextTick(() => {
      inputField.value.focus();
    });
  }
};

const listItems = ref([
  { id: 1, title: "Label 1", subtitle: "This is description of label 1" },
  { id: 2, title: "Label 2", subtitle: "This is description of label 2" },
  { id: 3, title: "Label 3", subtitle: "This is description of label 3" },
  { id: 4, title: "Label 4", subtitle: "This is description of label 4" },
  { id: 5, title: "Label 5", subtitle: "This is description of label 5" },
]);

const startEditing = (field) => {
  editingDescription.value = false;
  editingTitle.value = false;

  if (field === "description") {
    editingDescription.value = true;
    nextTick(() => {
      descriptionInput.value.focus();
    });
  } else if (field === "title") {
    editingTitle.value = true;
    nextTick(() => {
      titleInput.value.focus();
    });
  }
};

const stopEditing = () => {
  editingDescription.value = false;
  editingTitle.value = false;
};

const confirmEdit = (field) => {
  if (field === "description") {
    // Here you can add logic to save the description if needed
  } else if (field === "title") {
    // Here you can add logic to save the title if needed
  }
  stopEditing();
};

const cancelEdit = (field) => {
  if (field === "description") {
    // Optionally, revert any changes to the description here
  } else if (field === "title") {
    // Optionally, revert any changes to the title here
  }
  stopEditing();
};
const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};
</script>
    