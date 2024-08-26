<template>
  <div class="mt-24 px-8 py-0">
    <div class="min-h-[150px] flex flex-col justify-around">
      <div class="font-ui font-normal text-text-dark mb-2">
        <span class="cursor-pointer hover:underline">Projects </span>
        <span class="px-1">/</span>
        <span class="cursor-pointer hover:underline"> Project 1</span>
        <span class="px-1">/</span>
        <span class="cursor-pointer hover:underline"> Project setings</span>
      </div>

      <div class="flex justify-between mb-12">
        <span class="font-ui text-2xl font-semibold text-text-dark-thin"
          >Access</span
        >
        <div class="flex items-center">
          <button @click="openModal"
            class="h-[36px] bg-blue-600 text-white hover:bg-blue-700 px-3 mr-1 rounded flex items-center"
          >
            Add people
          </button>
          <AddPeopleModal :visible="isModalVisibleAddPeople" @update:visible="isModalVisibleAddPeople = $event" />
        </div>
      </div>

      <div class="flex">
        <div class="box-border mb-8 w-full">
          <div class="flex items-center rounded custom-access">
            <img
              src="https://jira-frontend-bifrost.prod-east.frontend.public.atl-paas.net/assets/access-banner.e0758cd5.svg"
              alt=""
            />
            <div>
              <div class="text-gray-800">
                To customize user access, such as roles and permissions, upgrade
                your plan to Standard.
              </div>
              <div class="flex items-center mt-3 mr-4 gap-2">
                <div>
                  <a
                    class="inline-flex items-center rounded border-0 text-white py-1.5 px-3 css-1ncptc6"
                    href=""
                  >
                    <span>Upgrade</span>
                  </a>
                </div>
                <a href="">
                  <span class="text-sky-500"
                    >Learn more about managing access</span
                  >
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="relative inline-block mr-6">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search projects"
            class="custom-input w-[224px] min-h-[40px] border border-gray-500 rounded py-3 font-light pl-2 pr-10 placeholder-gray-400 hover:border-blue-600"
          />
          <i
            v-if="searchQuery"
            @click="clearSearch"
            class="fa-solid fa-x absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          ></i>
          <i
            v-else
            class="fa-solid fa-magnifying-glass absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
          ></i>
        </div>

        <div class="relative inline-block">
          <input
            type="text"
            placeholder="Roles"
            class="custom-input w-[100px] min-h-[40px] border border-gray-500 rounded py-3 font-light pl-2 pr-10 placeholder-gray-400"
          />
          <i
            class="fa-solid fa-chevron-down absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
          ></i>

          <!-- Dropdown Menu -->
        </div>
      </div>
      <div>
        <a-table
          :loading="loading"
          :columns="columns"
          :data-source="data"
          class="mt-6"
        >
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'name'">
              <div class="flex">
                <div
                  class="w-6 h-6 flex items-center justify-center bg-[#1b2b4e] bg-opacity-90 text-white rounded-full text-xs mr-2"
                >
                  {{ text.charAt(0) }}
                </div>
                <span class="text-slate-950 ml-2">{{ text }}</span>
              </div>
            </template>
            <template v-if="column.dataIndex === 'role'">
              <!-- :disabled="record.role === RoleProjectUser.ADMIN" -->
              <a-select
                :disabled="record.role === RoleProjectUser.ADMIN"
                v-model:value="record.role"
                style="width: 160px"
                :dropdown-match-select-width="false"
                @change="(value: string) => { handleRoleChange(value, record) }"
              >
                <a-select-option :value="RoleProjectUser.ADMIN"
                  >Administrator</a-select-option
                >
                <a-select-option :value="RoleProjectUser.EDIT"
                  >Member</a-select-option
                >
                <a-select-option :value="RoleProjectUser.VIEWER"
                  >Viewer</a-select-option
                >
              </a-select>
            </template>

            <template v-if="column.dataIndex === 'actions'">
              <div
                v-if="roleUser === RoleProjectUser.ADMIN"
                @click="confirmRemove(record)"
                class="text-button-color flex items-center justify-center cursor-pointer bg-white rounded hover:bg-gray-100 ml-8"
              >
                Remove
              </div>
            </template>
          </template>
        </a-table>
      </div>
    </div>
    <!-- Dialog -->
    <a-modal
      v-model:visible="isModalVisible"
      title="Remove user in project"
      @ok="handleOk"
      @cancel="handleCancel"
      :maskClosable="false"
    >
      <p>
        {{ projectToRemove?.name }} won't be able to work on this project anymore.
      </p>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
// import { normalizeName } from '../../../../utils/normalizeName';
import { useUserProjectStore } from '../../../../stores/projectSettingStores/accessStores/accessStore';
import { updateRoleProjectUser, deleteUser } from '../../../../api/projectUser';
import { RoleProjectUser } from '../../../../utils/constants/enum';
import AddPeopleModal from '../../../mainpage/modal/addPeopleModal/index.vue';
import { message } from 'ant-design-vue';
import { TableColumnType } from 'ant-design-vue';


interface DataType {
  name: string;
  email: string;
  role: string;
  action: string;
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 250,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: 350,
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    width: 200,
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    width: 120,
  },
] as TableColumnType<DataType>[];

const roleUser = ref(localStorage.getItem('roleUser') || null);
const searchQuery = ref('');
const isModalVisible = ref(false);
const projectToRemove = ref<{ id: string; name: string; email: string } | null>(null);
const loading = ref(false);
const accessStore = useUserProjectStore();
const data = ref<any[]>([]);
const isModalVisibleAddPeople = ref(false);

// Hàm mở modal
const openModal = () => {
  isModalVisibleAddPeople.value = true;
};

const loadData = async () => {
  loading.value = true;
  try {
    await accessStore.loadUserProjects();
    const newProjects = accessStore.userProjects.map((project) => ({
      key: project?.id,
      name: project?.username || '',
      email: project?.email || '',
      role: project?.role || '',
    }));
    data.value = newProjects;
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadData();
});

const clearSearch = () => {
  searchQuery.value = '';
};

const handleRoleChange = async (newRole: string, record: any) => {
  const oldRole = record.role;

  try {
    const response = await updateRoleProjectUser({
      memberId: record.key,
      role: newRole,
    });
    console.log('Role changed successfully:', response);
    // message.success(`Changed role ${newRole} of user ${record.name} successfully!`);
  } catch (error) {
    record.role = oldRole;
    console.error('Failed to change role:', error);
    message.error(`Changed role ${newRole} of user ${record.name} failed!`);
  }
};

const confirmRemove = (record: any) => {
  projectToRemove.value = {
    id: record.key,
    name: record.name,
    email: record.email,
  };
  isModalVisible.value = true;
};

const handleOk = async () => {
  if (projectToRemove.value) {
    try {
      await deleteUser(projectToRemove.value.id);
      data.value = data.value.filter(item => item.key !== projectToRemove.value?.id);
      // message.success('User removed successfully');
    } catch {
      message.error('Failed to remove user');
    }
  }
  isModalVisible.value = false;
};

const handleCancel = () => {
  isModalVisible.value = false;
};
</script>

<style>
@import 'index.scss';
</style>
