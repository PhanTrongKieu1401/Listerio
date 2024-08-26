<template>
  <div class="profile-header  relative bg-slate-200 bgImg">
    <div class="avatar-container absolute flex flex-col space-y-2.5 ml-72 mb-10">
      <!-- <Avatar class="bg-slate-700 text-white inset-x-0" style="font-size: 50px" :size="100">{{ profile?.firstName.charAt(0) }}{{ profile?.lastName.charAt(0) }}</Avatar> -->
      <div
                    class="w-[100px] h-[100px]  mr-[20px] flex text-center items-center justify-center bg-[#39a3bf]  text-[#1e3d5f] text-opacity-80 font-semibold rounded-full text-5xl cursor-pointer"
                  >
                    {{ profile?.username.charAt(0).toUpperCase() }}
                  </div>
      
      <div>
        <h2 class="text-xl font-semibold my-3">
          {{normalizeName(
            profile?.firstName,
            profile?.middleName,
            profile?.lastName)
          }}
        </h2>
        <button class="bg-slate-100 text-sm w-72 border-0 font-semibold my-3 h-8 manage-button">Manage your account</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'rofileHeader',
}
</script>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { normalizeName } from "../../../utils/normalizeName";
const props = defineProps<{
  profile: any;
}>();

const profile = ref<any>()

watch(() => props.profile, (newProfile) => {
  if (newProfile) {
    profile.value = newProfile;
  }
}, { immediate: true });
</script>

<style scoped>
@import "index.scss";
</style>