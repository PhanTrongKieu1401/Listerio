<template>
    <div @click="showModal" class="w-full h-full flex justify-start items-center z-40 px-4 bg-white hover:bg-gray-200">
        <span class="z-20">Edit sprint</span>
        <a-modal v-model:open="open" @ok="handleOk" class="modal-custom relative rounded-none mt-[-40px]"
            :closable="false" :width="500" :footer=null>


            <!-- header -->
            <div class="text-xl font-apple text-text-dark-thin font-semibold">
                <span>Start another sprint</span>
            </div>

            <!-- body -->
            <div class="mt-6 ">
               
                <div class="text-xs text-text-dark font-bold font-ui mt-4 select-none">
                    Required fields are marked with an asterisk <span class="text-red-500">*</span>
                    <div class="mt-4 ">
                        Sprint name <span class="text-red-500">*</span>
                        <div>
                            <input type="text" v-model="sprintName"
                                class="w-[300px] h-[40px] hover:border-blue-400 rounded border border-black mt-1 font-ui text-sm text-text-dark-thin font-normal p-2 input-field">
                        </div>
                    </div>

                    <div class="mt-4">
                        Start date <span class="text-red-500">*</span>
                        <div>
                            <a-date-picker :format="dateFormatList" :value="startDate" @change="handleStartDateChange"
                                :disabled-date="disabledDate" disabled  
                                class=" w-[300px] h-[40px] rounded border border-black mt-1 font-ui text-sm text-text-dark-thin font-normal cursor-pointer p-2 input-field" />
                        </div>
                    </div>

                    <div class="mt-4">
                        End date <span class="text-red-500">*</span>
                        <div>
                            <a-date-picker :format="dateFormatList" :value="endDate" @change="handleEndDateChange"
                                :disabled-date="disabledEndDate"
                                class=" w-[300px] h-[40px] rounded border border-black mt-1 font-ui text-sm text-text-dark-thin font-normal cursor-pointer p-2 focus:border-4 input-field" />
                        </div>
                        <div v-if="errorMessages != ''"
                            class="text-xs font-ui text-red-500 font-normal mt-2 select-none  ">
                            <i class="fa-solid fa-triangle-exclamation mr-1"></i>
                            <span>{{ errorMessages }}</span>
                        </div>
                    </div>

                </div>

            </div>

            <!-- footer -->
            <div class="flex justify-end w-full mt-10">
                <div class="font-apple font-semibold">
                    <button key="back" @click="handleCancel"
                        class="text-text-dark-thin  hover:bg-gray-200 px-4 py-2 rounded">
                        <span>Cancel</span>
                    </button>
                    <button v-if="!errorMessages" @click="updateSprintInfo"
                        class="bg-blue-500 hover:bg-blue-700  text-white px-4 py-2 rounded ml-2 ">
                        <span v-if="!isLoading">
                            Update
                        </span>
                        <div v-if="isLoading"
                            class="w-5 h-5 border-4 border-white border-t-transparent border-solid rounded-full animate-spin">
                        </div>
                    </button>

                    <button v-else class="bg-blue-500   text-white px-4 py-2 rounded ml-2 ">
                        <span>
                            Update
                        </span>
                    </button>
                </div>
            </div>


        </a-modal>
        <div v-if="open" class="fixed inset-x-0 inset-y-0  h-screen bg-blue-500 bg-opacity-30 z-50"></div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'startSprintModal',
})
</script>


<script lang="ts" setup>
import { ref, watch } from 'vue';
import dayjs from 'dayjs';
import { updateSprint } from '../../../../api/sprint';


const emit = defineEmits<{
    (event: 'updateSprintInfo',  sprintId: string ): void;
}>();

const props = defineProps<{
    sprintName: string;
    sprintId: string;
    sprintStartDate: string;
    sprintEndDate: string;
}>();

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];


const startDate = ref<dayjs.Dayjs>(
  
   dayjs() // Use the current date if sprintStartDate is null
);
const endDate = ref<dayjs.Dayjs>(
    props.sprintEndDate
        ? dayjs(props.sprintEndDate, 'YYYY-MM-DD')
        : dayjs().add(2, 'week')
);
const sprintName = ref(props.sprintName);
const open = ref<boolean>(false);
const errorMessages = ref<string>('');
const isLoading = ref<boolean>(false);

const showModal = () => {
    open.value = true;


};
const handleStartDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
        startDate.value = date;
    } else {
        startDate.value = dayjs(); // Set to current date if no date is selected
    }
};

const handleEndDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
        endDate.value = date;
    }
};

async function updateSprintInfo() {
    isLoading.value = true;

    try {
        await updateSprint({
            //sửa code phần này
            title: sprintName.value,
            startDate: startDate.value.format('YYYY-MM-DD'),
            endDate: endDate.value.format('YYYY-MM-DD')
        }, props.sprintId);
        emit('updateSprintInfo',  props.sprintId );
        open.value = false;
    } catch (error) {
        console.error('Error starting sprint:', error);
    } finally {
        isLoading.value = false;
    }
}
const handleOk = () => {
    open.value = false;
};

const handleCancel = () => {
    open.value = false;
};
const disabledDate = (current: dayjs.Dayjs) => {
    const yesterday = dayjs().subtract(1, 'day').endOf('day');
    return current && current < yesterday
};

const disabledEndDate = (current: dayjs.Dayjs) => {
    return current && current < startDate.value.endOf('day');
};

watch([startDate, endDate], ([newStartDate, newEndDate]) => {
    if (newEndDate && newStartDate && newEndDate <= newStartDate) {
        errorMessages.value = "The end date of a sprint must be after the start date.";
    } else {
        errorMessages.value = ''; // Clear the error message if the dates are valid
    }
}, { immediate: true });
</script>


<style lang="scss" scoped>
@import 'index.scss';
</style>