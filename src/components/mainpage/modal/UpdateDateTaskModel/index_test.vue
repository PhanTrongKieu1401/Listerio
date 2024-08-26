<template>
  <div >
  <!-- class="w-[500px]" -->
    <a-button type="primary" @click="showModal">Start sprint</a-button>
    <a-modal v-model:open="open" title="Start another sprint" @ok="handleOk">
      <template #footer>
        <a-button key="back" @click="handleCancel">Cancel</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">Submit</a-button>
      </template>
      <div class="w-full">
        <div>
          <span class="text-[#5E6C84] mb-4 text-sm"> 1 issue will be included in this sprint.</span>
        </div>
        <div class="mt-1">
          <span class="text-slate-900 mb-4 text-left w-full"> Required fields are marked with an asterisk. <span class="text-red-500">*</span></span>
        </div>
        <div class="mb-2 mt-4">
          <span class="text-slate-900 mb-4 text-left w-full">Sprint name <span class="text-red-500">*</span></span>
        </div>
        <!-- <a-input class="w-[294px]" v-model:value="se" placeholder="Sprint" /> -->
        <div class="mb-2 mt-4">
          <span class="text-slate-900 mb-4 text-left w-full">Date Sprint <span class="text-red-500">*</span></span>
        </div>
        <a-range-picker class="mb-4" v-model:value="valueDate" :disabled-date="disabledDate" />
      </div>
      
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const loading = ref<boolean>(false);
const open = ref<boolean>(false);
const valueDate = ref<[Dayjs, Dayjs]>();

import dayjs, { Dayjs } from 'dayjs';
// const range = (start: number, end: number) => {
//   const result = [];

//   for (let i = start; i < end; i++) {
//     result.push(i);
//   }

//   return result;
// };

const disabledDate = (current: Dayjs) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf('day');
};

// const disabledDateTime = () => {
//   return {
//     disabledHours: () => range(0, 24).splice(4, 20),
//     disabledMinutes: () => range(30, 60),
//     disabledSeconds: () => [55, 56],
//   };
// };

const showModal = () => {
  open.value = true;
};

const handleOk = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    open.value = false;
  }, 2000);
};

const handleCancel = () => {
  open.value = false;
};
</script>


