<template>
    <div class="profile-details bg-white rounded border border-gray-300 shadow flex flex-col w-72 mt-48 p-6 ml-72">
        <h3 class="text-xs text-slate-400 mb-4">ABOUT</h3>
        <ul class="list-none p-0">
            <li class="flex items-center my-2">
                <i class="fa-solid fa-suitcase"></i>
                <div class="flex items-center justify-between w-full">
                    <input v-if="!editingJobTitle" @click="startEditing('jobTitle')"
                        v-model="profile.phone" 
                        :disabled="!isEdit" 
                        :class="{'cursor-not-allowed pointer-events-none': !isEdit, 'text-slate-400': !isEdit}"
                        class="text-sm px-2 pt-2 pb-1.5 ml-2 info" placeholder="Your phone">
                    <div v-else class="relative ml-2 flex items-center w-full">
                        <input v-model="profile.phone" placeholder="Your phone" spellcheck="false" type="text"
                            class="w-full border-2 border-blue-400 rounded p-2 h-8 text-sm"
                            @blur="stopEditing('jobTitle')" ref="jobTitleInput" />
                    </div>
                </div>
            </li>
            <li class="flex items-center my-2">
                <i class="fa-solid fa-code-fork fa-flip-vertical"></i>
                <div class="flex items-center justify-between w-full">
                    <input v-if="!editingDepartment" @click="startEditing('department')"
                        v-model="profile.dateOfBirth" 
                        :disabled="!isEdit" 
                        :class="{'cursor-not-allowed pointer-events-none': !isEdit, 'text-slate-400': !isEdit}"
                        class="text-sm px-2 pt-2 pb-1.5 ml-2 info" placeholder="YYYY-MM-DD">
                    <div v-else class="relative ml-2 flex items-center w-full">
                        <input v-model="profile.dateOfBirth" placeholder="YYYY-MM-DD" spellcheck="false" type="text"
                            class="w-full border-2 border-blue-400 rounded p-2 h-8 text-sm"
                            @blur="stopEditing('department')" ref="departmentInput" />
                    </div>
                </div>
            </li>
            <li class="flex items-center my-2">
                <i class="fa-regular fa-building"></i>
                <div class="flex items-center justify-between w-full">
                    <input v-if="!editingOrganization" @click="startEditing('organization')"
                        v-model="profile.gender" 
                        :disabled="!isEdit" 
                        :class="{'cursor-not-allowed pointer-events-none': !isEdit, 'text-slate-400': !isEdit}"
                        class="text-sm px-2 pt-2 pb-1.5 ml-2 info" placeholder="Your gender">
                    <div v-else class="relative ml-2 flex items-center w-full">
                        <input v-model="profile.gender" placeholder="Your gender" spellcheck="false" type="text"
                            class="w-full border-2 border-blue-400 rounded p-2 h-8 text-sm"
                            @blur="stopEditing('organization')" ref="organizationInput" />
                    </div>
                </div>
            </li>
            <li class="flex items-center my-2">
                <i class="fa-solid fa-location-dot"></i>
                <div class="flex items-center justify-between w-full">
                    <input v-if="!editingLocation" @click="startEditing('location')"
                        v-model="profile.address" 
                        :disabled="!isEdit" 
                        :class="{'cursor-not-allowed pointer-events-none': !isEdit, 'text-slate-400': !isEdit}"
                        class="text-sm px-2 pt-2 pb-1.5 ml-2 info" placeholder="Your address">
                    <div v-else class="relative ml-2 flex items-center w-full">
                        <input v-model="profile.address" placeholder="Your address" spellcheck="false" type="text"
                            class="w-full border-2 border-blue-400 rounded p-2 h-8 text-sm"
                            @blur="stopEditing('location')" ref="locationInput" />
                    </div>
                </div>
            </li>
        </ul>

        <a-button v-if="isEdit" @click="handleUpdate()" class="mb-4" type="primary">
            <span v-if="!isUpdateLoading">
                Save
            </span>
        </a-button>
        <a-button v-else @click="isEdit = true" class="mb-4" danger shape="round">Edit</a-button>

        <h3 class="text-xs text-slate-400 mb-4">CONTACT</h3>
        <div class="flex items-center">
            <i class="fa-regular fa-envelope"></i>
            <span class="text-sm px-2 pt-2 pb-1.5 text-slate-400 ml-2">{{profile?.email}}</span>
        </div>
    </div>
</template>

<script lang="ts" >
export default {
    name: 'ProfileDetails',
}
</script>
<script lang="ts" setup>
import { ref, nextTick, watch } from 'vue';
import { message } from "ant-design-vue";
import { updateInformation } from "../../../api/profile";

const props = defineProps<{
  profile: any;
}>();

const profile = ref<any>({});
const isEdit = ref(false)
const isUpdateLoading = ref(false)

watch(() => props.profile, (newProfile) => {
  if (newProfile) {
    profile.value = newProfile;
  }
}, { immediate: true });


const editingJobTitle = ref(false);
const editingDepartment = ref(false);
const editingOrganization = ref(false);
const editingLocation = ref(false);

const startEditing = (field: string) => {
    editingJobTitle.value = false;
    editingDepartment.value = false;
    editingOrganization.value = false;
    editingLocation.value = false;
    switch (field) {
        case 'jobTitle':
            editingJobTitle.value = true;
            break;
        case 'department':
            editingDepartment.value = true;
            break;
        case 'organization':
            editingOrganization.value = true;
            break;
        case 'location':
            editingLocation.value = true;
            break;
    }
    nextTick(() => {
        const input = document.querySelector(`[ref="${field}Input"]`) as HTMLInputElement;
        input?.focus();
    });
};

const stopEditing = (field: string) => {
    switch (field) {
        case 'jobTitle':
            editingJobTitle.value = false;
            break;
        case 'department':
            editingDepartment.value = false;
            break;
        case 'organization':
            editingOrganization.value = false;
            break;
        case 'location':
            editingLocation.value = false;
            break;
    }
};



const handleUpdate = async () => {
    isUpdateLoading.value = true
    try {
        const updateResponse = await updateInformation({
            firstName: profile.value.firstName,
            middleName: profile.value.middleName,
            lastName: profile.value.lastName,
            phone: profile.value.phone,
            dateOfBirth: profile.value.dateOfBirth,
            gender: profile.value.gender,
            address: profile.value.address,
        })
        console.log("(updateResponse)", updateResponse)
        // message.success("Update profile successfully!");
    } catch (error) {
        console.error("Failed to update profile", error);
        message.error("Failed to update profile ");
        
    }finally{
        isUpdateLoading.value = false
        isEdit.value = false
    }
}

</script>

<style scoped>
@import 'index.scss';
</style>
