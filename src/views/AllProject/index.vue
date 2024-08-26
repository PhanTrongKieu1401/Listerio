<template>
  <div class="mt-20 px-10 py-0 ml-4 relative">
    <div class="h-[40px] flex justify-between">
      <span class="font-ui text-2xl font-semibold opacity-80">Projects</span>
      <div class="flex select-none ">
        <router-link to="/project-create"
          class="flex justify-center items-center h-[36px] bg-blue-600 text-white hover:bg-blue-700 px-3 mr-1 rounded">
          Create project
        </router-link>
        <button class="h-[36px] bg-gray-100 text-black hover:bg-gray-300 px-3 rounded">
          Template
        </button>
      </div>
    </div>

    <div class="mt-6">
      <div class="relative inline-block mr-6">
        <input type="text" v-model="searchQuery" placeholder="Search projects"
          class="custom-input w-[224px] min-h-[40px] border border-gray-500 rounded py-3 font-light pl-2 pr-10 placeholder-gray-400 hover:border-blue-600" />
        <i v-if="searchQuery" @click="clearSearch"
          class="select-none  fa-solid fa-x absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"></i>
        <i v-else
          class=" select-none  fa-solid fa-magnifying-glass absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"></i>
      </div>

      <div class="relative inline-block select-none">
        <input type="text" @focus="toggleDropdown(true)" @blur="toggleDropdown(false)" placeholder="Filter by product"
          class="custom-input w-[200px] min-h-[40px] border border-gray-500 rounded py-3 font-light pl-2 pr-10 placeholder-gray-400" />
        <i class="fa-solid fa-chevron-down absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"></i>

        <!-- Dropdown Menu -->
        <div v-show="isDropdownVisible"
          class="absolute z-10 mt-2 w-[200px] bg-white border border-gray-300 rounded shadow-lg">
          <div class="text-sm font-normal font-apple">
            <label
              class="items-center block mt-2 py-2 border-l-4 border-white hover:bg-gray-200 hover:border-l-4 hover:border-blue-500 transition-all">
              <input type="checkbox" v-model="selectedFilters" value="business projects" class="ml-3" />
              <span class="ml-2 text-gray-700">Business Projects</span>
            </label>
            <label
              class="block mb-2 py-2 border-l-4 border-white hover:bg-gray-200 hover:border-l-4 hover:border-blue-500 transition-all">
              <input type="checkbox" v-model="selectedFilters" value="software projects" class="ml-3" />
              <span class="ml-2 text-gray-700">Software Projects</span>
            </label>
          </div>
        </div>

      </div>
    </div>

    <div>
      <a-table :loading="loading" :row-selection="rowSelection" :columns="columns" :data-source="data" class="mt-6 select-none">
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'name'">
            <div @click="handleProject(record.key)" class="text-button-color flex cursor-pointer hover:underline">
              <img src="../../assets/img/project_logo.svg" alt="" height="24" width="24" />
              <span class="ml-2">{{ text }}</span>
            </div>
          </template>

          <template v-if="column.dataIndex === 'lead'">
            <div class="relative flex items-center cursor-pointer" @click.stop="toggleHover(record.key)">
              <div
                class="w-6 h-6 flex items-center justify-center bg-[#1b2b4e] bg-opacity-90 text-white rounded-full text-xs mr-2">
                {{ text.charAt(0) }}
              </div>

              <span class="text-button-color flex cursor-pointer hover:underline ml-1">{{ text }}</span>
              <!-- Hover Box -->
              <div v-if="activeLead[record.key]" ref = "dropdownUserDetails"
                class="cursor-default absolute top-[-210px] left-0 w-[360px] h-[200px] bg-white border border-gray-300 shadow-lg z-50 flex flex-col rounded-lg">
                <div
                  class="absolute top-[30px] left-[40px] w-[100px] h-[100px] rounded-full bg-[#1b2b4e] text-white text-5xl flex items-center justify-center">
                  {{ text.charAt(0) }}
                </div>

                <div class="w-full h-[100px] bg-blue-600 flex items-center justify-center border-t rounded">
                  <div class="mt-8 ml-20 text-white font-apple text-lg">
                    {{ text }}
                  </div>
                </div>

                <div class="w-full h-[100px] bg-white flex items-center justify-center flex-col">
                  <div class="mb-4 ml-32 text-text-dark-thin font-apple text-xs font-medium">
                    <i class="fa-regular fa-envelope mt-1"></i>
                    <span class="ml-2">email@gmail.com</span>
                  </div>
                  <button
                    class="mb-4 ml-48 bg-gray-200 hover p-2 text-text-dark-thin font-apple font-semibold border rounded">
                    View profile
                  </button>
                </div>

              </div>
            </div>
          </template>

          <template v-if="column.dataIndex === 'actions'">
            <button @click.stop="toggleDropDownDetails(record.key)"
              class="relative flex items-center justify-center z-40 h-10 w-10 cursor-pointer bg-white rounded hover:bg-gray-100 ml-8">
              <i class="fa-solid fa-ellipsis text-2xl text-gray-500"></i>

            </button>
            <div v-if="isDropdownDetailVisible[record.key]" ref="dropdownSprint" @click.stop
              class="right-0 top-[50px] absolute bg-white border border-gray-200 rounded shadow-lg  min-w-[120px] min-h-[40px] z-50 cursor-pointer">

              <div class="h-[40px] w-full flex items-center justify-start hover:bg-gray-200 relative ">
                <deleteProjectModal :projectId="record.key" :proJectName="record.name" @projectDeleted = "handleProjectDelete"/>
              </div>
              
            </div>


          </template>

        </template>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: 'AllProjects',
})
</script>


<script setup lang="ts">
import { ref, onMounted, onUnmounted} from "vue";
import { useRouter } from "vue-router";
import { type TableProps, type TableColumnType } from "ant-design-vue/es";
import type { Key } from "ant-design-vue/es/table/interface";
import { useProjectStore, useProjectRoleStore } from "../../stores/projectStores/projectStore";
import DeleteProjectModal from "../../components/mainpage/modal/deleteProjectModal/index.vue";
import "@fortawesome/fontawesome-free/css/all.css";

interface DataType {
  key: string;
  name: string;
  project: string;
  role: string;
  lead: string;
  projectUrl: string;
}

const columns: TableColumnType<DataType>[] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 250,
  },
  {
    title: "Key",
    dataIndex: "project",
    key: "project",
    width: 150,
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    width: 250,
  },
  {
    title: "Lead",
    dataIndex: "lead",
    key: "lead",
    width: 250,
  },
  {
    title: "Project URL",
    dataIndex: "projectUrl",
    key: "projectUrl",
    width: 200,
  },
  {
    title: "More actions",
    dataIndex: "actions",
    key: "actions",
    width: 120,
  },
];



const rowSelection: TableProps<DataType>["rowSelection"] = {
  onChange: (selectedRowKeys: Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === "Disabled User",
    name: record.name,
  }),
};

const router = useRouter();
const projectStore = useProjectStore();
const searchQuery = ref("");
const isDropdownVisible = ref(false);
const isDropdownDetailVisible = ref<Record<string, boolean>>({});
const selectedFilters = ref<string[]>([]);
const activeLead = ref<Record<string, boolean>>({});;
const data = ref<any[]>([]);
const loading = ref(false);
const dropdownUserDetails = ref<HTMLElement | null>(null);
const dropdownSprint = ref<HTMLElement | null>(null);
const toggleDropDownDetails = (projectKey: string) => {
  closeAllModal();
  isDropdownDetailVisible.value[projectKey] = !isDropdownDetailVisible.value[projectKey];
};
const loadData = async () => {
  loading.value = true;
  try {
    await projectStore.loadProjects();
    const newProjects = projectStore.projects.map((project) => ({
      key: project?.id,
      name: project?.title || "",
      project: project?.keyProject || "",
      role: project?.roleUser || "",
      email: project?.email || "",
      // lead: normalizeName(
      //   project?.userNameResponseList[0]?.firstName,
      //   project?.userNameResponseList[0]?.middleName,
      //   project?.userNameResponseList[0]?.lastName
      // ), // sau set list lead
      lead: project?.username || "",
    }));
    data.value = newProjects;
    data.value.forEach((project) => {
      isDropdownDetailVisible.value[project.key] = false;
      activeLead.value[project.id] = false;
    });
  } catch (error) {
    console.error("Error loading data:", error);
  } finally {
    loading.value = false;
  }
};

const handleProject = async (id: string) => {
  try {
    const projectRoleStore = useProjectRoleStore();
    await projectRoleStore.loadProjectRole(id); // Await the async call
    router.push("/mainpage");
  } catch (error) {
    console.error("Error data:", error);
  }
};
const closeAllModal = () => {
  isDropdownDetailVisible.value = {};
  activeLead.value = {};
};
const handleClickOutside =(event: MouseEvent)  =>{
  if (dropdownSprint.value && !dropdownSprint.value.contains(event.target as Node)) {
    isDropdownDetailVisible.value = {};
  }
  if (dropdownUserDetails.value && !dropdownUserDetails.value.contains(event.target as Node)) {
    activeLead.value = {};
  }
}
async function handleProjectDelete() {
  
  loadData();
}

const clearSearch = () => {
  searchQuery.value = "";
};

const toggleDropdown = (show: boolean) => {
  isDropdownVisible.value = show;
};

const toggleHover = (lead: string) => {
  closeAllModal();
  activeLead.value[lead] = !activeLead.value[lead];
};



onMounted(() => {
  loadData();
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
