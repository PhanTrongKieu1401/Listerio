<template>
    <a-modal
      :visible="isVisible"
      @ok="handleOk"
      @cancel="handleCancel"
      @update:visible="handleCancel" 
      :width="1200"
      :style="{ top: '70px' }"
      
    >
    <template #footer>
        
      </template>
    <TaskDetail :taskId="props.taskId" class="p-0 z-50"/>
    
    </a-modal>
    <div v-if="isVisible" class="fixed inset-0 bg-blue-500 bg-opacity-30 z-40"></div>
  </template>
  

<script lang="ts">
export default {
  name: 'TaskDetailModal',
}
</script>
  <script setup lang="ts">
  import TaskDetail from '../../../taskDetail/index.vue'
  const props = defineProps<{
    taskId: string;
    isVisible: boolean;
    onClose: () => void;
  }>();
  
  const emit = defineEmits(['update:isVisible']);
  
  const handleOk = () => {
    emit('update:isVisible', false);  // Close the modal
    props.onClose();
  };
  
  const handleCancel = () => {
    emit('update:isVisible', false);  // Close the modal
    props.onClose();
  };
  </script>
  
  <style scoped>
  /* Add any additional styling here */
  </style>
  