<template>
  <a-modal :visible="visible" @ok="handleOk" @cancel="closeModal" :maskStyle="{ backgroundColor: 'rgba(29, 78, 216, 0.3)' }">
    <div class="add-people-content">
      <div class="flex justify-between">
        <h3 class="text-xl leading-6 font-medium text-gray-900">Add People</h3>
        
      </div>
      <div class="mt-2 flex flex-col items-start">
        <label for="email" class="text-xs text-slate-900 font-medium">Names or emails</label>
        <input
          id="email"
          type="text"
          placeholder="e.g., Maria, maria@company.com"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          v-model="email"
        />
      </div>
      <div class="mt-4 flex flex-col items-start">
        <label class="text-xs text-slate-900 font-medium">Role</label>
        <select
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          v-model="role"
        >
          <option :value="RoleProjectUser.ADMIN">Administrator</option>
          <option :value="RoleProjectUser.EDIT">Member</option>
          <option :value="RoleProjectUser.VIEWER">Viewer</option>
        </select>
      </div>
    </div>
    <template #footer>
      <button
        type="button"
        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
        @click="addPeople"
      >
        Add
      </button>
      <button
        type="button"
        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm ml-2.5"
        @click="closeModal"
      >
        Cancel
      </button>
    </template>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'AddPeopleModal',
})
</script>


<script setup lang="ts">
import { ref, toRefs} from 'vue';
import { fetchInviteUser } from "../../../../api/projectUser";
import { RoleProjectUser } from "../../../../utils/constants/enum"
import { message } from 'ant-design-vue';

const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void;
}>();

const { visible } = toRefs(props);

const email = ref('');
const role = ref(RoleProjectUser.ADMIN); 

const closeModal = () => {
  emit('update:visible', false);
};

const addPeople = async () => {
  try {
    const response = await fetchInviteUser({
      email: email.value,
      role: role.value
    })
    console.log("addPeople", response)
    message.success('Add people success!');
    closeModal();
  } catch (error) {
    console.error("addPeople", error)
    message.error('Add people fail!');
  } finally {
    
  }
  
};

const handleOk = () => {
  addPeople();
};

</script>

<style scoped>

@import 'index.scss';
</style>