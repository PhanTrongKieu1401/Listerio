<template>
    <a-modal title="Start another task" :visible="visible" @ok="handleOk" @cancel="handleCancel">
      <div class="w-full">
        <div>
          <span class="text-[#5E6C84] mb-4 text-sm"> 1 issue will be included in this task.</span>
        </div>
        <div class="mt-1">
            <span class="text-slate-900 mb-4 text-left w-full"> Required fields are marked with an asterisk. <span class="text-red-500">*</span></span>
        </div>
        <div class="mb-2 mt-4">
            <span class="text-slate-900 mb-4 text-left w-full">Task name <span class="text-red-500">*</span></span>
        </div>
        <a-input disabled class="w-[300px]" v-model:value="task.title" placeholder="Name" />
        <div class="mb-2 mt-4">
          <span class="text-slate-900 mb-4 text-left w-full">Due date task <span class="text-red-500">*</span></span>
        </div>
        <a-date-picker class="mb-4 w-[300px]" v-model:value="valueDate" :disabled-date="disabledDate" />
      </div>
      <template #footer>
          <a-button key="back" @click="handleCancel">Cancel</a-button>
          <a-button key="submit" type="primary" :loading="loading" @click="handleOk">Submit</a-button>
        </template>
    </a-modal>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue';
import dayjs, { Dayjs } from 'dayjs';

const props = defineProps<{
  task: {
    title: string;
    taskId: string;
    oldStatus: string;
    newStatus: string;
  };
  visible: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void;
}>();

const {task, visible } = toRefs(props);
const dateFormat = 'YYYY-MM-DD';

const loading = ref<boolean>(false);
const valueDate = ref<Dayjs>();

const handleOk = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    emit('update:visible', false);
    if (valueDate.value) {
      const formattedDate = valueDate.value.format(dateFormat);
      console.log("date", formattedDate);
    }
  }, 2000);
};

const handleCancel = () => {
  emit('update:visible', false);
};

// Function to disable dates before today
const disabledDate = (current: Dayjs) => {
  return current && current < dayjs().startOf('day');
};
</script>

<style scoped>
</style>
