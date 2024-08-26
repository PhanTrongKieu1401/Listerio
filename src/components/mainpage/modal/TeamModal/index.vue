<template>
  <div v-if="isVisible"
    class="fixed inset-x-0 flex items-start justify-center bg-opacity-50 transition-opacity duration-300 ease-in-out ">
    <div class="bg-white w-[320px] shadow-lg border rounded border-gray-500 border-opacity-20 p-0">

      <!-- Section 1 -->
      <div class="mb-4 w-full mt-2">
        <button
          class="w-full h-10 bg-white text-text-dark-thin text-sm  font-ui font-normal hover:bg-gray-200 hover:bg-opacity-80 pl-5 flex items-center">
          <i class="fa-solid fa-plus mr-4"></i>Invite people to Jira</button>
        <button
          class="w-full h-10 bg-white text-text-dark-thin text-sm  font-ui font-normal mb-2 hover:bg-gray-200 hover:bg-opacity-80 pl-5 flex items-center">
          <i class="fa-solid fa-user-plus mr-4"></i>Create a team</button>
      </div>

      <!-- Divider -->
      <div class="border-b border-black opacity-20 mb-0"></div>

      <!-- Section 3 -->
      <div class="w-full mt-1">

        <button
          class="w-full h-10 bg-white text-text-dark-thin text-sm  font-ui font-normal mb-2 hover:bg-gray-200 hover:bg-opacity-80 pl-5 flex items-center">Search
          people and teams</button>
      </div>

    </div>

  </div>

</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'TeamModal',
  props: {
    isVisible: {
      type: Boolean as PropType<boolean>,
      required: true
    }
  },

});
</script>