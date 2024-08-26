<template>
    <div v-if="props.userName !== 'Unassigned'">
        <div
            class=" p-0 flex text-center items-center justify-center bg-[#39a3bf] bg-opacity-90 text-[#1e3d5f] text-opacity-80 font-semibold rounded-full text-sm cursor-pointer">
            {{ props.userName.charAt(0).toUpperCase() }}
        </div>
    </div>
    <div v-else
     class="p-0 flex text-center items-center justify-center bg-[#39a3bf] bg-opacity-90 text-[#1e3d5f] text-opacity-80 font-semibold rounded-full text-sm cursor-pointer">
        U
    </div>
</template>


<script lang="ts">
import { defineComponent, defineProps } from 'vue';
export default defineComponent({
    name: 'LogoUser',
});
</script>
<script lang='ts' setup>

const props = defineProps<{
    userName: string ;
}>();
</script>
