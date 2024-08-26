<template>
  <a-modal
    title="Share Project"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <div class="w-full">
      <div class="mt-1">
        <span class="text-slate-900 mb-4 text-left w-full">
          Required fields are marked with an asterisk.
          <span class="text-red-500">*</span></span
        >
      </div>
      <div class="mb-2 mt-4">
        <span class="text-slate-900 mb-4 text-left w-full"
          >Email <span class="text-red-500">*</span></span
        >
      </div>

      <a-input
        id="email"
        type="text"
        class="w-[470px]"
        v-model:value="email"
        placeholder="e.g., Maria, maria@company.com"
      />

      <div class="mb-2 mt-4">
        <span class="text-slate-900 mb-4 text-left w-full"
          >Role <span class="text-red-500">*</span></span
        >
      </div>
      <!-- :disabled="record.role === RoleProjectUser.ADMIN" -->
      <a-select
        v-model:value="role"
        class="w-[470px]"
        placeholder="Select role"
      >
        <a-select-option :value="RoleProjectUser.ADMIN">Administrator</a-select-option>
        <a-select-option :value="RoleProjectUser.EDIT">Member</a-select-option>
        <a-select-option :value="RoleProjectUser.VIEWER">Viewer</a-select-option>
      </a-select>

      <div class="mb-2 mt-4">
        <span class="text-slate-900 mb-4 text-left w-full"
          >Expire time <span class="text-red-500">*</span></span
        >
      </div>

      <a-select v-model:value="dateTime" class="w-[470px]" placeholder="Select number of days">
        <a-select-option v-for="dateTime in 30" :key="dateTime" :value="dateTime">
          {{ dateTime }} ngày
        </a-select-option>
      </a-select>
    </div>
    <template #footer>
      <a-button key="back" @click="handleCancel">Cancel</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk"
        >Submit</a-button
      >
    </template>
  </a-modal>
</template>

<script lang="ts">

export default defineComponent({
  name: 'ShareModal',
  
});
</script>

<script setup lang="ts">
import { defineComponent, ref, toRefs} from 'vue';
import { RoleProjectUser } from "../../../../utils/constants/enum";
import { shareProject } from "../../../../api/projectUser";
import { message } from 'ant-design-vue';

const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
}>();

const { visible } = toRefs(props);
const email = ref("");
const role = ref("");
const dateTime = ref("");
const loading = ref<boolean>(false);

const handleOk = async () => {
  loading.value = true;
  const days = parseFloat(dateTime.value);
  const hours = Math.floor(days * 24);
  const minutes = Math.floor((days * 24 - hours) * 60);
  const seconds = 0;

  // Tạo chuỗi thời gian theo định dạng HH:mm:ss
  const timeFormat = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  console.log("timeFormat", timeFormat);

  try {
    await shareProject({
      email: email.value,
      role: role.value,
      expireTime: timeFormat
    })
    message.success('Share project success!');
  } catch (error) {
    message.error(`Share project fail ${error}`);
  }finally{
    loading.value = false;
    emit("update:visible", false);
  }
};

const handleCancel = () => {
  emit("update:visible", false);
};

</script>

<style scoped></style>
