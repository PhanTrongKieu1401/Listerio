<template>
  <!-- Loading Spinner -->
  <div v-if="isLoading" class="loading-container">
    <a-spin size="large" />
  </div>
  <div v-else>
    <div class="mt-20 px-8 py-0">
      <div class="min-h-[150px] flex flex-col justify-around">
        <div class="font-ui font-normal text-text-dark mb-2">
          <span class="cursor-pointer hover:underline">Projects </span>
          <span class="px-1">/</span>
          <span class="cursor-pointer hover:underline"> Project 1</span>
          <span class="px-1">/</span>
          <span class="cursor-pointer hover:underline"> Project settings</span>
        </div>

        <div class="flex justify-between ">
          <span class="font-ui text-2xl font-semibold text-text-dark-thin"
            >Details</span
          >
          <div class="flex items-center">
            <button
              class="bg-gray-100 text-sm text-text-dark-thin hover:bg-gray-200 rounded h-9 w-9 flex px-2 items-center justify-center ml-2"
            >
              <i class="fa-solid fa-ellipsis text-xl"></i>
            </button>
          </div>
        </div>

        <div class="flex items-center justify-center w-full min-h-screen">
          <div class="max-w-lg w-full p-12 bg-white">
            <img
              src="https://hanluan1001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10407&avatarType=project"
              alt="Project avatar"
              class="w-24 h-24 mx-auto mb-4"
            />
            <a-upload class="w-full mb-4 flex justify-center">
              <a-button>Change icon</a-button>
            </a-upload>
            <a-form
              layout="vertical"
              :model="project"
              @submit.prevent="submitForm"
            >
              <a-form-item label="Name *" name="name">
                <a-input
                  v-model:value="project.title"
                  :disabled="isEdit"
                  required
                />
              </a-form-item>
              <a-form-item label="Key *" name="key">
                <a-input
                  v-model:value="project.keyProject"
                  :disabled="isEdit"
                  required
                />
              </a-form-item>

              <a-form-item label="Project lead (can't change)" 
                name="projectLead"
              >
                <a-select
                  v-model:value="selectedProjectLead"
                  :disabled="isEdit"
                  required
                >
                  <a-select-option
                    v-for="(lead, index) in project.userNameResponseList"
                    :key="index"
                    :value="lead.username"
                    class="flex items-center p-2"
                  >
                    <div class="flex items-center">
                      <div
                        class="w-6 h-6 flex items-center justify-center bg-[#1b2b4e] bg-opacity-90 text-white rounded-full text-xs mr-2"
                      >
                        <!-- {{  lead?.firstName.charAt(0) }} -->
                      </div>
                      <span class="text-slate-950 ml-2">
                        {{
                          lead.username
                        }}
                      </span>
                    </div>
                  </a-select-option>
                </a-select>
              </a-form-item>

              <a-form-item class="flex justify-center">
                <a-button v-if="isEdit" type="primary" @click="handelEdit()"
                  >Edit</a-button
                >
                <a-button
                  v-else
                  :disabled="isEdit"
                  type="primary"
                  htmlType="submit"
                  >Save</a-button
                >
              </a-form-item>
            </a-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useProjectDetailStore } from "../../../../stores/projectSettingStores/detailStores/detailStore";
import { updateProject } from "../../../../api/project";
import { message } from "ant-design-vue";

const project = ref<any>({});
const isLoading = ref(true);
const isEdit = ref(true);
const selectedProjectLead = ref<string | null>(null);
const projectStore = useProjectDetailStore();


const loadData = async () => {
  isLoading.value = true;
  isEdit.value = true;
  try {
    await projectStore.loadProjectDetail();
    project.value = projectStore.project;
    console.log("project:", project.value.userNameResponseList);
  } catch (error) {
    console.error("Error loading project details:", error);
  } finally {
    isLoading.value = false;
    if (project.value.userNameResponseList.length > 0) {
      selectedProjectLead.value = 
        project.value.userNameResponseList[0]?.username;
    }
  }
};
const handelEdit = () => {
  isEdit.value = false;
};
const submitForm = async () => {
  try {
    const response = await updateProject(
      {
        title: project.value.title,
        keyProject: project.value.keyProject,
      },
      project.value.id
    );
    if (response.data) {
      project.value.title = response.data.title;
      project.value.keyProject = response.data.keyProject;
      console.log("(submitForm) response:", response);
      // message.success(`Update successfully`);
    }
  } catch (error) {
    message.error(`Update ${project.value.title} is failed`);
  } finally {
    isEdit.value = true;
  }
};

onMounted(() => {
  loadData();
});
</script>
