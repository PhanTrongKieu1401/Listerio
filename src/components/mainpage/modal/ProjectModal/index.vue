<template>
  <div v-if="isVisible"
    class="fixed inset-x-0 flex items-start justify-center bg-opacity-50 transition-opacity duration-300 ease-in-out">
    <div class="bg-white w-[320px] shadow-lg border rounded border-gray-500 border-opacity-20 p-0">
      <!-- Section 1 -->
      <div class="mb-4 w-full mt-2">
        <span class="text-xs my-4 text-text-dark pl-4">RECENT</span>
        <div class="" v-for="project in data" :key="project.id">
          <button class="w-full mt-2">
            <div class="flex px-4 py-2 h-[52px] bg-white hover:bg-gray-200 transition-colors duration-200 items-center">
              <img src="../../../../assets/img/project_logo.svg" class="h-6 w-6" />
              <span class="flex flex-col ml-4 items-start">
                <span class="text-sm font-ui">{{ project.name }}</span>
                <span class="text-xs text-gray-500 font-ui">Software project</span>
              </span>
            </div>
          </button>
        </div>

        <!-- <button class="w-full mt-2">
          <div class="flex px-4 py-2 h-[52px] bg-white hover:bg-gray-200 transition-colors duration-200 items-center">
            <img src="../../../../assets/img/project_logo.svg" class="h-6 w-6" />
            <span class="flex flex-col ml-4 items-start">
              <span class="text-sm font-ui">Project 1</span>
              <span class="text-xs text-gray-500 font-ui">Software project</span>
            </span>
          </div>
        </button>

        <button class="w-full mt-2">
          <div class="flex px-4 py-2 h-[52px] bg-white hover:bg-gray-200 transition-colors duration-200 items-center">
            <img src="../../../../assets/img/project_logo.svg" class="h-6 w-6" />
            <span class="flex flex-col ml-4 items-start">
              <span class="text-sm font-ui">Project 1</span>
              <span class="text-xs text-gray-500 font-ui">Software project</span>
            </span>
          </div>
        </button> -->

      </div>

      <div class="border-b border-black opacity-20 mb-0"></div>

      <!-- Section 3 -->
      <div class="w-full mt-1 text-text-dark-thin">
        <router-link to="/allproject" @click = "closeModal"
          class="w-full h-10 bg-white text-sm font-ui font-normal hover:bg-gray-200 hover:bg-opacity-80 pl-5 flex items-center">
          View all projects
        </router-link>
        <router-link to="/project-create" @click = "closeModal"
          class="w-full h-10 bg-white text-sm font-ui font-normal mb-2 hover:bg-gray-200 hover:bg-opacity-80 pl-5 flex items-center">
          Create project
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "ProjectModal",
  props: {
    isVisible: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  emits: ['update:isVisible'],
  methods: {
    closeModal() {
      this.$emit('update:isVisible', false);
    }
  }
});
</script>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useProjectStore } from "../../../../stores/projectStores/projectStore";


const projectStore = useProjectStore();
const  data = ref<any[]>([]);
 
const loadData = async () => {
  try {
    await projectStore.projects;
    const newProjects = projectStore.projects.map((project) => ({
      id: project?.id || "",
      name: project?.title || "",
      project: project?.keyProject || "",

      
    }));
    data.value = newProjects.slice(0, 3);
  } catch (error) {
    console.error("Error loading data:", error);
  } 
};

onMounted(() => {
  loadData();
});
// const allProjects = ref([]);
// async function fetchAllProjects() {
//   // fetch all projects
// }
</script>
