<template>
  <div v-if="isVisible"
    class="fixed inset-x-0 flex items-start justify-center bg-opacity-50 transition-opacity duration-300 ease-in-out ">
    <div class="bg-white w-[320px] shadow-lg border rounded border-gray-500 border-opacity-20 p-0">

      <!-- Section 1 -->
      <div class="mb-4 w-full mt-4 flex flex-col items-center text-center text-text-dark-thin">
        <div class="mt-2">
          <img src="../../../../assets/img/filter.svg" alt="" height="160" width="160">
        </div>
        <span class="text-sm font-normal mx-4 mt-2 font-ui">Search for issues across all projects and save them as
          filters.</span>
        <span class="text-sm font-normal font-ui text-[#0c66e4] hover:underline cursor-pointer">Learn more</span>

      </div>

      <div class="border-b border-black opacity-20 mb-0"></div>

      <!-- Section 3 -->
      <div class="w-full mt-1 text-text-dark-thin">
        <button
          class="w-full h-10 bg-white  text-sm  font-ui font-normal hover:bg-gray-200 hover:bg-opacity-80 pl-5 flex items-center">View
          all filters</button>
        <router-link to ="/issues"  @click="closeModal"
          class="w-full h-10 bg-white text-sm  font-ui font-normal mb-2 hover:bg-gray-200 hover:bg-opacity-80 pl-5 flex items-center">View
          all issues</router-link>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'FilterModal',
  props: {
    isVisible: {
      type: Boolean as PropType<boolean>,
      required: true
    }
  },

  emits: ['update:isVisible'],
  methods: {
    closeModal() {
      this.$emit('update:isVisible', false);
    }
  }

});
</script>