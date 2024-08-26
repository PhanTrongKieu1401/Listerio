<template>
  <a-modal :visible="visible" @ok="handleOk" @cancel="closeModal"
    :maskStyle="{ backgroundColor: 'rgba(29, 78, 216, 0.3)' }">
    <div class="add-people-content">
      <div class="flex justify-between">
        <h3 class="text-xl leading-6 font-medium text-gray-900">Add Label</h3>

      </div>
      <div class="mt-2 flex flex-col items-start">
        <label for="title" class="text-xs text-slate-900 font-medium">Title </label>
        <input v-model="title" id="title" type="text" placeholder="Name of Label"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div class="mt-2 flex flex-col items-start">
        <label for="description" class="text-xs text-slate-900 font-medium">Description </label>
        <input v-model="description" id="description" type="text" placeholder="Description of Label"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
    </div>
    <template #footer>
      <button type="button" @click="addLabel"
        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
        Add
      </button>
      <button type="button"
        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm ml-2.5"
        @click="closeModal">
        Cancel
      </button>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { toRefs, ref } from 'vue';
import { createLabelForType ,Label} from '../../../../api/label';
const props = defineProps<{
  visible: boolean;
  typeId: string;
}>();

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void;
  (e: 'addNewLabel', newLabel: Label): void;
}>();

const { visible } = toRefs(props);
const title = ref<string>('');
const description = ref<string>('');

const closeModal = () => {
  emit('update:visible', false);
};


async function addLabel() {

  if (title.value === '' || description.value === '') {
    closeModal();

    return;
  }
  const response = await createLabelForType(props.typeId,
    {
      title: title.value,
      description: description.value,
    });
  emit('addNewLabel', response.data);
  closeModal();
}
const handleOk = () => {
  emit('update:visible', false);
};

</script>

<style scoped>
@import 'index.scss';
</style>