<template>
    <div class="flex flex-col justify-center items-center group w-[254px] h-[80px] border-x border-t cursor-pointer rounded"
        :class="{
            'bg-blue-100 hover:bg-blue-200 border-gray-400 border': curSelectedTaskId === id,
            'border-gray-300 bg-white hover:bg-gray-200 border-b-gray-300': curSelectedTaskId !== id
        }">
        <div class="p-3  w-full h-full ">
            <div class="w-full flex flex-col justify-between ">
                <div class="flex justify-between relative">
                    <div class="flex text-sm font-apple text-text-dark-thin ml-1 cursor-pointer">

                        <div class="flex items-center text-sm font-ui text-text-dark-thin mb-1 cursor-pointer">
                            <span class="hover:underline">{{ displayTitle }}</span>

                        </div>

                    </div>

                </div>
                <div class="flex justify-between items-center mt-2">
                    <div class="flex items-center cursor-pointer mb-3">
                        <i class="fa-solid fa-square-check text-blue-400 ml-1"></i>
                        <span class="  text-xs font-bold font-apple text-text-dark ml-2 ">
                            {{ keyText }}
                        </span>
                    </div>

                    <div class="flex items-center mb-3">

                        <div v-if="tooltipTitle !== 'Unassigned'"
                            class="w-6 h-6 p-0 flex text-center items-center justify-center bg-[#39a3bf] bg-opacity-90 text-[#1e3d5f] text-opacity-80 font-semibold  rounded-full text-sm cursor-pointer">
                            {{ username?.charAt(0).toUpperCase() }}
                        </div>
                        <div v-else
                            class="w-6 h-6 p-0 flex text-center items-center justify-center bg-gray-400 bg-opacity-90 text-[#1e3d5f] text-opacity-80 font-semibold  rounded-full text-sm cursor-pointer">
                            <button >
                                <i class="fa-solid fa-user text-white text-sm mr-[1px]"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    name: 'searchTask',

});
</script>

<script setup lang="ts">
import { ref ,watch} from 'vue';

const props = defineProps<{
    id: string;
    title: string;
    curSelectedTaskId: string;
    username: string;
    keyText: string;
    tooltipTitle: string ;
    point: number;
}>();
watch(() => props.title, (newVal) => {
    displayTitle.value = newVal;
});
const displayTitle = ref(props.title);


</script>


<style scoped>
@import 'index.scss'
</style>