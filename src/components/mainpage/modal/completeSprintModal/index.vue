<template>
    <div @click="showModal" class="w-full h-full flex justify-start items-center px-3">
        <span >Complete sprint</span>
        <a-modal v-model:open="open" @ok="handleOk" class="modal-custom relative rounded-none" 
        :closable="false" :width="600" :footer=null >

            <div class="flex flex-col w-full h-full">
                <div class="flex-1 bg-white p-0 overflow-hidden w-full absolute top-0 left-0 rounded-md">
                    <img src="../../../../assets/img/cup.svg" alt="Modal Image"
                        class="min-w-[600px] h-full object-cover" />
                </div>

                <div class="flex-1 bg-white mt-[140px]">
                    <span class="text-xl font-ui text-text-dark-thin font-semibold">Complete SCRUM Sprint 3</span>
                    <div class="mt-2 text-sm font-ui text-text-dark-thin ">
                        <span >This sprint contains:</span>
                        <ul class="font-apple ml-10 mt-2 flex flex-col list-disc pl-5 space-y-1">
                            <li>
                                <span class="font-semibold">{{ props.countIssue.done }}</span> completed issues
                            </li>
                            <li>
                                <span class="font-semibold">{{ props.countIssue.notDone }}</span> open issues
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

            <!-- <div class="text-xs text-text-dark font-bold font-ui">
                Open issues will move to: <span class="text-blue-500 text-base font-normal">Backlog</span>
         
            </div> -->

            <!-- footer -->
            <div class="flex justify-end w-full">
                <div class="font-apple font-semibold">
                    <button key="back" @click="handleCancel" class="text-text-dark-thin  hover:bg-gray-200 px-4 py-2 rounded" >
                        <span >Cancel</span>
                    </button>
                    <button key="submit"  @click="handleOk" class="bg-blue-500 hover:bg-blue-700  text-white px-4 py-2 rounded ml-2">
                        <span>
                            Complete sprint
                        </span>
                    </button>
                </div>
            </div>
        </a-modal>
        <div v-if="open" class="fixed inset-0 bg-blue-500 bg-opacity-30 z-50"></div> <!-- Blue overlay -->
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'CompleteSprintModal',
})
</script>


<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
    onCompleteSprint: () => void;
    countIssue : any;
}>();

const open = ref<boolean>(false);

const showModal = () => {
    open.value = true;
};

const handleOk = () => {
    props.onCompleteSprint();
    open.value = false;
};


const handleCancel = () => {
    
    open.value = false;
};
</script>

