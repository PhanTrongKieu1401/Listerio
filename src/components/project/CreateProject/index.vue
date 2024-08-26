<template>
  <div class="container mx-auto flex flex-col justify-center items-center min-h-screen">
    <div
      class="flex flex-col justify-center items-center w-full max-w-md bg-white p-6 rounded shadow-md border border-gray-300">
      
      <h2 class="text-2xl font-semibold mb-2 custom-font">
        Add project details
      </h2>
      <p class="text-[#5E6C84] mb-4">
        Explore what's possible when you collaborate with your team. Edit
        project details anytime in project settings.
      </p>

      <p class="text-[#5E6C84] mb-4 text-left w-full">
        Required fields are marked with an asterisk
        <span class="text-red-500">*</span>
      </p>

      <form @submit.prevent="submitForm" class="w-full">
        <div class="form-group mb-4">
          <label for="name" class="block text-sm font-medium text-text-dark-thin">Name <span
              class="text-red-500">*</span></label>
          <input type="text" id="name" v-model="name" placeholder="Try a team name, project goal, milestone..." required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0052CC] focus:border-[#0052CC] sm:text-sm" />
        </div>
        <p class="text-[#5E6C84] mb-4 text-sm">
          Access: Anyone with access to project can access and
          administer this project.
          <a href="#" class="text-[#0052CC]">Upgrade your plan </a> to customize
          project permissions.
        </p>
        <!-- <div class="form-group mb-6">
          <label for="key" class="block text-sm font-medium text-text-dark-thin">
            Key
            <span class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-purple-600" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-8h2V5h-2v5zm0 4h2v-2h-2v2z"
                  clip-rule="evenodd" />
              </svg>
            </span>
            <span class="text-red-500">*</span>
          </label>
          <input type="text" id="key" v-model="key" required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0052CC] focus:border-[#0052CC] sm:text-sm" />
        </div> -->
        <div class="flex justify-end space-x-2">
          <button type="button" @click="cancel"
            class="px-4 py-2 bg-gray-100 text-text-dark-thin rounded hover:bg-gray-200">
            Cancel
          </button>
          <button type="submit" class="px-4 py-2 bg-[#0052CC] text-white rounded hover:bg-[#0747A6]">
            Next
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useCreateProjectStore } from "../../../stores/projectStores/projectStore";

export default defineComponent({
  setup() {
    const router = useRouter();

    const name = ref("");
    // const loading = ref(false);
    const createProjectStore = useCreateProjectStore();

    const submitForm = async () => {
      try {
        await createProjectStore.createProject({
          title: name.value
        });
        if (createProjectStore.error) {
          // errorMessage.value = createProjectStore.error;
        } else {
          console.log("Successfully");
          
        }
      } catch (error) {

      } finally {
        router.back();
      }
    };

    const cancel = () => {
      router.back();
    };

    return {
      name,
      submitForm,
      cancel,
    };
  },
});
</script>

<style scoped>
@import "index.scss";


</style>
